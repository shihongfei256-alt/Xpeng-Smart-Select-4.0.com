/* =====================================================================
 * engine.js —— 规则引擎（前端移植版）
 *
 * 与后端 fi_core/ 逐行对照移植，判定口径完全一致：
 *   facts.py         → extractFacts / hasCustomerContext
 *   rules_engine.py  → evaluateEligibility / matchInstitutions / needSupport
 *   pass_rate.py     → HeuristicPassRateModel（匹配度评分，可替换为 XGBoost）
 *   planner.py       → consult（客户画像 → 机构推荐）
 *   s7_qa.py         → structuredLookup / 2-gram 相关性重排 / 置信度与降级
 *   agent.py         → planTurn（意图路由）
 *
 * 设计红线（与后端同源）：
 *   1. LLM 只做「理解/抽取/润色」，准入判定与推荐 100% 由规则给出；
 *   2. 每条结论必须带来源（§章节 + 行号）；
 *   3. 置信度不足时明确降级「请咨询策略组」，绝不编造。
 *
 * 本文件为浏览器端移植，不依赖任何后端 / 网络调用。
 * ===================================================================== */
(function (global) {
  'use strict';

  var KB = global.KB || {};

  /* ------------------------------------------------------------------
   * 0. 常量与词表（来源：facts.py / config.py / pass_rate.py）
   * ---------------------------------------------------------------- */

  var QUALIFICATION_MAP = [
    ['营运车', ['营运车', '网约车', '滴滴', '出租车', '货车', '以租代购', '货拉拉']],
    ['港澳台', ['港澳台', '香港', '澳门', '台湾', '港籍', '澳籍', '台胞']],
    ['外籍', ['外籍', '外国人', '外籍人士', '护照']],
    ['公牌', ['公牌', '公司牌', '公司户', '以公司名义', '企业客户', '公司购车', '上公司牌']],
  ];

  var NEED_MAP = [
    ['免抵押', ['免抵押', '不抵押', '无抵押', '免抵押贷款']],
    ['提前还款', ['提前还款', '提前还', '提前结清', '提前结']],
    ['主贷分离', ['主贷分离', '主贷人分离', '申请人不是车主', '不是上牌人']],
    [
      '征信瑕疵',
      ['征信瑕疵', '征信有瑕疵', '征信不好', '征信有问题', '征信花了', '征信花', '征信有点花',
       '征信小花', '有点花', '有过逾期', '征信有污点', '有瑕疵'],
    ],
    ['0息', ['0息', '0利息', '0 利息', '免息', '免利息', '零息', '零利息', '0利率', '零利率', '免利率']],
    ['低利率', ['低利率', '利率低', '利率尽量低', '利率再低', '利率更低', '利息低', '利息少', '低息', '尽量低']],
  ];

  var CITIES = [
    '广州', '深圳', '佛山', '东莞', '珠海', '中山', '惠州', '江门', '肇庆',
    '北京', '上海', '福建省', '黑龙江省', '吉林省', '辽宁省', '广东省',
    '浙江省', '江苏省', '四川省', '湖北省', '湖南省', '山东省', '河南省',
    '河北省', '陕西省', '安徽省', '江西省', '广西', '云南省', '贵州省',
    '重庆市', '天津市', '南京', '杭州', '武汉', '成都', '长沙', '西安',
    '郑州', '济南', '青岛', '合肥', '南昌', '石家庄', '沈阳', '哈尔滨',
    '厦门', '福州', '泉州', '漳州', '苏州', '无锡', '宁波', '温州',
  ];

  var SPECIAL_QUALIFICATIONS = ['公牌', '港澳台', '外籍', '营运车'];

  // 征信等级标准化：A 优质 / B 一般（含白户）/ C 瑕疵
  var CREDIT_GRADES = {
    A: {
      label: '征信优质',
      note: '无逾期、查询少、评分高；满足各机构常规准入，0首付/低首付更易获批，最终以机构审批为准（§十二 0首付门槛/准入材料）',
    },
    B: {
      label: '征信一般（含白户）',
      note: '多数机构可正常进件；中信要求「非白户」、浦发「白户需人工复核」，其余机构以审批为准（§十二 准入材料）',
    },
    C: {
      label: '征信有瑕疵',
      note: '有逾期/污点记录，多数机构有准入门槛，建议先做资质预审并明确风险，以信审/机构审批为准（§六 标签2）',
    },
  };

  var PASS_RATE_WEIGHTS = {
    qualification_fit: 0.35,
    need_fit: 0.25,
    credit_level: 0.2,
    age_headroom: 0.1,
    down_payment_fit: 0.1,
  };

  var CREDIT_BASE = { A: 0.95, B: 0.8, C: 0.6 };

  var CONFIDENCE_FLOOR = 0.6;
  var RAG_RESCUE_REL = 0.3;
  var MAX_CITE_CHARS = 300;
  var TOP_K = 5;

  var APPLICATION_MATERIALS = [
    '身份证（正反面）',
    '驾驶证',
    '收入证明（银行流水 / 工资单 / 社保记录）',
    '征信授权书（客户签字同意查征信）',
    '购车合同或意向协议',
  ];

  var PRE_SCREEN_ITEMS = [
    '征信是否有严重逾期记录',
    '是否在资金方黑名单',
    '基本收入是否达到最低门槛（月供能力）',
    '购车车型是否在资金方支持范围内',
  ];

  var KEYWORDS = [
    '小鹏融租', '小鹏金融', '中国银行', '中行', '建设银行', '建行', '中信银行', '中信',
    '民生银行', '民生', '平安银行', '平安', '招商银行', '招行', '交通银行', '交行',
    '浦发银行', '浦发', '华夏东亚', '易鑫', '平安租赁', '天下达',
    '港澳台', '香港', '澳门', '台湾', '外籍', '公牌', '营运车', '网约车', '公司牌',
    '免抵押', '抵押', '提前还款', '提前结清', '等本等息', '等额本息', '主贷分离',
    '征信瑕疵', '征信', '低利率', '0息', '低息', '3免2', '5免3', '5050', '轻松购',
    '费率', '利率', '年化', '首付', '放款', '还款', '面签', '共申', '共同申请人',
    '驾照', '驾驶证', '上牌', '发票', '绿本', '登记证', '员工内购', '白户',
  ];

  /* ------------------------------------------------------------------
   * 1. 工具函数
   * ---------------------------------------------------------------- */

  function allInstitutions() {
    var d = KB.institutions;
    if (!d) return [];
    return (d.first_class || []).concat(d.second_class || []);
  }

  function findInstitution(q) {
    var list = allInstitutions();
    var i;
    for (i = 0; i < list.length; i++) {
      if (q === list[i].key || q === list[i].name) return list[i];
    }
    for (i = 0; i < list.length; i++) {
      if (list[i].name.indexOf(q) >= 0 || q.indexOf(list[i].name) >= 0) return list[i];
    }
    return null;
  }

  /** "15%" / "25%起" / "0%" → 0.15 / 0.25 / 0.0 */
  function parsePct(text) {
    if (text === null || text === undefined) return 0;
    var t = String(text).split('起')[0].replace(/%/g, '').trim();
    var v = parseFloat(t);
    return isNaN(v) ? 0 : v / 100;
  }

  function clamp(x, lo, hi) {
    lo = lo === undefined ? 0.05 : lo;
    hi = hi === undefined ? 0.95 : hi;
    return Math.max(lo, Math.min(hi, x));
  }

  function round3(x) {
    return Math.round(x * 1000) / 1000;
  }

  /* ------------------------------------------------------------------
   * 2. 事实抽取（facts.py）
   * ---------------------------------------------------------------- */

  function extractQualificationTags(text) {
    var tags = [];
    for (var i = 0; i < QUALIFICATION_MAP.length; i++) {
      var tag = QUALIFICATION_MAP[i][0];
      var kws = QUALIFICATION_MAP[i][1];
      for (var j = 0; j < kws.length; j++) {
        if (text.indexOf(kws[j]) >= 0) {
          tags.push(tag);
          break;
        }
      }
    }
    return tags;
  }

  function extractCity(text) {
    for (var i = 0; i < CITIES.length; i++) {
      if (text.indexOf(CITIES[i]) >= 0) return CITIES[i];
    }
    return '';
  }

  function extractFacts(text) {
    text = text || '';
    var facts = {
      qualification_tags: extractQualificationTags(text),
      age: null,
      term: null,
      down_payment_ratio: null,
      credit: null,
      plate_type: null,
      city: extractCity(text),
      model: null,
      need_tags: [],
      customer_need_text: null,
    };

    var m = text.match(/(\d{2})\s*岁/) || text.match(/(\d{2})\s*周岁/);
    if (m) facts.age = parseInt(m[1], 10);

    m = text.match(/(\d{1,2})\s*期/);
    if (m) facts.term = parseInt(m[1], 10);

    m = text.match(/首付\s*(\d{1,2}(?:\.\d+)?)\s*%/) || text.match(/(\d{1,2}(?:\.\d+)?)\s*%\s*首付/);
    if (m) {
      facts.down_payment_ratio = parseFloat(m[1]) / 100;
    } else if (/0\s*首付|零首付|首付\s*0(?![0-9])/.test(text)) {
      facts.down_payment_ratio = 0.0;
    }

    if (/征信\s*[AＡ]|[AＡ]\s*类|征信好|征信良好/.test(text)) facts.credit = 'A';
    else if (/征信\s*[CＣ]|[CＣ]\s*类/.test(text)) facts.credit = 'C';
    else if (/征信\s*[BＢ]|[BＢ]\s*类|白户/.test(text)) facts.credit = 'B';

    if (/公司|企业|公牌|公司牌|以公司名义/.test(text)) facts.plate_type = '公司';

    m = text.match(/(20\d{2}\s*款|新\s*款?)?\s*(G[679X]|P7\+?|M03|L03|X9)/);
    if (m) facts.model = ((m[1] || '') + m[2]).replace(/\s/g, '');

    for (var i = 0; i < NEED_MAP.length; i++) {
      var tag = NEED_MAP[i][0];
      var kws = NEED_MAP[i][1];
      for (var j = 0; j < kws.length; j++) {
        if (text.indexOf(kws[j]) >= 0) {
          if (facts.need_tags.indexOf(tag) < 0) facts.need_tags.push(tag);
          break;
        }
      }
    }

    var insts = allInstitutions();
    for (var k = 0; k < insts.length; k++) {
      var name = insts[k].name;
      var reSpecify = new RegExp('指定\\s*' + name + '|就要\\s*' + name + '|必须\\s*' + name + '|只[\\u4e00-\\u9fa5]{0,3}' + name);
      var reReject = new RegExp('不要\\s*' + name + '|拒绝\\s*' + name + '|排除\\s*' + name + '|不考虑\\s*' + name);
      if (reSpecify.test(text)) {
        var s = '指定机构:' + name;
        if (facts.need_tags.indexOf(s) < 0) facts.need_tags.push(s);
      }
      if (reReject.test(text)) {
        var r = '拒绝机构:' + name;
        if (facts.need_tags.indexOf(r) < 0) facts.need_tags.push(r);
      }
    }

    return facts;
  }

  /** 是否已有「具体客户画像」——仅有需求标签不算，避免把政策问误判为方案咨询。 */
  function hasCustomerContext(facts) {
    return !!(
      facts.age || facts.term ||
      facts.down_payment_ratio !== null ||
      facts.credit || facts.plate_type
    );
  }

  function buildOrder(facts) {
    return {
      qualification_tags: facts.qualification_tags || [],
      age: facts.age === undefined ? null : facts.age,
      term: facts.term || 36,
      down_payment_ratio: facts.down_payment_ratio !== null && facts.down_payment_ratio !== undefined
        ? facts.down_payment_ratio : 0.2,
      credit: facts.credit || 'B',
      plate_type: facts.plate_type || '个人',
      city: facts.city || '',
      model: facts.model,
      need_tags: facts.need_tags || [],
      customer_need_text: facts.customer_need_text,
    };
  }

  /* ------------------------------------------------------------------
   * 3. 资质识别 + 机构准入（rules_engine.py）
   * ---------------------------------------------------------------- */

  function recognizeQualification(order) {
    var tags = (order.qualification_tags || []).filter(function (t) {
      return SPECIAL_QUALIFICATIONS.indexOf(t) >= 0;
    });
    return {
      tags: tags,
      is_special: tags.length > 0,
      description: tags.length
        ? '客户资质特殊：' + tags.join('、') + '，智选自动匹配不覆盖，需 FI 人工救单'
        : '常规资质，智选可自动匹配',
    };
  }

  function creditNote(credit) {
    var g = CREDIT_GRADES[credit];
    if (!g) return null;
    return '征信' + credit + '（' + g.label + '）：' + g.note;
  }

  /** 车型贴息政策（§二 8月金融政策） */
  function resolveModelPolicy(model) {
    if (!model) return null;
    var prod = KB.products;
    if (!prod || !prod.official_policies) return null;
    var mClean = model.replace(/[\s款]/g, '');
    for (var i = 0; i < prod.official_policies.length; i++) {
      var p = prod.official_policies[i];
      var ms = String(p.models || '').replace(/[\s款]/g, '');
      if (mClean && ms.indexOf(mClean) >= 0) {
        var parts = [model + ' 在贴息车型表内（0首付起、融资5万起），可享 ' + (p.plan_0_rate || '')];
        var alt = p.plan_3free2 || p.plan_5free3 || '';
        if (alt) parts.push('另有 ' + alt);
        parts.push('（小鹏贴息，来源：§二 8月金融政策）');
        return parts.join('；');
      }
    }
    return null;
  }

  /** 从 age_rule 提取「年龄+期限」上限（取所有 XX周岁 的最大值，避免误取 18 周岁底限）。 */
  function ageLimit(inst) {
    var rule = inst.age_rule || '';
    var re = /(\d+)\s*周岁/g;
    var nums = [];
    var m;
    while ((m = re.exec(rule)) !== null) nums.push(parseInt(m[1], 10));
    if (nums.length) return Math.max.apply(null, nums);
    return 70;
  }

  function evaluateEligibility(order, inst) {
    var reasons = [];
    var matchInfo = {
      qualification_fit: 1.0,
      need_fit: 1.0,
      min_down_payment: inst.min_down_payment || '0%',
      extra_notes: [],
    };

    var tags = recognizeQualification(order).tags;
    var age = order.age;
    var term = order.term;
    var termYears = term / 12;
    var limit = ageLimit(inst);

    // 1) 资质类准入
    if (tags.indexOf('营运车') >= 0) {
      if (!inst.accepts_commercial) {
        return {
          eligible: false,
          reasons: [inst.name + ' 不受理营运车分期（来源：§一 汇总表 / §十 营运车产品）'],
          max_term: null,
          match_info: matchInfo,
        };
      }
      if (order.plate_type === '公司' && inst.key !== 'huaxia_dongya') {
        return {
          eligible: false,
          reasons: [inst.name + ' 营运车产品仅适用个人客户，公司购车仅华夏东亚可承接（来源：§十）'],
          max_term: null,
          match_info: matchInfo,
        };
      }
      reasons.push(
        inst.name + ' 受理营运车分期：' + (inst.commercial_rate || '') +
        '（来源：§十 营运车产品总表 2026年版）'
      );
      matchInfo.commercial = true;
      matchInfo.min_down_payment = inst.commercial_down_payment || inst.min_down_payment || '0%';
    }

    if (tags.indexOf('公牌') >= 0) {
      if (!inst.accepts_public_plate) {
        return {
          eligible: false,
          reasons: [inst.name + ' 不受理公牌（来源：§一 汇总对比表）'],
          max_term: null,
          match_info: matchInfo,
        };
      }
      reasons.push(inst.name + ' 受理公牌（来源：§一 汇总对比表）');
      if (inst.key === 'xiaopeng_rongzu') {
        matchInfo.extra_notes.push(
          '小鹏融租公牌：最多两台，上牌人为公司，需工商公示的法人/股东/监事做共同申请人（§十二）'
        );
      }
    }

    if (tags.indexOf('港澳台') >= 0 || tags.indexOf('外籍') >= 0) {
      if (!inst.accepts_hmt_foreign) {
        return {
          eligible: false,
          reasons: [inst.name + ' 不受理港澳台/外籍客户（来源：§一 汇总对比表）'],
          max_term: null,
          match_info: matchInfo,
        };
      }
      var hmt = KB.hmt_foreign;
      var row = null;
      if (hmt && hmt.institutions) {
        for (var i = 0; i < hmt.institutions.length; i++) {
          var r = hmt.institutions[i];
          if (inst.key.indexOf(r.key) >= 0 || r.key.indexOf(inst.key) >= 0 ||
              inst.name.indexOf(r.name) >= 0 || r.name.indexOf(inst.name) >= 0) {
            row = r;
            break;
          }
        }
      }
      if (row) {
        reasons.push(
          inst.name + ' 受理港澳台/外籍：首付 ' + row.min_down_payment + '，' + row.age_rule +
          '（来源：§十一）'
        );
        matchInfo.min_down_payment = row.min_down_payment;
        matchInfo.extra_notes.push(
          '港澳台客户需增加一位拥有大陆户籍的人士做共申，共申申请材料与主申一致（§十一）'
        );
      } else {
        reasons.push(inst.name + ' 受理港澳台/外籍，最低首付15%（来源：§一 二类机构汇总表）');
        matchInfo.extra_notes.push('港澳台客户需增加大陆户籍共申人（§十一）');
      }
    }

    // 2) 年龄 + 期限准入
    var maxTermMonths = Math.min(60, Math.floor((limit - (age === null || age === undefined ? 30 : age)) * 12));
    if (age !== null && age !== undefined && termYears > limit - age) {
      var extra = '';
      if (inst.key === 'xiaopeng_rongzu' && age + termYears > 68) {
        extra = '；且年龄+期限超68周岁需添加直系亲属作为共同申请人';
      }
      return {
        eligible: false,
        reasons: [
          inst.name + ' 年龄要求 ' + inst.age_rule + '；客户 ' + age + ' 岁 + ' + term + ' 期（' +
          Math.round(termYears) + ' 年）超出上限，该机构最长期限约 ' + maxTermMonths + ' 期' + extra +
          '（来源：§十二 机构详解）',
        ],
        max_term: maxTermMonths,
        match_info: matchInfo,
      };
    }
    if (age !== null && age !== undefined) {
      reasons.push(
        '年龄 ' + age + ' 岁 + 期限 ' + term + ' 期（' + Math.round(termYears) + ' 年）满足 ' +
        inst.name + ' 要求（上限 ' + limit + ' 周岁，来源：§十二）'
      );
      if (inst.key === 'xiaopeng_rongzu' && age + termYears > 68) {
        matchInfo.extra_notes.push('小鹏融租：年龄+期限超68周岁需添加直系亲属作为共同申请人（§十二）');
      }
    }
    matchInfo.max_term = maxTermMonths;

    // 3) 首付能力
    var minDpText = matchInfo.min_down_payment;
    var minDp = parsePct(minDpText);
    if ((order.down_payment_ratio || 0) < minDp) {
      matchInfo.qualification_fit = 0.6;
      reasons.push(
        '客户首付比例 ' + Math.round((order.down_payment_ratio || 0) * 100) + '% 低于 ' + inst.name +
        ' 最低首付 ' + minDpText + '，需补首付或沟通调整（来源：§一）'
      );
    }

    return { eligible: true, reasons: reasons, max_term: maxTermMonths, match_info: matchInfo };
  }

  function matchInstitutions(order, scope) {
    scope = scope || 'all';
    var d = KB.institutions || {};
    var pool = [];
    if (scope === 'all' || scope === 'first') pool = pool.concat(d.first_class || []);
    if (scope === 'all' || scope === 'second') pool = pool.concat(d.second_class || []);
    var out = [];
    for (var i = 0; i < pool.length; i++) {
      var ev = evaluateEligibility(order, pool[i]);
      if (ev.eligible) out.push({ inst: pool[i], eval: ev });
    }
    return out;
  }

  /* ------------------------------------------------------------------
   * 4. 特殊需求理解与约束（rules_engine.py · S3）
   * ---------------------------------------------------------------- */

  function understandSpecialNeeds(order) {
    var needs = [];
    var raw = order.need_tags || [];
    for (var i = 0; i < raw.length; i++) {
      var tag = raw[i];
      if (tag.indexOf('指定机构:') === 0) {
        var st = tag.split(':')[1];
        needs.push({ type: '指定机构', target: st, note: '客户指定机构：' + st });
      } else if (tag.indexOf('拒绝机构:') === 0) {
        var rt = tag.split(':')[1];
        needs.push({ type: '拒绝机构', target: rt, note: '客户拒绝机构：' + rt });
      } else if (tag === '免抵押') {
        needs.push({ type: '免抵押', target: null, note: '客户要求免抵押（无100%免抵押机构，以机构审核为准，来源：§十三 FAQ）' });
      } else if (tag === '提前还款') {
        needs.push({ type: '提前还款', target: null, note: '客户有提前还款计划（等本等息更友好，来源：§六/§十三）' });
      } else if (tag === '主贷分离') {
        needs.push({ type: '主贷分离', target: null, note: '申请人非上牌人，需支持主贷分离的机构（来源：§六）' });
      } else if (tag === '征信瑕疵') {
        needs.push({ type: '征信瑕疵', target: null, note: '客户征信有瑕疵（来源：§六 标签2）' });
      } else if (tag === '低利率') {
        needs.push({ type: '低利率', target: null, note: '客户要求利率尽量低（优先 24期0息 / 3免2 等贴息产品，来源：§二）' });
      } else if (tag === '0息') {
        var mp = resolveModelPolicy(order.model);
        var note = mp
          ? '客户要求0息/免息：' + mp
          : '客户要求0息/免息（24期0息 / 36期0息 贴息产品，按车型贴息；若已知车型可享对应免息，来源：§二 8月金融政策）';
        needs.push({ type: '0息', target: null, note: note });
      } else {
        needs.push({ type: '其他', target: tag, note: '客户标注：' + tag });
      }
    }
    if (order.customer_need_text && !needs.length) {
      needs.push({ type: '自然语言', target: order.customer_need_text, note: '客户需求描述（未结构化为标签，建议 FI 确认）' });
    }
    return needs;
  }

  /** 刚需标签支持条目里的机构名是否覆盖目标机构（如 '小鹏融租/中信/平安（0息产品）'）。 */
  function needEntryMatches(entry, instName) {
    var text = entry.institution || '';
    if (instName && text.indexOf(instName) >= 0) return true;
    var parts = text.split(/[/、]/);
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] && instName && instName.indexOf(parts[i]) >= 0) return true;
    }
    return false;
  }

  /** 地区约束核对：返回 [是否明确支持, 说明] */
  function areaCheck(entry, city) {
    var provinces = entry.provinces || '';
    var cities = entry.cities || '';
    if (provinces === '所有省份') return [true, '全国可做'];
    if (city && cities !== '—' && cities.indexOf(city) >= 0) return [true, '城市清单包含 ' + city];
    if (cities === '—' && provinces !== '所有省份' && provinces !== '—') return [false, '仅限：' + provinces];
    if (cities !== '—' && cities !== '' && provinces !== '所有省份' && provinces !== '—') {
      return [false, '支持地区未覆盖客户城市（' + provinces + ' / 城市清单），建议人工核对'];
    }
    return [true, '支持（地区以原始对照表为准）'];
  }

  var TAG_MAP = {
    免抵押: 'tag_no_mortgage',
    提前还款: 'tag_early_repay',
    主贷分离: 'tag_main_loan_sep',
    征信瑕疵: 'tag_credit_flaw',
  };

  /** 某机构对某个特殊需求的满足度：1.0 满足 / 0.5 有条件 / 0.0 不满足 */
  function needSupport(need, inst, order) {
    var ntype = need.type;
    var name = inst.name;
    var city = order.city || '';

    if (ntype === '指定机构') {
      var target = need.target;
      return name.indexOf(target) >= 0
        ? [1.0, '客户指定机构：' + target]
        : [0.0, '非客户指定机构（客户指定 ' + target + '）'];
    }
    if (ntype === '拒绝机构') {
      var rt = need.target;
      return name.indexOf(rt) >= 0 ? [0.0, '客户明确拒绝 ' + rt] : [1.0, '未被客户拒绝'];
    }
    if (ntype === '低利率' || ntype === '0息') {
      var free3 = ['中国银行', '平安银行', '招商银行', '浦发银行', '小鹏融租', '中信银行'];
      if (free3.indexOf(name) >= 0) {
        return [1.0, '可做 0息/低息/3免2/5免3 贴息产品（来源：§二 3免2及5免3注意事项）'];
      }
      if (name === '易鑫') {
        return [0.8, '易鑫 3免2/5免3 费率与一类机构一致，用于承接一类机构拒绝客户（§二）'];
      }
      return [0.3, '未检索到该机构贴息产品，以实际政策为准'];
    }

    var tagId = TAG_MAP[ntype];
    if (!tagId) return [1.0, '需求类型未接入规则表，默认放行（需 FI 确认）'];

    var tagsData = KB.need_tags;
    var tag = null;
    if (tagsData && tagsData.tags) {
      for (var i = 0; i < tagsData.tags.length; i++) {
        if (tagsData.tags[i].id === tagId) { tag = tagsData.tags[i]; break; }
      }
    }
    if (!tag) return [1.0, '需求类型未接入规则表，默认放行（需 FI 确认）'];

    var entries = [];
    for (var j = 0; j < (tag.support || []).length; j++) {
      if (needEntryMatches(tag.support[j], name)) entries.push(tag.support[j]);
    }
    if (!entries.length) return [0.0, name + ' 不支持「' + tag.name + '」（来源：§六 对照表）'];

    for (var k = 0; k < entries.length; k++) {
      var res = areaCheck(entries[k], city);
      if (res[0]) return [1.0, name + ' 支持「' + tag.name + '」（' + res[1] + '，来源：§六 对照表）'];
    }
    return [
      0.5,
      name + ' 支持「' + tag.name + '」但地区需人工核对（' + entries[0].provinces + ' / ' +
      entries[0].cities + '，来源：§六）',
    ];
  }

  function applyNeedConstraints(order, candidates, needs) {
    var out = [];
    for (var i = 0; i < candidates.length; i++) {
      var inst = candidates[i].inst;
      var row = { inst: inst, eval: candidates[i].eval, need_fit: 1.0, need_notes: [], excluded: false };
      for (var j = 0; j < needs.length; j++) {
        var fitNote = needSupport(needs[j], inst, order);
        row.need_notes.push('[' + needs[j].type + '] ' + fitNote[1]);
        if ((needs[j].type === '指定机构' || needs[j].type === '拒绝机构') && fitNote[0] <= 0) {
          row.excluded = true;
        }
        row.need_fit *= fitNote[0];
      }
      out.push(row);
    }
    return out;
  }

  /* ------------------------------------------------------------------
   * 5. 匹配度评分（pass_rate.py）
   *    说明：这不是「预测通过率」，而是基于真实规则的「匹配度」排序分（0~1）。
   *    生产环境可用 XGBoost 实现同名接口替换，流程无需改动。
   * ---------------------------------------------------------------- */

  function ageHeadroom(order, inst) {
    var age = order.age || 35;
    var termYears = (order.term || 60) / 12;
    var rule = inst.age_rule || '';
    var limits = [73, 70, 65, 60];
    for (var i = 0; i < limits.length; i++) {
      if (rule.indexOf(String(limits[i])) >= 0) {
        var headroom = limits[i] - (age + termYears);
        if (headroom >= 10) return 1.0;
        if (headroom >= 3) return 0.8;
        if (headroom >= 0) return 0.55;
        return 0.15;
      }
    }
    return 0.8;
  }

  function downPaymentFit(order, matchInfo) {
    // 注意：这里用 ?? 语义而非 Python 的 `or`，保证「0 首付」被正确识别为 0 而不是回退 20%。
    var offered = order.down_payment_ratio;
    if (offered === null || offered === undefined) offered = 0.2;
    var minDp = parsePct(matchInfo.min_down_payment || '0%');
    if (offered >= minDp) return 1.0;
    if (offered >= 0.5 * minDp) return 0.6;
    return 0.2;
  }

  function scoreCandidates(order, candidates) {
    var w = PASS_RATE_WEIGHTS;
    var scores = {};
    for (var i = 0; i < candidates.length; i++) {
      var mi = candidates[i].eval.match_info;
      var inst = candidates[i].inst;
      var s =
        w.qualification_fit * (mi.qualification_fit === undefined ? 0 : mi.qualification_fit) +
        w.need_fit * (candidates[i].need_fit === undefined ? 1 : candidates[i].need_fit) +
        w.credit_level * (CREDIT_BASE[order.credit || 'B'] || 0.8) +
        w.age_headroom * ageHeadroom(order, inst) +
        w.down_payment_fit * downPaymentFit(order, mi);
      scores[inst.name] = round3(clamp(s));
    }
    return scores;
  }

  /* ------------------------------------------------------------------
   * 6. 方案咨询（planner.py）
   * ---------------------------------------------------------------- */

  function fmtRate(inst, ev) {
    if (ev.match_info.commercial) return inst.commercial_rate || inst.std_rate || '';
    return inst.std_rate || inst.commercial_rate || '';
  }

  function fmtDown(ev, inst) {
    return ev.match_info.min_down_payment || inst.min_down_payment || '0%';
  }

  function fmtTerm(ev, inst) {
    if (ev.match_info.commercial) return inst.commercial_term || '以机构为准';
    var mt = ev.max_term;
    if (mt && mt < 60) return '最长 ' + mt + ' 期';
    return '以机构为准';
  }

  function startsWithAny(s, prefixes) {
    for (var i = 0; i < prefixes.length; i++) {
      if (s.indexOf(prefixes[i]) === 0) return true;
    }
    return false;
  }

  function consult(facts) {
    var order = buildOrder(facts);
    var needs = understandSpecialNeeds(order);
    var qualification = recognizeQualification(order);

    var candidates = matchInstitutions(order, 'all');
    var rows = applyNeedConstraints(order, candidates, needs);

    var eligible = rows.filter(function (r) { return !r.excluded; });
    var excluded = rows.filter(function (r) { return r.excluded; });

    if (eligible.length) {
      for (var i = 0; i < eligible.length; i++) {
        eligible[i].eval.match_info.need_fit = eligible[i].need_fit;
      }
      var scores = scoreCandidates(order, eligible);
      for (var j = 0; j < eligible.length; j++) {
        eligible[j].score = scores[eligible[j].inst.name] || 0;
      }
      eligible.sort(function (a, b) { return b.score - a.score; });
    }

    return renderConsult(order, facts, needs, qualification, eligible, excluded);
  }

  function renderConsult(order, facts, needs, qualification, eligible, excluded) {
    // ---- 客户画像回显（只展示客户实际提供的值，未提供的标注「未提及」）----
    var tags = qualification.tags;
    var portrait = [];
    if (tags.length) portrait.push({ label: '资质', value: tags.join('、'), accent: true });
    portrait.push({ label: '年龄', value: facts.age ? facts.age + ' 岁' : '未提及', missing: !facts.age });
    portrait.push({ label: '期限', value: facts.term ? facts.term + ' 期' : '未提及', missing: !facts.term });
    portrait.push({
      label: '首付',
      value: facts.down_payment_ratio !== null && facts.down_payment_ratio !== undefined
        ? Math.round(facts.down_payment_ratio * 100) + '%' : '未提及',
      missing: facts.down_payment_ratio === null || facts.down_payment_ratio === undefined,
    });
    portrait.push({ label: '征信', value: facts.credit || '未提及', missing: !facts.credit });
    if (facts.plate_type === '公司') portrait.push({ label: '主体', value: '公司购车', accent: true });
    portrait.push({ label: '城市', value: facts.city || '未提及', missing: !facts.city });
    if (facts.model) portrait.push({ label: '车型', value: facts.model });
    if (needs.length) portrait.push({ label: '需求', value: needs.map(function (n) { return n.note; }).join('；'), accent: true });

    var POSITIVE = ['满足', '支持', '可做', '受理', '承接'];

    var recommendations = [];
    for (var i = 0; i < Math.min(TOP_K, eligible.length); i++) {
      var rec = eligible[i];
      var inst = rec.inst;
      var ev = rec.eval;
      var mi = ev.match_info;
      var reasons = (ev.reasons || []).filter(function (r) {
        return !startsWithAny(r, ['年龄', '期限', '费率']);
      }).slice(0, 3);
      var ageTerm = (ev.reasons || []).filter(function (r) {
        return startsWithAny(r, ['年龄', '期限', '费率']);
      }).slice(0, 3);
      var needNotes = (rec.need_notes || []).filter(function (n) {
        for (var k = 0; k < POSITIVE.length; k++) if (n.indexOf(POSITIVE[k]) >= 0) return true;
        return false;
      }).slice(0, 4);

      recommendations.push({
        key: inst.key,
        name: inst.name,
        tier: inst.tier,
        score: rec.score,
        rate: fmtRate(inst, ev),
        down_payment: fmtDown(ev, inst),
        term: fmtTerm(ev, inst),
        approval_validity: inst.approval_validity,
        offline_signing: inst.offline_signing,
        early_settlement: inst.early_settlement,
        reasons: reasons,
        age_term: ageTerm,
        extra_notes: (mi.extra_notes || []).slice(0, 2),
        need_notes: needNotes,
        all_need_notes: rec.need_notes || [],
        commercial: !!mi.commercial,
        source: inst.source_lines || '',
      });
    }

    var otherInstitutions = eligible.slice(TOP_K).map(function (r) { return r.inst.name; });
    var excludedReasons = [];
    for (var e = 0; e < excluded.length; e++) {
      for (var n = 0; n < (excluded[e].need_notes || []).length; n++) {
        var note = excluded[e].need_notes[n];
        if (note.indexOf('拒绝') >= 0 || note.indexOf('非客户指定') >= 0 || note.indexOf('不受理') >= 0) {
          excludedReasons.push({ name: excluded[e].inst.name, reason: note });
        }
      }
    }

    var sources = [];
    for (var s = 0; s < Math.min(TOP_K, eligible.length); s++) {
      var nm = eligible[s].inst.name;
      var sl = eligible[s].inst.source_lines;
      if (sl) sources.push(nm + '：' + sl);
    }

    var missing = [];
    if (!facts.age && !facts.term) missing.push('年龄/期限');
    if (facts.down_payment_ratio === null || facts.down_payment_ratio === undefined) missing.push('首付比例');
    if (!facts.city) missing.push('所在城市（影响免抵押/提前还款等地区约束）');
    missing.push('车价/贷款金额、月收入（月供能力）');

    return {
      kind: 'consult',
      portrait: portrait,
      recommendations: recommendations,
      other_institutions: otherInstitutions,
      excluded: excluded.map(function (r) { return r.inst.name; }),
      excluded_reasons: excludedReasons,
      needs: needs,
      matched: eligible.length,
      top_institutions: eligible.slice(0, TOP_K).map(function (r) { return r.inst.name; }),
      missing_hint: missing,
      sources: sources,
      credit_note: creditNote(facts.credit),
      qualification: qualification,
      application_materials: APPLICATION_MATERIALS,
      pre_screen_items: PRE_SCREEN_ITEMS,
      model_policy: resolveModelPolicy(facts.model),
    };
  }

  /* ------------------------------------------------------------------
   * 7. 政策问答（s7_qa.py）
   *    结构化规则精确命中 + 原文片段 2-gram 相关性重排 + 置信度 + 降级
   * ---------------------------------------------------------------- */

  function qGrams(q) {
    var norm = q.replace(/[\s，。？！、：；""''（）()【】·~`#%&*]/g, '');
    if (norm.length < 2) return [norm];
    var out = [];
    for (var i = 0; i < norm.length - 1; i++) out.push(norm.substr(i, 2));
    return out;
  }

  function relevance(q, passage) {
    var grams = qGrams(q);
    if (!grams.length) return 0;
    var hit = 0;
    for (var i = 0; i < grams.length; i++) if (passage.indexOf(grams[i]) >= 0) hit++;
    return hit / grams.length;
  }

  /**
   * 片段是否含有效内容：原文里有大量 markdown 表格分隔行（| --- |）与纯标题行，
   * 这些片段即使相关度不低也不适合作为引用展示。
   */
  function contentLen(text) {
    return String(text || '').replace(/[\s|\-=·#>*_]/g, '').length;
  }

  function hasContent(text) {
    return contentLen(text) >= 12;
  }

  /** 在《金融百宝箱》原文片段上做相关性检索（等价于后端向量检索的重排环节）。 */
  function retrieve(q, top) {
    top = top || 3;
    var doc = KB.doc;
    if (!doc || !doc.chunks) return [];
    var scored = [];
    for (var i = 0; i < doc.chunks.length; i++) {
      var c = doc.chunks[i];
      if (!hasContent(c.text)) continue;
      var rel = relevance(q, c.text);
      if (rel > 0.12) scored.push({ chunk: c, rel: rel });
    }
    // 主排序：相关度（2-gram 覆盖率，与后端同口径，不人为扭曲指标）。
    // 次级排序：内容长度。纯章节标题这类短片段的 2-gram 覆盖率容易虚高到 1.00，
    // 用长度作为并列时的裁决，把信息量更足的片段排到前面。
    scored.sort(function (a, b) {
      return (b.rel - a.rel) || (contentLen(b.chunk.text) - contentLen(a.chunk.text));
    });
    return scored.slice(0, top);
  }

  function cleanCitation(p) {
    p = p.replace(/!?\[[^\]]*\]\([^)]*\)/g, '');
    p = p.replace(/https?:\/\/\S+/g, '（链接见原文）');
    p = p.replace(/\|/g, ' · ');
    p = p.replace(/#{1,6}\s*/g, '');
    p = p.replace(/\*\*/g, '');
    p = p.replace(/\s*\n\s*/g, '；');
    p = p.replace(/\s{2,}/g, ' ').trim();
    return p;
  }

  function structuredLookup(q) {
    var results = [];
    var i;

    // FAQ（§十三）
    var faqs = (KB.faq && KB.faq.faqs) || [];
    for (i = 0; i < faqs.length; i++) {
      var faq = faqs[i];
      var hits = [];
      for (var j = 0; j < (faq.keywords || []).length; j++) {
        if (q.indexOf(faq.keywords[j]) >= 0) hits.push(faq.keywords[j]);
      }
      if (hits.length) {
        results.push({
          title: faq.question,
          body: faq.answer,
          source: '金融百宝箱 §十三 常见问题解答',
          score: Math.min(1.0, 0.68 + 0.16 * hits.length),
          topic: 'FAQ：' + faq.question,
        });
      }
    }

    // 港澳台 / 外籍（§十一）
    if (/港澳台|香港|澳门|台湾|外籍|港籍|台籍/.test(q)) {
      var hmt = KB.hmt_foreign;
      if (hmt) {
        var bullets = (hmt.institutions || []).map(function (r) {
          return { label: r.name, text: '首付 ' + r.min_down_payment + '，' + r.age_rule + '，' + r.repayment };
        });
        results.push({
          title: '港澳台/外籍客户指引（§十一）',
          body: hmt.summary || '',
          bullets: bullets,
          notes: hmt.special_notes || [],
          source: '金融百宝箱 §十一 港澳台/外籍客户指引',
          score: 0.9,
          topic: '港澳台/外籍客户指引',
        });
      }
    }

    // 营运车（§十）
    if (/营运|网约|出租|商用|货拉拉|滴滴/.test(q)) {
      var com = KB.commercial;
      if (com) {
        var cbullets = (com.institutions || []).map(function (r) {
          return {
            label: r.name,
            text: r.product_type + '，费率 ' + r.rate + '，首付 ' + r.min_down_payment +
                  '，期限 ' + r.term + '，适用 ' + r.applicable_customer + '，准入 ' + r.admission,
          };
        });
        results.push({
          title: '营运车分期产品（§十，2026年版）',
          body: com.summary || '',
          bullets: cbullets,
          notes: [],
          source: '金融百宝箱 §十 营运车分期产品',
          score: 0.9,
          topic: '营运车分期产品',
        });
      }
    }

    // 刚需标签（§六）
    var tagKeywordMap = { 免抵押: 'tag_no_mortgage', 提前: 'tag_early_repay', 等本等息: 'tag_early_repay', 主贷分离: 'tag_main_loan_sep', 征信瑕疵: 'tag_credit_flaw', 征信: 'tag_credit_flaw' };
    var tagKeys = Object.keys(tagKeywordMap);
    for (i = 0; i < tagKeys.length; i++) {
      if (q.indexOf(tagKeys[i]) >= 0) {
        var tagsData = KB.need_tags;
        var found = null;
        if (tagsData && tagsData.tags) {
          for (var t = 0; t < tagsData.tags.length; t++) {
            if (tagsData.tags[t].id === tagKeywordMap[tagKeys[i]]) { found = tagsData.tags[t]; break; }
          }
        }
        if (found) {
          var tbullets = (found.support || []).map(function (e) {
            return { label: e.institution, text: '省份 ' + e.provinces + '；城市 ' + e.cities };
          });
          results.push({
            title: found.name + ' → 可支持机构/地区（§六）',
            body: found.description || '',
            bullets: tbullets,
            notes: [],
            source: '金融百宝箱 §六 客户刚需标签',
            score: 0.85,
            topic: '刚需标签：' + found.name,
          });
          break;
        }
      }
    }

    // 机构详解（§十二 / §一）
    var inst = findInstitution(q);
    if (inst) {
      var ibullets = [
        { label: '标准费率 / 最低首付', text: inst.std_rate + '　·　' + inst.min_down_payment },
        { label: '年龄要求', text: inst.age_rule },
        { label: '线下面签 / 同贷书有效期', text: inst.offline_signing + '　·　' + inst.approval_validity },
        { label: '准入资料', text: inst.entry_materials },
        { label: '放款材料', text: inst.disbursement_materials },
        { label: '提前结清', text: inst.early_settlement },
      ];
      results.push({
        title: inst.name + '（机构详解）',
        body: '',
        bullets: ibullets,
        notes: inst.special_notes || [],
        source: '金融百宝箱 §十二 机构详解（' + inst.name + '）',
        score: 0.85,
        topic: '机构详解：' + inst.name,
      });
    }

    // 产品政策（§二）
    if (/0息|低息|3免2|5免3|5050|轻松购|费率|年化|利率|金融政策|贴息|免息/.test(q)) {
      var prod = KB.products;
      if (prod) {
        var pbullets = [];
        (prod.official_policies || []).forEach(function (p) {
          var lines = [];
          if (p.plan_0_rate) lines.push(p.plan_0_rate);
          if (p.plan_3free2) lines.push('3免2：' + p.plan_3free2);
          if (p.plan_5free3) lines.push('5免3：' + p.plan_5free3);
          if (p.plan_36_60) lines.push(p.plan_36_60);
          if (p.plan_60) lines.push(p.plan_60);
          pbullets.push({ label: p.models, text: lines.join('　·　') });
        });
        var pnotes = [
          '标准费率：12-60期 年费率 2.49%（GX/新P7/G7/G6/G9/26款P7+）或 2.79%（L03/M03/P7+/X9）。',
          '5050轻松购：50%首付、12/24期、4.57%-5.26%。',
          prod.free3_free5_note || '',
        ];
        if (/费率|利率|年化/.test(q)) pnotes.push('费率 vs 利率：年费率 × 1.83 ≈ 年利率（来源：§十三 FAQ）。');
        results.push({
          title: '8月金融政策摘要（§二，贴息随车型）',
          body: '',
          bullets: pbullets,
          notes: pnotes.filter(Boolean),
          source: '金融百宝箱 §二 8月金融政策',
          score: 0.85,
          topic: '8月金融政策',
        });
      }
    }

    // 二类机构承接（§一 二类机构汇总 + §二 易鑫承接）
    if (q.indexOf('二类') >= 0 || q.indexOf('承接') >= 0 || /被.{0,10}(拒|驳)|驳回/.test(q)) {
      var sec = allInstitutions().filter(function (x) { return x.tier === 2; });
      var sbullets = sec.map(function (x) {
        return { label: x.name, text: '标准费率 ' + x.std_rate + '，最低首付 ' + x.min_down_payment + '，线下面签「' + x.offline_signing + '」' };
      });
      results.push({
        title: '二类机构承接指南（§一 / §二）',
        body: '一类机构被拒 / 智选不通过时，可承接的二类机构共 4 家：华夏东亚、易鑫、平安租赁、天下达直租。',
        bullets: sbullets,
        notes: [
          '易鑫 的 3免2 / 5免3 产品车型对应费率与一类机构完全一致，专门用于承接一类机构拒绝的客户（来源：§二）。',
          '承接选择还要看客户资质：港澳台/外籍仅「华夏东亚」承接（最低首付15%）；营运车由华夏东亚 / 易鑫 / 平安租赁承接（天下达不接营运车）。',
        ],
        source: '金融百宝箱 §一 二类机构汇总对比表（L305-331）＋ §二 易鑫承接（L450）',
        score: 0.9,
        topic: '二类机构承接',
      });
    }

    // 线下面签
    if (/面签|线下签约|线下合同|视频面签|线上面签|上门面签/.test(q)) {
      var all = allInstitutions();
      var fbullets = all.filter(function (x) { return x.tier === 1; })
        .map(function (x) { return { label: x.name, text: x.offline_signing }; })
        .concat(all.filter(function (x) { return x.tier === 2; })
          .map(function (x) { return { label: x.name, text: x.offline_signing }; }));
      results.push({
        title: '各机构是否需要线下面签（§一 汇总对比表）',
        body: '',
        bullets: fbullets,
        notes: [],
        source: '金融百宝箱 §一 汇总对比表「是否需要线下面签」',
        score: 0.9,
        topic: '线下面签',
      });
    }

    // 去重（同 topic 只留最高分）
    var seen = {};
    for (i = 0; i < results.length; i++) {
      var r = results[i];
      if (!seen[r.topic] || r.score > seen[r.topic].score) seen[r.topic] = r;
    }
    var list = Object.keys(seen).map(function (k) { return seen[k]; });
    list.sort(function (a, b) { return b.score - a.score; });
    return list;
  }

  function answerPolicy(question) {
    var q = (question || '').trim();
    if (!q) {
      return { kind: 'policy', question: q, blocks: [], confidence: 0, degraded: false, sources: [], citations: [], topics: [] };
    }

    var structured = structuredLookup(q);

    var ranked = retrieve(q, 3);
    var topRel = ranked.length ? ranked[0].rel : 0;
    var ragScore = topRel > 0 ? round3(Math.min(0.95, 0.35 + 0.65 * topRel)) : 0;

    var structScore = 0;
    for (var i = 0; i < structured.length; i++) structScore = Math.max(structScore, structured[i].score);
    var confidence = round3(Math.max(structScore, ragScore));

    var degraded = structured.length === 0 && topRel < RAG_RESCUE_REL;

    var citations = [];
    if (!degraded && ranked.length) {
      for (var j = 0; j < ranked.length; j++) {
        if (ranked[j].rel < RAG_RESCUE_REL) continue;
        var c = cleanCitation(ranked[j].chunk.text);
        if (c.length > MAX_CITE_CHARS) c = c.slice(0, MAX_CITE_CHARS) + '…';
        citations.push({
          text: c,
          chapter: ranked[j].chunk.chapter,
          lines: 'L' + ranked[j].chunk.from + '-' + ranked[j].chunk.to,
          rel: round3(ranked[j].rel),
        });
      }
    }

    var sources = [];
    for (var s = 0; s < structured.length; s++) {
      if (sources.indexOf(structured[s].source) < 0) sources.push(structured[s].source);
    }
    if (citations.length) {
      sources.push('原文检索（《金融百宝箱》，经相关度重排）');
    }

    return {
      kind: degraded ? 'degrade' : 'policy',
      question: q,
      blocks: structured,
      citations: citations,
      confidence: confidence,
      degraded: degraded,
      sources: sources,
      topics: structured.map(function (r) { return r.topic; }),
    };
  }

  /* ------------------------------------------------------------------
   * 8. 意图路由（agent.py）
   * ---------------------------------------------------------------- */

  var GREETINGS = ['你好', '您好', '在吗', '嗨', 'hello', 'hi', '你是谁', '你能做什么', '能干嘛',
    '能做什么', 'help', '帮助', '怎么用', '功能介绍', '开始'];

  function hasRealQuestion(text) {
    var stripped = String(text).toLowerCase();
    for (var i = 0; i < GREETINGS.length; i++) {
      stripped = stripped.split(GREETINGS[i]).join('');
    }
    return stripped.trim().length >= 2;
  }

  function isGreeting(text) {
    var lower = String(text).toLowerCase();
    for (var i = 0; i < GREETINGS.length; i++) {
      if (lower.indexOf(GREETINGS[i]) >= 0) return !hasRealQuestion(text);
    }
    return false;
  }

  function planTurn(text) {
    text = (text || '').trim();
    if (!text) return { kind: 'help' };

    if (isGreeting(text)) return { kind: 'help' };

    var facts = extractFacts(text);
    if (hasCustomerContext(facts)) {
      var res = consult(facts);
      res.question = text;
      res.facts = facts;
      return res;
    }

    var policy = answerPolicy(text);
    policy.question = text;
    return policy;
  }

  /* ------------------------------------------------------------------
   * 9. 导出
   * ---------------------------------------------------------------- */

  global.FIEngine = {
    extractFacts: extractFacts,
    hasCustomerContext: hasCustomerContext,
    buildOrder: buildOrder,
    allInstitutions: allInstitutions,
    findInstitution: findInstitution,
    evaluateEligibility: evaluateEligibility,
    matchInstitutions: matchInstitutions,
    recognizeQualification: recognizeQualification,
    creditNote: creditNote,
    consult: consult,
    answerPolicy: answerPolicy,
    planTurn: planTurn,
    retrieve: retrieve,
    cleanCitation: cleanCitation,
    constants: {
      CREDIT_GRADES: CREDIT_GRADES,
      PASS_RATE_WEIGHTS: PASS_RATE_WEIGHTS,
      CONFIDENCE_FLOOR: CONFIDENCE_FLOOR,
      APPLICATION_MATERIALS: APPLICATION_MATERIALS,
      PRE_SCREEN_ITEMS: PRE_SCREEN_ITEMS,
      KEYWORDS: KEYWORDS,
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
