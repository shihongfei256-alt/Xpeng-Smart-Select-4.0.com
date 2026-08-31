/* =====================================================================
 * kb.js —— 自动生成，请勿手改（源：fi_ai_assistant/data/kb_rules/*.json）
 * 生成脚本：web_v2/build_kb.js   |   生成时间：2026-08-31T03:33:37.992Z
 *
 * 内容与后端 Python 规则引擎完全同源，均人工提取自《金融百宝箱》，
 * 每条规则带来源章节与行号。修改规则请改后端 JSON 后重跑构建脚本。
 * ===================================================================== */
(function (global) {
  'use strict';
  if (!global.KB) global.KB = {};
  Object.assign(global.KB, {
    "institutions": {
      "meta": {
        "name": "合作机构规则表",
        "source": "金融百宝箱 §一（一类机构汇总对比表9家 / 二类机构汇总对比表4家）及 §十二 机构详解",
        "source_file": "knowledge_docs/金融百宝箱.md",
        "note": "人工从飞书《金融百宝箱》结构化提取，每条含来源标注；具体准入以客户实际情况为准",
        "extract_date": "2026-08"
      },
      "first_class": [
        {
          "key": "xiaopeng_rongzu",
          "name": "小鹏融租",
          "tier": 1,
          "license": "是/科一",
          "std_rate": "2.49%/2.79%（跟随车型政策）",
          "min_down_payment": "0%",
          "main_loan_separation": "否",
          "offline_signing": "否",
          "approval_validity": "180天（资金方为上海银行：90天）",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": true,
          "accepts_commercial": false,
          "age_rule": "年满18周岁，最高年龄+分期期限不超过73周岁（年龄+分期期限超过68周岁需添加直系亲属作为共同申请人）",
          "zero_down_rule": "风险模型评级良好自动批核；转信审时 12/24/36期需满足：房产/1年社保公积金/小鹏正式员工/复购良好 之一；48/60期需满足：房产且职业为公务员事业单位教师医生/小鹏正式员工/复购良好 之一。融租金额25万以上：个人代发工资月均≥1万，公牌公司实缴资本≥20万",
          "entry_materials": "身份证、驾驶证（或科目一及以上考试通过证明）、近6个月银行流水（如需）、房产证明（如需）、连续1年社保或公积金缴交证明（如需）",
          "disbursement_materials": "发票+保单（保单可后补）",
          "early_settlement": "贴息产品（3免2及5免3除外）免违约金；非贴息产品还款不满12期支付剩余融资额2%违约金，满12期无违约金",
          "repayment_day": "租金支付日为起息日的每月对应日",
          "repayment_method": "绑定工行/建行（资金方上海银行可绑更多）；支持对公转账",
          "online_flow": true,
          "auto_disbursement": "系统可自动发起放款；人工发起放款（公牌、港澳台等）",
          "special_notes": [
            "融资租赁属于汽车分期方式，统一称“分期”，不能用“贷款”字样",
            "无驾照（科目一未过）可加有驾照的直系亲属共申",
            "港澳台客户需增加大陆户籍人士共申",
            "接受买车上公司牌，最多两台，需工商公示的法人/股东/监事做共申",
            "学生/家庭主妇等无收入群体需加有稳定收入的直系亲属共申",
            "自由职业有收入即可（微信、支付宝流水也接受）"
          ],
          "source_lines": "§一 L19-296；§十二 L941-971"
        },
        {
          "key": "boc",
          "name": "中国银行",
          "tier": 1,
          "license": "是",
          "std_rate": "2.49%/2.79%",
          "min_down_payment": "0%",
          "main_loan_separation": "部分城市支持",
          "offline_signing": "是（需线下面签）",
          "approval_validity": "180天",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": true,
          "accepts_commercial": false,
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过70周岁",
          "zero_down_rule": "需20天内上牌抵，优质行业的社保+工资流水×12个月，或优质财力客户，本地有1年以上房产（>80万/300万）",
          "entry_materials": "收入流水、省内社保公积金、省内房产",
          "disbursement_materials": "发票",
          "early_settlement": "以银行审核结果为准",
          "repayment_day": "账单日前放款本期为首期，账单日后放款下期为首期",
          "repayment_method": "本行信用卡",
          "online_flow": "支持线上及线下",
          "auto_disbursement": "线上订单自动发起；线下订单银行人工放款",
          "special_notes": [
            "提交成功后中行客户经理联系客户办理",
            "通过后改价：首次变动≤开票价5%且首付≥15%可无需重审",
            "需线下面签"
          ],
          "source_lines": "§一 L19-296；§十二 L974-988"
        },
        {
          "key": "ccb",
          "name": "建设银行",
          "tier": 1,
          "license": "是",
          "std_rate": "2.49%/2.79%",
          "min_down_payment": "0%",
          "main_loan_separation": "部分城市支持",
          "offline_signing": "是（需线下面签）",
          "approval_validity": "180天",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": false,
          "accepts_commercial": false,
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过70周岁",
          "zero_down_rule": "本地人/本地社保1年以上/本地房产/本科以上学历/名下一年1年以上车（看发票价）",
          "entry_materials": "省内社保/公积金/个人所得税、省内房产、工资流水、十年内一手车、全日制大专以上学历",
          "disbursement_materials": "发票",
          "early_settlement": "以银行审核结果为准",
          "repayment_day": "账单日前放款本期为首期，账单日后放款下期为首期",
          "repayment_method": "本行信用卡",
          "online_flow": "支持线上及线下",
          "auto_disbursement": "线上订单自动发起；线下订单银行人工放款",
          "special_notes": [
            "提交成功后建行客户经理联系客户办理",
            "通过后改价：首次变动≤开票价5%且首付≥15%可无需重审",
            "需线下面签"
          ],
          "source_lines": "§一 L19-296；§十二 L991-1005"
        },
        {
          "key": "citic",
          "name": "中信银行",
          "tier": 1,
          "license": "进人工订单需要",
          "std_rate": "2.49%/2.79%",
          "min_down_payment": "0%",
          "main_loan_separation": "否",
          "offline_signing": "否",
          "approval_validity": "150天",
          "accepts_public_plate": false,
          "accepts_hmt_foreign": false,
          "accepts_commercial": false,
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过70周岁",
          "zero_down_rule": "无硬性准入门槛，根据客户资质评分",
          "entry_materials": "稳定收入流水、查询较少、当月无自查询、征信、非白户",
          "disbursement_materials": "发票",
          "early_settlement": "除3免2及5免3外：1年内提还收剩余本金3%，1年后免手续费",
          "repayment_day": "开卡日次月为还款日",
          "repayment_method": "绑定他行账户代扣（工/建/交/邮储/农）、线下中信储蓄卡、线上电子账户",
          "online_flow": true,
          "auto_disbursement": "系统可自动发起放款",
          "special_notes": [
            "提交后约10分钟出预审结果，1小时内客户经理联系终审并指引线上签约",
            "接受客户本人无驾驶证，但终审需提供直系亲属驾驶证及关系证明",
            "人工审批可能需补充驾驶证"
          ],
          "source_lines": "§一 L19-296；§十二 L1008-1023"
        },
        {
          "key": "minsheng",
          "name": "民生银行",
          "tier": 1,
          "license": "22-55岁有机会免",
          "std_rate": "2.49%/2.79%",
          "min_down_payment": "15%",
          "main_loan_separation": "否",
          "offline_signing": "否（视频签约）",
          "approval_validity": "120天",
          "accepts_public_plate": false,
          "accepts_hmt_foreign": false,
          "accepts_commercial": false,
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过70周岁",
          "zero_down_rule": "无特别要求",
          "entry_materials": "无特别要求",
          "disbursement_materials": "发票",
          "early_settlement": "以银行审核结果为准",
          "repayment_day": "放款日次月为还款日",
          "repayment_method": "绑定民生/工/交/邮储/中信/浦发/广发/平安/兴业/北京/上海银行卡",
          "online_flow": true,
          "auto_disbursement": "系统可自动发起放款",
          "special_notes": [
            "视频签约，需客户在民生银行APP视频回答问题",
            "22-55周岁提交时无需驾驶证"
          ],
          "source_lines": "§一 L19-296；§十二 L1026-1039"
        },
        {
          "key": "pingan",
          "name": "平安银行",
          "tier": 1,
          "license": "是/科目三",
          "std_rate": "2.49%/2.79%",
          "min_down_payment": "0%",
          "main_loan_separation": "否（免抵押不查上牌人征信无需共申；抵押需上牌人征信，需加共申）",
          "offline_signing": "否（当地有平安分支机构可视频面签，无则线下面签）",
          "approval_validity": "90天",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": true,
          "accepts_commercial": false,
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过70周岁",
          "zero_down_rule": "征信查询少，无逾期，网贷、征信大数据评分高；不可空白，收入稳定",
          "entry_materials": "身份证、驾驶证、银行卡（如需补充其他资料客户经理联系客户收取）",
          "disbursement_materials": "主贷分离：发票+直系亲属证明+首付款凭证；非主贷分离：发票+购车合同+保单（保单可后补）",
          "early_settlement": "3免2/5免3产品：2年内提还收剩余本金5%，2年后免；其余产品：1年内提还收5%，1年后免",
          "repayment_day": "放款日次月为还款日",
          "repayment_method": "平安一类卡，或二类账户关联绑定非六行（工/农/中/建/邮）银行卡",
          "online_flow": "支持线上及线下",
          "auto_disbursement": "线上订单自动发起；线下订单银行人工放款",
          "special_notes": [
            "提交成功后平安客户经理联系客户办理",
            "通过后改价：首次变动≤开票价5%且首付≥15%可无需重审"
          ],
          "source_lines": "§一 L19-296；§十二 L1042-1056"
        },
        {
          "key": "cmb",
          "name": "招商银行",
          "tier": 1,
          "license": "是",
          "std_rate": "2.49%/2.79%",
          "min_down_payment": "0%",
          "main_loan_separation": "是",
          "offline_signing": "是",
          "approval_validity": "60天",
          "accepts_public_plate": false,
          "accepts_hmt_foreign": false,
          "accepts_commercial": false,
          "age_rule": "年满18周岁，最高年龄不超过70周岁（支持70+5，即70周岁前最高可做5年分期）",
          "zero_down_rule": "大数据评分高，征信良好，收入稳定",
          "entry_materials": "收入证明材料（公积金、个税等）、房产证、大额存单等",
          "disbursement_materials": "线上单：发票；线下单：发票+购车合同+保单（保单可后补）",
          "early_settlement": "3免2/5免3贴息产品：2年内提还收剩余本金3%，2年后可拨打95555特殊申请违约金全额减免；其余以银行审核为准",
          "repayment_day": "放款日19天左右为往前最后还款日（以各地实际为准）",
          "repayment_method": "本行信用卡",
          "online_flow": true,
          "auto_disbursement": "系统可自动发起放款",
          "special_notes": [
            "需要客户本人付首付款且不能刷招商信用卡",
            "支持指贷分离（线下），需贷款人本人驾驶证",
            "初审通过后客户经理联系线下面签（支持上门面签）；招行旧户可线上面签"
          ],
          "source_lines": "§一 L19-296；§十二 L1059-1074"
        },
        {
          "key": "bocom",
          "name": "交通银行",
          "tier": 1,
          "license": "零贷非必需，卡分期必需",
          "std_rate": "2.49%/2.79%",
          "min_down_payment": "0%",
          "main_loan_separation": "否",
          "offline_signing": "信用卡需要",
          "approval_validity": "90天",
          "accepts_public_plate": false,
          "accepts_hmt_foreign": false,
          "accepts_commercial": false,
          "age_rule": "年龄满20周岁，最高年龄+贷款期限不超过65周岁",
          "zero_down_rule": "大数据评分高，征信良好，收入稳定",
          "entry_materials": "收入证明材料（个人银行流水）、资产证明材料（房产证、大额存单等）",
          "disbursement_materials": "发票",
          "early_settlement": "偿还剩余本金，1年内提还收剩余本金5%，1年后免手续费",
          "repayment_day": "零贷放款次月对应日；卡发卡后账单日+20天",
          "repayment_method": "交行一类卡，或绑定他行一类卡开通交行电子账户",
          "online_flow": true,
          "auto_disbursement": "系统可自动发起放款",
          "special_notes": [
            "零贷+信用卡审批两种模式；信用卡模式需线下人工面见（如30w以上）",
            "可允许一定程度的逾期（视情况）",
            "零贷：贷款金额不变且不高于车价无需重审"
          ],
          "source_lines": "§一 L19-296；§十二 L1077-1095"
        },
        {
          "key": "spdb",
          "name": "浦发银行",
          "tier": 1,
          "license": "否",
          "std_rate": "2.49%/2.79%",
          "min_down_payment": "0%",
          "main_loan_separation": "是",
          "offline_signing": "否",
          "approval_validity": "进件-签约60天 / 签约-放款90天",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": false,
          "accepts_commercial": false,
          "age_rule": "年龄满18周岁（含）至60周岁（含）",
          "zero_down_rule": "无硬性准入门槛，根据客户资质评分",
          "entry_materials": "身份证；征信白户需人工复核，提供购车地可核收入，支持公积金/社保/个税类，12个月以上银行流水佐证",
          "disbursement_materials": "发票",
          "early_settlement": "常规0息/低息：1年内提还收3%，1年后免；3免2：2年内3%；5免3：3年内3%",
          "repayment_day": "放款日次月为还款日；放款日在月末28-31日则统一每月28日",
          "repayment_method": "浦发一类卡，或绑定他行一类卡开通浦发电子二类账户",
          "online_flow": true,
          "auto_disbursement": "系统可自动发起放款",
          "special_notes": [
            "征信白户需人工复核"
          ],
          "source_lines": "§一 L19-296"
        }
      ],
      "second_class": [
        {
          "key": "huaxia_dongya",
          "name": "华夏东亚",
          "tier": 2,
          "license": "是",
          "std_rate": "2.99%",
          "min_down_payment": "15%",
          "main_loan_separation": "否",
          "offline_signing": "否",
          "approval_validity": "90天",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": true,
          "accepts_commercial": true,
          "commercial_rate": "贴息1.10%~2.20%；非贴息2.99%",
          "commercial_term": "贴息：36期/60期；非贴息：12-60期",
          "commercial_down_payment": "25%起",
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过70周岁",
          "zero_down_rule": "不支持0首付",
          "entry_materials": "身份证、驾驶证、收入材料",
          "disbursement_materials": "发票+首付凭证",
          "early_settlement": "机构客户免违约金；个人：<6期收剩余本金5%，6-12期收3%，>12期免",
          "repayment_day": "放款日为还款日，一般放款次月为首次还款时间",
          "repayment_method": "个人卡扣款（工/农/建）；机构公对公打款、担保人卡扣款",
          "online_flow": false,
          "auto_disbursement": "银行人工放款",
          "special_notes": [
            "仅线下，需手动建单并维护订单流程状态",
            "港澳台/外籍客户可受理，最低首付15%"
          ],
          "source_lines": "§一 L305-331；§十 L859-908"
        },
        {
          "key": "yixin",
          "name": "易鑫",
          "tier": 2,
          "license": "是/科目二",
          "std_rate": "2.99%",
          "min_down_payment": "5%",
          "main_loan_separation": "否",
          "offline_signing": "是",
          "approval_validity": "30天",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": false,
          "accepts_commercial": true,
          "commercial_rate": "贴息1.10%~2.20%",
          "commercial_term": "36期/60期",
          "commercial_down_payment": "5%起",
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过65周岁",
          "zero_down_rule": "不支持0首付",
          "entry_materials": "身份证、驾驶证、银行卡+近半年银行流水",
          "disbursement_materials": "发票，如附加品增配需提供相应凭证；小鹏销售系统订单截屏；购车合同（小鹏模板）",
          "early_settlement": "3免2及5免3后2年2.49%：1年内提还收3%，1年后免，手续费500元；5免3后2年2.79%：2年内收5%，2年后免，手续费500元",
          "repayment_day": "合同生效日的次月为还款日",
          "repayment_method": "易鑫自营：工/农/中/建/平安/邮储/中信/交行/浦发；和赢ABN：工/农/中/建/平安/邮储/中信；兴业银行二类卡",
          "online_flow": false,
          "auto_disbursement": "银行人工放款",
          "special_notes": [
            "仅线下，需手动建单并维护订单流程状态",
            "3免2及5免3产品的车型对应费率与一类机构完全一致，用于承接一类机构拒绝的客户"
          ],
          "source_lines": "§一 L305-331；§二 L413-453；§十 L859-908"
        },
        {
          "key": "pingan_zulin",
          "name": "平安租赁",
          "tier": 2,
          "license": "是/科目二",
          "std_rate": "2.99%",
          "min_down_payment": "0%",
          "main_loan_separation": "否",
          "offline_signing": "否",
          "approval_validity": "30天",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": false,
          "accepts_commercial": true,
          "commercial_rate": "非贴息4.50%",
          "commercial_term": "12-60期",
          "commercial_down_payment": "10%起",
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过65周岁",
          "zero_down_rule": "大数据评分高，征信良好，收入稳定",
          "entry_materials": "身份证、驾驶证、财力材料（流水、房保单、理财、股票余额等），或营业执照照片，或房产/支付宝及微信流水等",
          "disbursement_materials": "发票、GPS",
          "early_settlement": "偿还剩余本金：1年内8%、2年内6%、3-5年2%",
          "repayment_day": "每月12日前按固定12日还款，12日之后起租按日对日还款",
          "repayment_method": "绑定中/农/工/建/平安银行卡",
          "online_flow": false,
          "auto_disbursement": "银行人工放款",
          "special_notes": [
            "仅线下，需手动建单并维护订单流程状态",
            "营运车部分城市政策禁入（具体查看清单）"
          ],
          "source_lines": "§一 L305-331；§十 L859-908"
        },
        {
          "key": "tianxiada",
          "name": "天下达直租",
          "tier": 2,
          "license": "是",
          "std_rate": "首付<25%: 6.5%；首付≥25%: 5.99%",
          "min_down_payment": "15%",
          "main_loan_separation": "否",
          "offline_signing": "否",
          "approval_validity": "60天",
          "accepts_public_plate": true,
          "accepts_hmt_foreign": false,
          "accepts_commercial": false,
          "age_rule": "年满20周岁，最高年龄+贷款期限不超过70周岁",
          "zero_down_rule": "不支持0首付",
          "entry_materials": "身份证、12123电子驾照截图、还款卡、近一年微信流水、工作可核实（需上天下达公司牌）",
          "disbursement_materials": "发票+购车合同（骁龙线上签署）+ GPS",
          "early_settlement": "偿还剩余本金，提还需支付剩余本金3%作为结清手续费",
          "repayment_day": "1-10号放款次月5号；11-20号放款次月15号；21-31号放款次月25号",
          "repayment_method": "通联代扣，支持主流银行卡还款",
          "online_flow": false,
          "auto_disbursement": "银行人工放款",
          "special_notes": [
            "仅线下，需手动建单并维护订单流程状态",
            "可接受公司申请，开具直租租金发票"
          ],
          "source_lines": "§一 L305-331；§二 L435-442"
        }
      ]
    },
    "faq": {
      "meta": {
        "name": "FAQ 高频问答（结构化）",
        "source": "金融百宝箱 §十三 常见问题解答",
        "source_file": "knowledge_docs/金融百宝箱.md",
        "source_lines": "L1098-1238",
        "extract_date": "2026-08"
      },
      "faqs": [
        {
          "id": "faq_app_entry",
          "keywords": [
            "填写资料入口",
            "没有入口",
            "APP入口",
            "申请入口",
            "登录APP",
            "H5",
            "填写中断",
            "申请中断",
            "提交中断",
            "进不去申请"
          ],
          "question": "客户登录APP为什么没有填写资料入口？",
          "answer": "骁龙补全后5分钟内可生成链接。超过时间未生成：先确认骁龙“锁单信息”的上牌联系人手机号是否正确，再确认客户登录的手机号与骁龙“锁单信息”的上牌联系人是否一致。"
        },
        {
          "id": "faq_status_reset",
          "keywords": [
            "审核通过",
            "等待提交",
            "状态重置",
            "变回",
            "等待提交申请资料"
          ],
          "question": "为什么“审核通过”变成“等待提交申请资料”？",
          "answer": "骁龙改动车价/交付门店/配置信息等会导致状态重置。小鹏融租/上海银行订单在审批中或已通过，发票变动幅度在5%以内，系统按原批复方案自动提交，保持原首付比例不变；若要保持原分期金额不变或价格变动超过5%，联系金融客服手动提交同步状态。"
        },
        {
          "id": "faq_invoice_first",
          "keywords": [
            "发票",
            "最终价",
            "先做金融",
            "发票没批"
          ],
          "question": "发票目前还没审批到最终价格，能先做金融吗？",
          "answer": "可以。小鹏融租只要通过审核可以修改，更改后找金服同学提交同步状态；银行端在客户提交资料前告知金融同学最终发票价即可。"
        },
        {
          "id": "faq_mortgage_self_plate",
          "keywords": [
            "抵押",
            "自己上牌",
            "上牌"
          ],
          "question": "抵押客户可以自己上牌吗？",
          "answer": "不允许。如审批同意，必须由销售同学发起邮件，依次由区域FI-区域金融负责人-信审运营负责人完成审批，且必须由销售或指定第三方陪同客户上牌并及时完成抵押办理；如审批不同意，需与客户沟通全款购车或退车。"
        },
        {
          "id": "faq_equal_principal",
          "keywords": [
            "等本等息",
            "提前还款",
            "提前还",
            "等额本息"
          ],
          "question": "客户要提前还款，哪个银行能做等本等息？",
          "answer": "小鹏官方金融的还款方式为等额本息。等本等息产品准入门槛相对较高，对客户资质有要求，比如中行、建行、招商（可结合 §六 刚需标签对照表查看可支持地区）。"
        },
        {
          "id": "faq_interest_share",
          "keywords": [
            "利息",
            "还多少利息",
            "利息占比"
          ],
          "question": "等额本息每年大概还多少利息？",
          "answer": "5年期：第1年约总利息35%，第2年累计62%，第3年累计82%，第4年累计95%。3年期：第1年约54%，第2年累计87%。"
        },
        {
          "id": "faq_early_settle_flow",
          "keywords": [
            "老车主",
            "提前结清",
            "结清",
            "提前还款流程"
          ],
          "question": "老车主要提前还款，怎么处理？",
          "answer": "小鹏融租客户可在“小鹏APP-服务-金融服务-我的分期”查询并打款结清，或拨打400-783-6688厂家热线；银行客户优先联系银行客户经理，解决不了的可联系金融同学。"
        },
        {
          "id": "faq_greenbook",
          "keywords": [
            "绿本",
            "借阅",
            "备案",
            "改色",
            "登记证"
          ],
          "question": "客户需借阅绿本备案改色，怎么处理？",
          "answer": "小鹏融租客户在“小鹏APP-服务-金融服务-我的分期”内申请，或拨打400-783-6688厂家热线；银行客户联系客户经理，解决不了的可联系金融同学。"
        },
        {
          "id": "faq_staff_purchase",
          "keywords": [
            "员工内购",
            "员工购车",
            "员工限时"
          ],
          "question": "员工内购，产品选哪个，是免抵押吗？",
          "answer": "常规金融产品请选择【231218】员工限时2.49%；如果车主非员工本人，必须员工做共申，员工需在职。要素符合的情况下，批复为免抵押。"
        },
        {
          "id": "faq_rate_vs_interest",
          "keywords": [
            "费率",
            "利率",
            "年费率",
            "年化",
            "2.79",
            "区别"
          ],
          "question": "2.79%是年费率还是年利率，费率和利率有什么区别？",
          "answer": "小鹏融租均衡计划2.79%是年费率。费率=贷款金额×年限×费率可直接算出利息；利率需专业公式计算。简单换算：年费率×1.83≈年利率。"
        },
        {
          "id": "faq_100pct_no_mortgage",
          "keywords": [
            "100%免抵押",
            "免抵押",
            "不抵押"
          ],
          "question": "客户想要100%免抵押，是否有机构可以100%免抵押？",
          "answer": "没有100%审批免抵押的机构，审批是否免抵押以机构根据客户资质审核为准（可结合 §六 刚需标签对照表看支持免抵押的机构与地区）。"
        },
        {
          "id": "faq_approval_sla",
          "keywords": [
            "审批时效",
            "审批多久",
            "多长时间",
            "多久审批",
            "审批时间",
            "要多长时间",
            "催审批",
            "审批进度",
            "审批卡住",
            "跟进审批",
            "还在审批",
            "多久",
            "要多久"
          ],
          "question": "审批一般要多长时间？客户催审批进度怎么办？",
          "answer": "审批时效一般控制在 12 小时内（业务口径，来自需求方确认）。跟进路径：银行客户优先联系对应银行客户经理，解决不了的再联系金融同学；小鹏融租客户可拨打 400-783-6688 厂家热线（来源：《金融百宝箱》§十三·提前结清/绿本通用对接口径）。"
        }
      ]
    },
    "hmt_foreign": {
      "meta": {
        "name": "港澳台/外籍客户指引规则",
        "source": "金融百宝箱 §十一 港澳台/外籍客户指引",
        "source_file": "knowledge_docs/金融百宝箱.md",
        "source_lines": "L908-939",
        "update_note": "2026年4月13日更新：删除费率描述、小鹏融租年龄要求更新至73周岁、删除小鹏融租对征信资料的要求",
        "extract_date": "2026-08"
      },
      "summary": "港澳台/外籍客户需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件。",
      "institutions": [
        {
          "key": "xpeng_finance",
          "name": "小鹏金融（服务机构：小鹏融租）",
          "min_down_payment": "10%起",
          "age_rule": "年满18周岁，最高年龄+分期期限不超过73周岁（年龄+分期期限超过68周岁需添加直系亲属作为共申）",
          "repayment": "等额本息"
        },
        {
          "key": "pingan",
          "name": "平安银行",
          "min_down_payment": "15%起",
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过70周岁",
          "repayment": "等额本息"
        },
        {
          "key": "boc",
          "name": "中国银行",
          "min_down_payment": "15%起",
          "age_rule": "年满18周岁，最高年龄+贷款期限不超过70周岁",
          "repayment": "等额本息 / 等本等息（需线下面签）"
        }
      ],
      "special_notes": [
        "港澳台客户需增加一位拥有大陆户籍的人士做共申，共申申请材料与主申一致",
        "接受买车上公司牌，最多两台，上牌人为公司，需提供工商信息公示的法人/股东/监事做共同申请人",
        "具体准入与材料以客户实际情况为准"
      ],
      "alternative_institutions": [
        {
          "key": "huaxia_dongya",
          "name": "华夏东亚",
          "note": "二类机构，可受理港澳台/外籍客户，最低首付15%（来源：§一 二类机构汇总对比表）"
        }
      ]
    },
    "need_tags": {
      "meta": {
        "name": "客户刚需标签 → 可支持机构/地区对照表",
        "source": "金融百宝箱 §六 客户刚需标签",
        "source_file": "knowledge_docs/金融百宝箱.md",
        "source_lines": "L734-789",
        "note": "5 大刚需标签含「提前还款」「征信瑕疵」「免抵押」「主贷分离」「合理避税」，本表提取前 4 大标签完整内容；合理避税等标签请见原始文档",
        "extract_date": "2026-08"
      },
      "tags": [
        {
          "id": "tag_early_repay",
          "name": "客户有提前还款需求",
          "afl": "等本等息",
          "description": "客户计划提前还款，等额本息前几年利息占比高（第1年约还总利息35%），等本等息对提前还款更友好。准入门槛相对较高（来源 §十三 FAQ）",
          "support": [
            {
              "institution": "建设银行",
              "provinces": "除云南省、福建省外",
              "cities": "—"
            },
            {
              "institution": "交通银行",
              "provinces": "所有省份",
              "cities": "—"
            },
            {
              "institution": "招商银行",
              "provinces": "除河北省（不含廊坊市）、上海市、云南省、贵州省、四川省外",
              "cities": "除湖州市、嘉兴市、金华市外"
            },
            {
              "institution": "中国银行",
              "provinces": "所有省份",
              "cities": "—"
            },
            {
              "institution": "浦发银行",
              "provinces": "试点城市",
              "cities": "—"
            },
            {
              "institution": "小鹏融租/中信/平安（0息产品）",
              "provinces": "所有省份",
              "cities": "—"
            }
          ]
        },
        {
          "id": "tag_credit_flaw",
          "name": "客户征信瑕疵",
          "afl": "客户征信瑕疵",
          "description": "征信有瑕疵的客户可走差异化机构承接",
          "support": [
            {
              "institution": "平安银行",
              "provinces": "福建省、黑龙江省、吉林省、辽宁省",
              "cities": "—"
            },
            {
              "institution": "小鹏融租",
              "provinces": "所有省份",
              "cities": "—"
            }
          ]
        },
        {
          "id": "tag_no_mortgage",
          "name": "客户要求免抵押",
          "afl": "支持免抵押",
          "description": "无 100% 审批免抵押的机构，是否免抵押以机构按客户资质审核为准（来源 §十三 FAQ）",
          "support": [
            {
              "institution": "中信银行",
              "provinces": "所有省份",
              "cities": "—"
            },
            {
              "institution": "民生银行",
              "provinces": "除云南省、贵州省、河北省外",
              "cities": "除上海市、杭州市外"
            },
            {
              "institution": "交通银行",
              "provinces": "所有省份",
              "cities": "—"
            },
            {
              "institution": "中国银行",
              "provinces": "陕西省",
              "cities": "上海市、北京市、深圳市、南通市、镇江市、天津市、湖州市、嘉兴市、杭州市、台州市、宁波市、合肥市"
            },
            {
              "institution": "平安银行",
              "provinces": "福建省、辽宁省、山西省、山东省",
              "cities": "深圳市、佛山市、常州市、扬州市、徐州市、北京市、温州市、丽水市、衢州市、绍兴市、金华市"
            },
            {
              "institution": "建设银行",
              "provinces": "广东省、海南省、四川省、广西省、江西省",
              "cities": "上海市、北京市、天津市、无锡市、西安市"
            },
            {
              "institution": "招商银行",
              "provinces": "山东省",
              "cities": "北京市、廊坊市、无锡市、天津市、温州市、绍兴市、舟山市、衢州市"
            }
          ]
        },
        {
          "id": "tag_main_loan_sep",
          "name": "申请人非上牌人（主贷分离）",
          "afl": "主贷分离",
          "description": "申请人不是上牌人，需支持主贷分离的机构",
          "support": [
            {
              "institution": "招商银行",
              "provinces": "除吉林省、辽宁省外",
              "cities": "除广州市、天津市外"
            },
            {
              "institution": "建设银行",
              "provinces": "吉林省、辽宁省",
              "cities": "广州市、河源市、梅州市、汕头市、揭阳市、潮州市、汕尾市、天津市、青岛市、东莞市"
            },
            {
              "institution": "平安银行",
              "provinces": "福建省",
              "cities": "北京市"
            },
            {
              "institution": "中国银行",
              "provinces": "—",
              "cities": "广州市、揭阳市、潮州市、汕尾市、宁波市、深圳市"
            },
            {
              "institution": "浦发银行",
              "provinces": "—",
              "cities": "除合肥市外"
            }
          ]
        }
      ],
      "note": "智选分流暂不考虑客户刚需标签（来源 §二 3免2/5免3注意事项）——这正是 S3 特殊需求指派场景存在的意义"
    },
    "commercial": {
      "meta": {
        "name": "营运车分期产品规则",
        "source": "金融百宝箱 §十 营运车分期产品（2026年版）",
        "source_file": "knowledge_docs/金融百宝箱.md",
        "source_lines": "L859-908",
        "extract_date": "2026-08"
      },
      "summary": "一类机构均不受理营运车分期；营运车由 3 家二类机构承接：易鑫 / 华夏东亚 / 平安租赁。",
      "institutions": [
        {
          "key": "yixin",
          "name": "易鑫",
          "product_type": "贴息产品",
          "rate": "贴息：1.10%~2.20%（详见贴息费率明细）",
          "min_down_payment": "5%起",
          "term": "36期 / 60期",
          "applicable_customer": "个人",
          "coverage": "全国",
          "admission": "驾驶证、人证（网络预约出租汽车驾驶员证）",
          "mortgage": "抵押",
          "repayment": "等额本息",
          "early_settlement": "根据具体承接资方要求"
        },
        {
          "key": "huaxia_dongya",
          "name": "华夏东亚",
          "product_type": "贴息产品 + 非贴息产品（两种均可承接）",
          "rate": "贴息：1.10%~2.20%；非贴息：2.99%",
          "min_down_payment": "25%起",
          "term": "贴息：36期 / 60期；非贴息：12-60期",
          "applicable_customer": "个人 / 公司",
          "coverage": "全国",
          "admission": "驾驶证、人证",
          "mortgage": "抵押",
          "repayment": "等额本息",
          "early_settlement": "个人：归还剩余本金；6个月内提还违约金5%；6~12个月提还违约金3%；满1年后提还无需违约金。企业购车：无提还违约金"
        },
        {
          "key": "pingan_zulin",
          "name": "平安租赁",
          "product_type": "非贴息产品",
          "rate": "4.50%",
          "min_down_payment": "10%起",
          "term": "12-60期",
          "applicable_customer": "个人",
          "coverage": "部分城市政策禁入（具体查看清单）",
          "admission": "驾驶证、人证",
          "mortgage": "抵押",
          "repayment": "等额本息",
          "early_settlement": "归还剩余本金；结清手续费按剩余本金：12期内（含）8%；24期内（含）6%；36期内（含）2%；48期内（含）2%；60期内（含）2%"
        }
      ],
      "subsidy_rate_detail": {
        "note": "贴息费率明细（适用：易鑫 / 华夏东亚 — 两家费率一致）",
        "rows": [
          {
            "models": "2025款P7+、P7、2025款G7、2025款G6、2025款G9、2025款X9、2026款X9",
            "rate_36": "1.10%",
            "rate_60": "1.80%"
          },
          {
            "models": "L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03",
            "rate_36": "1.70%",
            "rate_60": "2.20%"
          }
        ],
        "product_name": "【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚"
      },
      "company_commercial_materials": {
        "applicable": "公司购买营运车辆 — 申请材料（适用：华夏东亚 营运公户业务）",
        "list": [
          "营业执照",
          "法人代表及担保人等身份材料",
          "财务报表（利润表和资产负债表，盖公章），近两年（或经营年限）",
          "公司及担保人银行流水，近六个月",
          "验资报告或注资凭证",
          "其他：合作的正规网约车平台的合作协议 / 交易系统流水 / 平台证等",
          "其他：公司已有车辆的相关产证、车证等证明材料",
          "其他：公司汽车租赁经营许可证等证明材料"
        ],
        "note": "具体资料视客户和合作平台资质而定"
      }
    },
    "products": {
      "meta": {
        "name": "8月金融政策摘要（一类/二类机构产品）",
        "source": "金融百宝箱 §二 8月金融政策",
        "source_file": "knowledge_docs/金融百宝箱.md",
        "source_lines": "L337-464",
        "extract_date": "2026-08"
      },
      "official_policies": [
        {
          "models": "2026款G6/G7/P7+/G9、GX、L03、2025款M03、2026款M03",
          "plan_full_pay": "3000元选装抵扣券 / 电卡 / 保险补贴 / 积分（按车型）",
          "plan_0_rate": "24期0息",
          "plan_3free2": "3免2 2.49%年费率（M03/L03为2.79%）",
          "plan_36_60": "36期 0.83%-0.93%；48期 1.25%-1.40%；60期 1.50%-1.67%",
          "min_down_payment": "0%起",
          "min_finance_amount": "5万起"
        },
        {
          "models": "新P7、2025款G7/G6/G9、2025款P7+、2026款X9",
          "plan_full_pay": "积分/保险补贴（按车型）",
          "plan_0_rate": "36期0息",
          "plan_5free3": "5免3 2.49%/2.79%年费率",
          "plan_60": "60期 0.99%年费率",
          "min_down_payment": "0%起",
          "min_finance_amount": "5万起"
        }
      ],
      "standard_rate": {
        "note": "12-60期标准费率产品",
        "rows": [
          {
            "models": "GX/新P7/G7/G6/G9/26款P7+（2025款G6/G7/G9）",
            "rate": "年费率 2.49%",
            "product": "【2605】小鹏智选-限时费率2.49%-GX/新P7/G7/G6/G9/26款P7+"
          },
          {
            "models": "L03、2025&2026款M03、2025款P7+、2026款X9",
            "rate": "年费率 2.79%",
            "product": "【2603】小鹏智选-限时费率2.79%-0首付起"
          }
        ]
      },
      "tail_5050": {
        "name": "尾款产品：5050 轻松购",
        "rows": [
          {
            "models": "GX、新P7、2025&2026款G7/G6/G9、2026款P7+",
            "down": "50%",
            "term": "12期",
            "rate": "4.57%"
          },
          {
            "models": "GX、新P7、2025&2026款G7/G6/G9、2026款P7+",
            "down": "50%",
            "term": "24期",
            "rate": "4.72%"
          },
          {
            "models": "2025&2026款M03、2025款P7+、2025款X9、2026款X9",
            "down": "50%",
            "term": "12期",
            "rate": "5.11%"
          },
          {
            "models": "2025&2026款M03、2025款P7+、2025款X9、2026款X9",
            "down": "50%",
            "term": "24期",
            "rate": "5.26%"
          }
        ],
        "finance_amount": "5万起"
      },
      "free3_free5_note": "3免2及5免3适用官方金融合作机构：中国银行、平安银行、招商银行、浦发银行、小鹏融租、中信银行；智选分流暂不考虑客户刚需标签",
      "yixin_second_class": {
        "note": "易鑫3免2及5免3产品的车型对应费率与一类机构完全一致，用于承接一类机构拒绝的客户",
        "early_settlement": "3免2/5免3费率2.49%：1年内提前结清收剩余本金3%，12期后免，手续费500元；5免3费率2.79%：2年内收5%，24期后免，手续费500元"
      }
    },
    "doc": {
      "title": "金融百宝箱",
      "source": "knowledge_docs/金融百宝箱.md",
      "totalLines": 1239,
      "chunks": [
        {
          "from": 1,
          "to": 5,
          "chapter": "",
          "text": "# 金融百宝箱\n> 来源：飞书云文档《金融百宝箱》\n> 转换时间：2026-08-21\n> 说明：本文档将原始文档中的图片内容以结构化文本形式（Markdown 表格 / 列表 / 步骤等）真实提取\n> 原始 Word 版本（含图片）：https://xiaopeng.feishu.cn/file/GFz0bAJzjog5j2xup2GcVvdznEh"
        },
        {
          "from": 5,
          "to": 8,
          "chapter": "",
          "text": "> 转换时间：2026-08-21\n> 说明：本文档将原始文档中的图片内容以结构化文本形式（Markdown 表格 / 列表 / 步骤等）真实提取\n> 原始 Word 版本（含图片）：https://xiaopeng.feishu.cn/file/GFz0bAJzjog5j2xup2GcVvdznEh\n---"
        },
        {
          "from": 7,
          "to": 10,
          "chapter": "",
          "text": "> 说明：本文档将原始文档中的图片内容以结构化文本形式（Markdown 表格 / 列表 / 步骤等）真实提取\n> 原始 Word 版本（含图片）：https://xiaopeng.feishu.cn/file/GFz0bAJzjog5j2xup2GcVvdznEh\n---\n# 金融百宝箱"
        },
        {
          "from": 9,
          "to": 12,
          "chapter": "",
          "text": "> 原始 Word 版本（含图片）：https://xiaopeng.feishu.cn/file/GFz0bAJzjog5j2xup2GcVvdznEh\n---\n# 金融百宝箱\n## 一，合作机构汇总"
        },
        {
          "from": 11,
          "to": 14,
          "chapter": "",
          "text": "---\n# 金融百宝箱\n## 一，合作机构汇总\n1. **一类机构汇总**"
        },
        {
          "from": 13,
          "to": 16,
          "chapter": "§一",
          "text": "# 金融百宝箱\n## 一，合作机构汇总\n1. **一类机构汇总**\n### 一类机构汇总对比表（9家）"
        },
        {
          "from": 18,
          "to": 21,
          "chapter": "§一",
          "text": "## 一，合作机构汇总\n1. **一类机构汇总**\n### 一类机构汇总对比表（9家）\n> 9 家机构横向对比：合作机构、小鹏融租、中行、建行、中信、民生、平安、招行、交行、浦发"
        },
        {
          "from": 20,
          "to": 23,
          "chapter": "§一",
          "text": "1. **一类机构汇总**\n### 一类机构汇总对比表（9家）\n> 9 家机构横向对比：合作机构、小鹏融租、中行、建行、中信、民生、平安、招行、交行、浦发\n**是否需要本人驾照？**"
        },
        {
          "from": 22,
          "to": 30,
          "chapter": "§一",
          "text": "### 一类机构汇总对比表（9家）\n> 9 家机构横向对比：合作机构、小鹏融租、中行、建行、中信、民生、平安、招行、交行、浦发\n**是否需要本人驾照？**\n| 合作机构 | 是否需要本人驾照？ |\n| --- | --- |\n| 小鹏融租 | 是/科一 |\n| 中行 | 是 |\n| 建行 | 是 |\n| 中信 | 进人工订单需要 |"
        },
        {
          "from": 28,
          "to": 35,
          "chapter": "§一",
          "text": "| 中行 | 是 |\n| 建行 | 是 |\n| 中信 | 进人工订单需要 |\n| 民生 | 22-55岁有机会免 |\n| 平安 | 是/科目三 |\n| 招行 | 是 |\n| 交行 | 零贷非必需，卡分期必需 |\n| 浦发 | 否 |"
        },
        {
          "from": 34,
          "to": 37,
          "chapter": "§一",
          "text": "| 招行 | 是 |\n| 交行 | 零贷非必需，卡分期必需 |\n| 浦发 | 否 |\n**标准产品年费率？**"
        },
        {
          "from": 36,
          "to": 44,
          "chapter": "§一",
          "text": "| 交行 | 零贷非必需，卡分期必需 |\n| 浦发 | 否 |\n**标准产品年费率？**\n| 合作机构 | 标准产品年费率 |\n| --- | --- |\n| 小鹏融租 | 2.49%/2.79%（跟随车型政策） |\n| 中行 | 2.49%/2.79% |\n| 建行 | 2.49%/2.79% |\n| 中信 | 2.49%/2.79% |"
        },
        {
          "from": 42,
          "to": 49,
          "chapter": "§一",
          "text": "| 中行 | 2.49%/2.79% |\n| 建行 | 2.49%/2.79% |\n| 中信 | 2.49%/2.79% |\n| 民生 | 2.49%/2.79% |\n| 平安 | 2.49%/2.79% |\n| 招行 | 2.49%/2.79% |\n| 交行 | 2.49%/2.79% |\n| 浦发 | 2.49%/2.79% |"
        },
        {
          "from": 48,
          "to": 51,
          "chapter": "§一",
          "text": "| 招行 | 2.49%/2.79% |\n| 交行 | 2.49%/2.79% |\n| 浦发 | 2.49%/2.79% |\n**最低首付比例**"
        },
        {
          "from": 50,
          "to": 58,
          "chapter": "§一",
          "text": "| 交行 | 2.49%/2.79% |\n| 浦发 | 2.49%/2.79% |\n**最低首付比例**\n| 合作机构 | 最低首付比例 |\n| --- | --- |\n| 小鹏融租 | 0% |\n| 中行 | 0% |\n| 建行 | 0% |\n| 中信 | 0% |"
        },
        {
          "from": 56,
          "to": 63,
          "chapter": "§一",
          "text": "| 中行 | 0% |\n| 建行 | 0% |\n| 中信 | 0% |\n| 民生 | 15% |\n| 平安 | 0% |\n| 招行 | 0% |\n| 交行 | 0% |\n| 浦发 | 0% |"
        },
        {
          "from": 62,
          "to": 65,
          "chapter": "§一",
          "text": "| 招行 | 0% |\n| 交行 | 0% |\n| 浦发 | 0% |\n**是否可以主贷分离（不查上牌人征信&无需上牌人共申）**"
        },
        {
          "from": 64,
          "to": 72,
          "chapter": "§一",
          "text": "| 交行 | 0% |\n| 浦发 | 0% |\n**是否可以主贷分离（不查上牌人征信&无需上牌人共申）**\n| 合作机构 | 主贷分离 |\n| --- | --- |\n| 小鹏融租 | 否 |\n| 中行 | 部分城市支持 |\n| 建行 | 部分城市支持 |\n| 中信 | 否 |"
        },
        {
          "from": 70,
          "to": 77,
          "chapter": "§一",
          "text": "| 中行 | 部分城市支持 |\n| 建行 | 部分城市支持 |\n| 中信 | 否 |\n| 民生 | 否 |\n| 平安 | 否（免抵押不查上牌人征信无需共申；抵押需上牌人征信，需加共申） |\n| 招行 | 是 |\n| 交行 | 否 |\n| 浦发 | 是 |"
        },
        {
          "from": 76,
          "to": 79,
          "chapter": "§一",
          "text": "| 招行 | 是 |\n| 交行 | 否 |\n| 浦发 | 是 |\n**是否需要线下面签？**"
        },
        {
          "from": 78,
          "to": 86,
          "chapter": "§一",
          "text": "| 交行 | 否 |\n| 浦发 | 是 |\n**是否需要线下面签？**\n| 合作机构 | 是否需要线下面签 |\n| --- | --- |\n| 小鹏融租 | 否 |\n| 中行 | 是 |\n| 建行 | 是 |\n| 中信 | 否 |"
        },
        {
          "from": 84,
          "to": 91,
          "chapter": "§一",
          "text": "| 中行 | 是 |\n| 建行 | 是 |\n| 中信 | 否 |\n| 民生 | 否 |\n| 平安 | 否 |\n| 招行 | 是 |\n| 交行 | 信用卡需要 |\n| 浦发 | 否 |"
        },
        {
          "from": 90,
          "to": 93,
          "chapter": "§一",
          "text": "| 招行 | 是 |\n| 交行 | 信用卡需要 |\n| 浦发 | 否 |\n**同贷书有效期**"
        },
        {
          "from": 92,
          "to": 100,
          "chapter": "§一",
          "text": "| 交行 | 信用卡需要 |\n| 浦发 | 否 |\n**同贷书有效期**\n| 合作机构 | 同贷书有效期 |\n| --- | --- |\n| 小鹏融租 | 小鹏融租：180天；资金方为上海银行：90天 |\n| 中行 | 180天 |\n| 建行 | 180天 |\n| 中信 | 150天 |"
        },
        {
          "from": 98,
          "to": 105,
          "chapter": "§一",
          "text": "| 中行 | 180天 |\n| 建行 | 180天 |\n| 中信 | 150天 |\n| 民生 | 120天 |\n| 平安 | 90天 |\n| 招行 | 60天 |\n| 交行 | 90天 |\n| 浦发 | 进件-签约60天 / 签约-放款90天 |"
        },
        {
          "from": 104,
          "to": 107,
          "chapter": "§一",
          "text": "| 招行 | 60天 |\n| 交行 | 90天 |\n| 浦发 | 进件-签约60天 / 签约-放款90天 |\n**是否受理公牌 / 港澳台、外籍 / 营运车、年费率 / 营运车产品期限**"
        },
        {
          "from": 106,
          "to": 114,
          "chapter": "§一",
          "text": "| 交行 | 90天 |\n| 浦发 | 进件-签约60天 / 签约-放款90天 |\n**是否受理公牌 / 港澳台、外籍 / 营运车、年费率 / 营运车产品期限**\n| 合作机构 | 受理公牌 | 港澳台/外籍 | 营运车/费率 | 营运车产品期限 |\n| --- | --- | --- | --- | --- |\n| 小鹏融租 | 是 | 是 | 否 | 否 |\n| 中行 | 是 | 是 | 否 | 否 |\n| 建行 | 是 | 否 | 否 | 否 |\n| 中信 | 否 | 否 | 否 | 否 |"
        },
        {
          "from": 112,
          "to": 119,
          "chapter": "§一",
          "text": "| 中行 | 是 | 是 | 否 | 否 |\n| 建行 | 是 | 否 | 否 | 否 |\n| 中信 | 否 | 否 | 否 | 否 |\n| 民生 | 否 | 否 | 否 | 否 |\n| 平安 | 是 | 是 | 否 | 否 |\n| 招行 | 否 | 否 | 否 | 否 |\n| 交行 | 否 | 否 | 否 | 否 |\n| 浦发 | 是 | 否 | 否 | 否 |"
        },
        {
          "from": 118,
          "to": 121,
          "chapter": "§一",
          "text": "| 招行 | 否 | 否 | 否 | 否 |\n| 交行 | 否 | 否 | 否 | 否 |\n| 浦发 | 是 | 否 | 否 | 否 |\n（说明：上表数据来自原始汇总表。平安 12-48 期、招行 12-48 期为营运车产品期限示例。）"
        },
        {
          "from": 120,
          "to": 123,
          "chapter": "§一",
          "text": "| 交行 | 否 | 否 | 否 | 否 |\n| 浦发 | 是 | 否 | 否 | 否 |\n（说明：上表数据来自原始汇总表。平安 12-48 期、招行 12-48 期为营运车产品期限示例。）\n**年龄要求**"
        },
        {
          "from": 122,
          "to": 130,
          "chapter": "§一",
          "text": "| 浦发 | 是 | 否 | 否 | 否 |\n（说明：上表数据来自原始汇总表。平安 12-48 期、招行 12-48 期为营运车产品期限示例。）\n**年龄要求**\n| 合作机构 | 年龄要求 |\n| --- | --- |\n| 小鹏融租 | 年满18周岁，最高年龄+分期期限不超过73周岁（年龄+分期期限超过68周岁需添加直系亲属作为共申） |\n| 中行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 |\n| 建行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 |\n| 中信 | 年满18周岁，最高年龄+贷款期限不超过70周岁 |"
        },
        {
          "from": 128,
          "to": 135,
          "chapter": "§一",
          "text": "| 中行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 |\n| 建行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 |\n| 中信 | 年满18周岁，最高年龄+贷款期限不超过70周岁 |\n| 民生 | 年满18周岁，最高年龄+贷款期限不超过70周岁 |\n| 平安 | 年满18周岁，最高年龄+贷款期限不超过70周岁 |\n| 招行 | 年满18周岁，最高年龄+贷款期限不超过70周岁（支持70+5，即客户在70周岁前最高也可做5年的分期） |\n| 交行 | 年满18周岁，最高年龄+贷款期限不超过至65周岁 |\n| 浦发 | 年龄满18周岁（含）至60周岁（含） |"
        },
        {
          "from": 134,
          "to": 137,
          "chapter": "§一",
          "text": "| 招行 | 年满18周岁，最高年龄+贷款期限不超过70周岁（支持70+5，即客户在70周岁前最高也可做5年的分期） |\n| 交行 | 年满18周岁，最高年龄+贷款期限不超过至65周岁 |\n| 浦发 | 年龄满18周岁（含）至60周岁（含） |\n**0首付准入要求（具体以客户实际情况为准）**"
        },
        {
          "from": 136,
          "to": 144,
          "chapter": "§一",
          "text": "| 交行 | 年满18周岁，最高年龄+贷款期限不超过至65周岁 |\n| 浦发 | 年龄满18周岁（含）至60周岁（含） |\n**0首付准入要求（具体以客户实际情况为准）**\n- **小鹏融租**：风险模型评级良好的客户由系统自动批核，如评级不符转信审则需满足以下条件：\n- **12、24、36期客户**，至少符合如下四类要求其一：\n- 第一类：申请人有房产（房产查册）或该房有人行征信未结清房贷；\n- 第二类：社保或公积金连续缴纳满1年（非个人缴交）；\n- 第三类：小鹏集团正式员工；\n- 第四类：小鹏融租复购客户同时满足：（1）当前无逾期；（2）融租或助贷已还12期及以上；（3）历史无重大客诉。"
        },
        {
          "from": 142,
          "to": 150,
          "chapter": "§一",
          "text": "- 第二类：社保或公积金连续缴纳满1年（非个人缴交）；\n- 第三类：小鹏集团正式员工；\n- 第四类：小鹏融租复购客户同时满足：（1）当前无逾期；（2）融租或助贷已还12期及以上；（3）历史无重大客诉。\n- **48、60期客户**，需至少符合如下三类要求其一：\n- 第一类：申请人有房产（房产查册）或该房有人行征信未结清房贷，且职业为公务员/事业单位员工/教师/医生；\n- 第二类：小鹏集团正式员工；\n- 第三类：小鹏融租复购客户同时满足：（1）当前无逾期；（2）融租或助贷已还12期及以上；（3）历史无重大客诉。\n- **中行**：需20天内上牌抵，优质行业的社保+工资流水×12个月，或者优质财力客户，本地有1年以上房产（>80万/300万）。\n- **建行**：本地人/本地社保1年以上/本地房产/本科以上学历/名下一年1年以上车（看发票价）。"
        },
        {
          "from": 148,
          "to": 156,
          "chapter": "§一",
          "text": "- 第三类：小鹏融租复购客户同时满足：（1）当前无逾期；（2）融租或助贷已还12期及以上；（3）历史无重大客诉。\n- **中行**：需20天内上牌抵，优质行业的社保+工资流水×12个月，或者优质财力客户，本地有1年以上房产（>80万/300万）。\n- **建行**：本地人/本地社保1年以上/本地房产/本科以上学历/名下一年1年以上车（看发票价）。\n- **中信**：无硬性准入门槛，根据客户资质评分。\n- **民生**：/（无特别要求）\n- **平安**：征信查询少，无逾期，网贷、征信大数据评分高；不可空白，收入稳定。\n- **招行**：大数据评分高，征信良好，收入稳定。\n- **交行**：大数据评分高，征信良好，收入稳定。\n- **浦发**：无硬性准入门槛，根据客户资质评分。"
        },
        {
          "from": 154,
          "to": 157,
          "chapter": "§一",
          "text": "- **招行**：大数据评分高，征信良好，收入稳定。\n- **交行**：大数据评分高，征信良好，收入稳定。\n- **浦发**：无硬性准入门槛，根据客户资质评分。\n**准入参考资料（具体以客户实际情况为准）**"
        },
        {
          "from": 157,
          "to": 165,
          "chapter": "§一",
          "text": "- **交行**：大数据评分高，征信良好，收入稳定。\n- **浦发**：无硬性准入门槛，根据客户资质评分。\n**准入参考资料（具体以客户实际情况为准）**\n- **小鹏融租**：身份证、驾驶证（或科目一及以上考试通过证明）、近6个月银行流水（如需）、房产证明（如需）、连续1年社保或公积金缴交证明（如需）。\n- **中行**：收入流水、省内社保公积金、省内房产。\n- **建行**：省内社保/公积金/个人所得税、省内房产、工资流水、十年内一手车、全日制大专以上学历。\n- **中信**：稳定收入流水、查询较少、当月无自查询、征信、非白户。\n- **民生**：/（无特别要求）\n- **平安**：身份证、驾驶证、银行卡（如需客户补充其他资料客户经理联系客户收取）。"
        },
        {
          "from": 163,
          "to": 168,
          "chapter": "§一",
          "text": "- **中信**：稳定收入流水、查询较少、当月无自查询、征信、非白户。\n- **民生**：/（无特别要求）\n- **平安**：身份证、驾驶证、银行卡（如需客户补充其他资料客户经理联系客户收取）。\n- **招行**：收入证明材料（公积金、个税等）、房产证、大额存单等。\n- **交行**：收入证明材料（个人银行流水、资产证明材料（房产证、大额存单等）。\n- **浦发**：必要资料为身份证、征信白户需人工复核，并根据情况提供购车地的可核收入、支持公积金、社保以及个税类，12个月以上银行流水佐证资料。"
        },
        {
          "from": 167,
          "to": 170,
          "chapter": "§一",
          "text": "- **招行**：收入证明材料（公积金、个税等）、房产证、大额存单等。\n- **交行**：收入证明材料（个人银行流水、资产证明材料（房产证、大额存单等）。\n- **浦发**：必要资料为身份证、征信白户需人工复核，并根据情况提供购车地的可核收入、支持公积金、社保以及个税类，12个月以上银行流水佐证资料。\n**放款材料**"
        },
        {
          "from": 169,
          "to": 177,
          "chapter": "§一",
          "text": "- **交行**：收入证明材料（个人银行流水、资产证明材料（房产证、大额存单等）。\n- **浦发**：必要资料为身份证、征信白户需人工复核，并根据情况提供购车地的可核收入、支持公积金、社保以及个税类，12个月以上银行流水佐证资料。\n**放款材料**\n- **小鹏融租**：发票+保单（保单可后补）\n- **中行**：发票\n- **建行**：发票\n- **中信**：发票\n- **民生**：发票\n- **平安**：主贷分离：发票+直系亲属证明+首付款凭证；非主贷分离：发票+购车合同+保单（保单可后补）"
        },
        {
          "from": 175,
          "to": 180,
          "chapter": "§一",
          "text": "- **中信**：发票\n- **民生**：发票\n- **平安**：主贷分离：发票+直系亲属证明+首付款凭证；非主贷分离：发票+购车合同+保单（保单可后补）\n- **招行**：线上单：发票；线下单：发票+购车合同+保单（保单可后补）\n- **交行**：发票\n- **浦发**：发票"
        },
        {
          "from": 179,
          "to": 182,
          "chapter": "§一",
          "text": "- **招行**：线上单：发票；线下单：发票+购车合同+保单（保单可后补）\n- **交行**：发票\n- **浦发**：发票\n**提前结清政策**"
        },
        {
          "from": 181,
          "to": 189,
          "chapter": "§一",
          "text": "- **交行**：发票\n- **浦发**：发票\n**提前结清政策**\n- **小鹏融租**\n- 资金方为小鹏融租：\n1. 贴息产品（除3免2及5免3）：提前结清不收取违约金。\n2. 非贴息产品：还款不满12期，支付剩余融资额的2%作为违约金；还款满12期，无违约金。\n- 资金方为上海银行：无提前结清违约金。\n- **中行**：以银行审核结果为准。"
        },
        {
          "from": 187,
          "to": 195,
          "chapter": "§一",
          "text": "2. 非贴息产品：还款不满12期，支付剩余融资额的2%作为违约金；还款满12期，无违约金。\n- 资金方为上海银行：无提前结清违约金。\n- **中行**：以银行审核结果为准。\n- **建行**：以银行审核结果为准。\n- **中信**：除3免2及5免3外：偿还剩余本金，1年内提还需支付剩余本金3%作为结清手续费，1年后免手续费。\n- **民生**：以银行审核结果为准。\n- **平安**：\n1. 3免2/5免3金融产品：偿还剩余本金，2年内提还需支付剩余本金5%作为结清手续费，2年后免手续费。\n2. 其余金融产品：偿还剩余本金，1年内提还需支付剩余本金5%作为结清手续费，1年后免手续费。"
        },
        {
          "from": 193,
          "to": 200,
          "chapter": "§一",
          "text": "- **平安**：\n1. 3免2/5免3金融产品：偿还剩余本金，2年内提还需支付剩余本金5%作为结清手续费，2年后免手续费。\n2. 其余金融产品：偿还剩余本金，1年内提还需支付剩余本金5%作为结清手续费，1年后免手续费。\n- **招行**：\n1. 3免2/5免3贴息产品：偿还剩余本金，2年内提还需支付剩余本金3%作为结清手续费，2年后可特殊申请违约金全额减免（客户拨打95555申请）。\n2. 其余金融产品：以银行审核结果为准。\n- **交行**：偿还剩余本金，1年内提还需支付剩余本金5%作为结清手续费，1年后免手续费。\n- **浦发**：常规0息/低息：1年之内提前还款，收取剩余本金3%作为违约金，1年后提前还款免违约金。3免2：2年内提还收3%，2年后免违约金。5免3：3年内提还收3%，3年后免违约金。"
        },
        {
          "from": 199,
          "to": 202,
          "chapter": "§一",
          "text": "2. 其余金融产品：以银行审核结果为准。\n- **交行**：偿还剩余本金，1年内提还需支付剩余本金5%作为结清手续费，1年后免手续费。\n- **浦发**：常规0息/低息：1年之内提前还款，收取剩余本金3%作为违约金，1年后提前还款免违约金。3免2：2年内提还收3%，2年后免违约金。5免3：3年内提还收3%，3年后免违约金。\n**还款日是哪天？**"
        },
        {
          "from": 201,
          "to": 209,
          "chapter": "§一",
          "text": "- **交行**：偿还剩余本金，1年内提还需支付剩余本金5%作为结清手续费，1年后免手续费。\n- **浦发**：常规0息/低息：1年之内提前还款，收取剩余本金3%作为违约金，1年后提前还款免违约金。3免2：2年内提还收3%，2年后免违约金。5免3：3年内提还收3%，3年后免违约金。\n**还款日是哪天？**\n| 合作机构 | 还款日 |\n| --- | --- |\n| 小鹏融租 | 租金支付日为起息日的每月对应日，无对应日的，以该月月末为支付日（2026年3月16日之前的存量合同需以合同实际约定为准） |\n| 中行 | 账单日前放款的，本期还款日为首次还款时间，账单日后放款的，下期还款日为首次还款时间 |\n| 建行 | 账单日前放款的，本期还款日为首次还款时间，账单日后放款的，下期还款日为首次还款时间 |\n| 中信 | 开卡日次月为还款日 |"
        },
        {
          "from": 207,
          "to": 214,
          "chapter": "§一",
          "text": "| 中行 | 账单日前放款的，本期还款日为首次还款时间，账单日后放款的，下期还款日为首次还款时间 |\n| 建行 | 账单日前放款的，本期还款日为首次还款时间，账单日后放款的，下期还款日为首次还款时间 |\n| 中信 | 开卡日次月为还款日 |\n| 民生 | 放款日次月为还款日 |\n| 平安 | 放款日次月为还款日 |\n| 招行 | 放款日19天左右为往前最后还款日（具体以各地实际为准） |\n| 交行 | 零贷放款次月对应日，若无月末最后一日（31号放款，卡发卡后会有账单日，还款日一般为账单日的后20天） |\n| 浦发 | 放款日次月为还款日；如放款日在月末28-31日，还款日会统一在每月28日 |"
        },
        {
          "from": 213,
          "to": 216,
          "chapter": "§一",
          "text": "| 招行 | 放款日19天左右为往前最后还款日（具体以各地实际为准） |\n| 交行 | 零贷放款次月对应日，若无月末最后一日（31号放款，卡发卡后会有账单日，还款日一般为账单日的后20天） |\n| 浦发 | 放款日次月为还款日；如放款日在月末28-31日，还款日会统一在每月28日 |\n**还款方式**"
        },
        {
          "from": 215,
          "to": 223,
          "chapter": "§一",
          "text": "| 交行 | 零贷放款次月对应日，若无月末最后一日（31号放款，卡发卡后会有账单日，还款日一般为账单日的后20天） |\n| 浦发 | 放款日次月为还款日；如放款日在月末28-31日，还款日会统一在每月28日 |\n**还款方式**\n- **小鹏融租**：资金方为小鹏融租：可绑定工行/建行；资金方为上海银行：可绑定工行/建行/交行/平安/农行/邮储/上海银行；也可对公转账还款；每个合同对应1个独立账户。\n- **中行**：本行信用卡。\n- **建行**：本行信用卡。\n- **中信**：1. 绑定他行账户代扣还款支持工行、建行、交行、邮储类账户、农行/农行卡扣款器易出现异常。2. 网线下行立中信银行储蓄卡。3. 线上开通电子账户做签约，通过绑定开通电子账户的其他银行储蓄卡还款。\n- **民生**：1. 支持绑定：民生银行、工行、交行、邮储、中信、浦发、广发、平安、兴业、北京银行、上海银行。\n- **平安**：1. 平安一类卡；2. 如无平安一类卡，开二类账户情况，关联绑定到除六行外（工、农、中、建、邮、邮储）其余银行才支持。"
        },
        {
          "from": 221,
          "to": 226,
          "chapter": "§一",
          "text": "- **中信**：1. 绑定他行账户代扣还款支持工行、建行、交行、邮储类账户、农行/农行卡扣款器易出现异常。2. 网线下行立中信银行储蓄卡。3. 线上开通电子账户做签约，通过绑定开通电子账户的其他银行储蓄卡还款。\n- **民生**：1. 支持绑定：民生银行、工行、交行、邮储、中信、浦发、广发、平安、兴业、北京银行、上海银行。\n- **平安**：1. 平安一类卡；2. 如无平安一类卡，开二类账户情况，关联绑定到除六行外（工、农、中、建、邮、邮储）其余银行才支持。\n- **招行**：本行信用卡。\n- **交行**：1. 交行一类卡；2. 如无交行一类卡，可通过绑定他行一类卡在交行线上开通交行电子账户。支持绑定的银行包括：中、农、工、建、邮储、招商、浦发、上海、兴业、花旗、大华银行等。\n- **浦发**：1. 浦发一类卡；2. 如无浦发一类卡，可以通过绑定他行一类卡在浦发银行开通电子二类账户。支持绑定的银行包括：浦发、中、农、工、建、邮储、光大、中信、华夏、民生、广发、兴业、招商、平安、上海、恒丰、广发银行等。"
        },
        {
          "from": 225,
          "to": 228,
          "chapter": "§一",
          "text": "- **招行**：本行信用卡。\n- **交行**：1. 交行一类卡；2. 如无交行一类卡，可通过绑定他行一类卡在交行线上开通交行电子账户。支持绑定的银行包括：中、农、工、建、邮储、招商、浦发、上海、兴业、花旗、大华银行等。\n- **浦发**：1. 浦发一类卡；2. 如无浦发一类卡，可以通过绑定他行一类卡在浦发银行开通电子二类账户。支持绑定的银行包括：浦发、中、农、工、建、邮储、光大、中信、华夏、民生、广发、兴业、招商、平安、上海、恒丰、广发银行等。\n**是否为线上分期流程？**"
        },
        {
          "from": 227,
          "to": 235,
          "chapter": "§一",
          "text": "- **交行**：1. 交行一类卡；2. 如无交行一类卡，可通过绑定他行一类卡在交行线上开通交行电子账户。支持绑定的银行包括：中、农、工、建、邮储、招商、浦发、上海、兴业、花旗、大华银行等。\n- **浦发**：1. 浦发一类卡；2. 如无浦发一类卡，可以通过绑定他行一类卡在浦发银行开通电子二类账户。支持绑定的银行包括：浦发、中、农、工、建、邮储、光大、中信、华夏、民生、广发、兴业、招商、平安、上海、恒丰、广发银行等。\n**是否为线上分期流程？**\n- **小鹏融租**：是\n- **中行**：支持线上及线下\n- **建行**：支持线上及线下\n- **中信**：是\n- **民生**：是\n- **平安**：支持线上及线下"
        },
        {
          "from": 233,
          "to": 238,
          "chapter": "§一",
          "text": "- **中信**：是\n- **民生**：是\n- **平安**：支持线上及线下\n- **招行**：是\n- **交行**：是\n- **浦发**：是"
        },
        {
          "from": 237,
          "to": 240,
          "chapter": "§一",
          "text": "- **招行**：是\n- **交行**：是\n- **浦发**：是\n**是否支持订单线上信息变更？**"
        },
        {
          "from": 239,
          "to": 247,
          "chapter": "§一",
          "text": "- **交行**：是\n- **浦发**：是\n**是否支持订单线上信息变更？**\n- **小鹏融租**：是\n- **中行**：是\n- **建行**：是\n- **中信**：是\n- **民生**：否\n- **平安**：是"
        },
        {
          "from": 245,
          "to": 250,
          "chapter": "§一",
          "text": "- **中信**：是\n- **民生**：否\n- **平安**：是\n- **招行**：是\n- **交行**：是\n- **浦发**：是"
        },
        {
          "from": 249,
          "to": 252,
          "chapter": "§一",
          "text": "- **招行**：是\n- **交行**：是\n- **浦发**：是\n**是否支持自动放款？**"
        },
        {
          "from": 251,
          "to": 259,
          "chapter": "§一",
          "text": "- **交行**：是\n- **浦发**：是\n**是否支持自动放款？**\n- **小鹏融租**：1. 系统可自动发起放款；2. 人工发起放款（公牌、港澳台等）。\n- **中行**：线上订单：系统可自动发起放款；线下订单：银行人工放款。\n- **建行**：线上订单：系统可自动发起放款；线下订单：银行人工放款。\n- **中信**：系统可自动发起放款。\n- **民生**：系统可自动发起放款。\n- **平安**：线上订单：系统可自动发起放款；线下订单：银行人工放款。"
        },
        {
          "from": 257,
          "to": 262,
          "chapter": "§一",
          "text": "- **中信**：系统可自动发起放款。\n- **民生**：系统可自动发起放款。\n- **平安**：线上订单：系统可自动发起放款；线下订单：银行人工放款。\n- **招行**：系统可自动发起放款。\n- **交行**：系统可自动发起放款。\n- **浦发**：系统可自动发起放款。"
        },
        {
          "from": 261,
          "to": 264,
          "chapter": "§一",
          "text": "- **招行**：系统可自动发起放款。\n- **交行**：系统可自动发起放款。\n- **浦发**：系统可自动发起放款。\n**还款计划查询方式？**"
        },
        {
          "from": 263,
          "to": 271,
          "chapter": "§一",
          "text": "- **交行**：系统可自动发起放款。\n- **浦发**：系统可自动发起放款。\n**还款计划查询方式？**\n- **小鹏融租**：小鹏APP查询\n- **中行**：银行APP/小程序查询\n- **建行**：银行APP/小程序查询\n- **中信**：银行APP/小程序查询\n- **民生**：银行APP/小程序查询\n- **平安**：小鹏APP查询/银行APP/小程序查询"
        },
        {
          "from": 269,
          "to": 274,
          "chapter": "§一",
          "text": "- **中信**：银行APP/小程序查询\n- **民生**：银行APP/小程序查询\n- **平安**：小鹏APP查询/银行APP/小程序查询\n- **招行**：银行APP/小程序查询\n- **交行**：银行APP\n- **浦发**：银行APP/小程序查询"
        },
        {
          "from": 273,
          "to": 281,
          "chapter": "§一",
          "text": "- **招行**：银行APP/小程序查询\n- **交行**：银行APP\n- **浦发**：银行APP/小程序查询\n> ❗ **提示**\n>\n> 小鹏融租0首付准入额外材料：\n> 12-36期：\n> 1、近6个月银行流水，授薪人群需提供代发工资流水（融租金额 25 万以上额外要求：【个人】代发工资月均收入不少于 1 万【公牌】公司实缴资本不少于 20 万）；\n> 2、【第一类（申请人有房产（房产查册）或该房有人行征信未结清房贷）】提供："
        },
        {
          "from": 283,
          "to": 291,
          "chapter": "§一",
          "text": "> 12-36期：\n> 1、近6个月银行流水，授薪人群需提供代发工资流水（融租金额 25 万以上额外要求：【个人】代发工资月均收入不少于 1 万【公牌】公司实缴资本不少于 20 万）；\n> 2、【第一类（申请人有房产（房产查册）或该房有人行征信未结清房贷）】提供：\n> 主/共申名下房产证或房产查册记录或人行在供房贷，暂不接受宅基地/拆迁/房改/自建房\n> 或\n> 【第二类（非个人缴交社保或公积金连续缴纳满 1 年）】提供：\n> 主/共申连续 1 年社保或公积金缴纳记录\n> 48-60期：\n> 1、近6个月银行流水，授薪人群需提供代发工资流水（融租金额 25 万以上额外要求：【个人】代发工资月均收入不少于 1 万【公牌】公司实缴资本不少于 20 万）；"
        },
        {
          "from": 289,
          "to": 293,
          "chapter": "§一",
          "text": "> 主/共申连续 1 年社保或公积金缴纳记录\n> 48-60期：\n> 1、近6个月银行流水，授薪人群需提供代发工资流水（融租金额 25 万以上额外要求：【个人】代发工资月均收入不少于 1 万【公牌】公司实缴资本不少于 20 万）；\n> 2、【第一类（申请人有房产（房产查册）或该房有人行征信未结清房贷，且职业为公务员/事业单位员工/教师/医生）】提供：\n> 主/共申名下房产证或房产查册记录或人行在供房贷，暂不接受宅基地/拆迁/房改/自建房"
        },
        {
          "from": 292,
          "to": 295,
          "chapter": "§一",
          "text": "> 1、近6个月银行流水，授薪人群需提供代发工资流水（融租金额 25 万以上额外要求：【个人】代发工资月均收入不少于 1 万【公牌】公司实缴资本不少于 20 万）；\n> 2、【第一类（申请人有房产（房产查册）或该房有人行征信未结清房贷，且职业为公务员/事业单位员工/教师/医生）】提供：\n> 主/共申名下房产证或房产查册记录或人行在供房贷，暂不接受宅基地/拆迁/房改/自建房\n---"
        },
        {
          "from": 295,
          "to": 298,
          "chapter": "§一",
          "text": "> 2、【第一类（申请人有房产（房产查册）或该房有人行征信未结清房贷，且职业为公务员/事业单位员工/教师/医生）】提供：\n> 主/共申名下房产证或房产查册记录或人行在供房贷，暂不接受宅基地/拆迁/房改/自建房\n---\n1. **二类机构汇总**"
        },
        {
          "from": 297,
          "to": 300,
          "chapter": "§一",
          "text": "> 主/共申名下房产证或房产查册记录或人行在供房贷，暂不接受宅基地/拆迁/房改/自建房\n---\n1. **二类机构汇总**\n> 2026年5月26日更新，更新易鑫首付比例，增加行：同贷书有效期"
        },
        {
          "from": 299,
          "to": 302,
          "chapter": "§一",
          "text": "---\n1. **二类机构汇总**\n> 2026年5月26日更新，更新易鑫首付比例，增加行：同贷书有效期\n### 二类机构汇总对比表（4家）"
        },
        {
          "from": 304,
          "to": 307,
          "chapter": "§一",
          "text": "1. **二类机构汇总**\n> 2026年5月26日更新，更新易鑫首付比例，增加行：同贷书有效期\n### 二类机构汇总对比表（4家）\n> 4 家二类机构横向对比：合作机构、华夏东亚、易鑫、平安租赁、天下达直租"
        },
        {
          "from": 306,
          "to": 314,
          "chapter": "§一",
          "text": "> 2026年5月26日更新，更新易鑫首付比例，增加行：同贷书有效期\n### 二类机构汇总对比表（4家）\n> 4 家二类机构横向对比：合作机构、华夏东亚、易鑫、平安租赁、天下达直租\n| 合作机构 | 华夏东亚 | 易鑫 | 平安租赁 | 天下达直租 |\n| --- | --- | --- | --- | --- |\n| 是否需要本人驾照？ | 是 | 是/科目二 | 是/科目二 | 是 |\n| 标准产品年费率？ | 2.99% | 2.99% | 2.99% | 首付<25%: 6.5%；首付>25%: 5.99% |\n| 最低首付比例 | 15% | 5% | 0% | 15% |\n| 是否可以做主贷分离？（不查上牌人征信&无需上牌人共申） | 否 | 否 | 否 | 否 |"
        },
        {
          "from": 312,
          "to": 320,
          "chapter": "§一",
          "text": "| 标准产品年费率？ | 2.99% | 2.99% | 2.99% | 首付<25%: 6.5%；首付>25%: 5.99% |\n| 最低首付比例 | 15% | 5% | 0% | 15% |\n| 是否可以做主贷分离？（不查上牌人征信&无需上牌人共申） | 否 | 否 | 否 | 否 |\n| 是否需要线下面签？ | 否 | 是 | 否 | 否 |\n| 同贷书有效期 | 90天 | 30天 | 30天 | 60天 |\n| 是否受理公牌？ | 是 | 是 | 是 | 可接受公司申请，开具直租租金发票 |\n| 是否受理港澳台、外籍客户？ | 可以，最低首付15% | 否 | 否 | 否 |\n| 是否受理营运车、年费率？ | 是，1.10%~2.20%；非贴息：2.99% | 是、贴息1.10%~2.20% | 是、非贴息4.5% | 否 |\n| 营运车产品期限？ | 贴息：36期/60期；非贴息：12-60期 | 36期/60期 | 12-60期 | 否 |"
        },
        {
          "from": 318,
          "to": 326,
          "chapter": "§一",
          "text": "| 是否受理港澳台、外籍客户？ | 可以，最低首付15% | 否 | 否 | 否 |\n| 是否受理营运车、年费率？ | 是，1.10%~2.20%；非贴息：2.99% | 是、贴息1.10%~2.20% | 是、非贴息4.5% | 否 |\n| 营运车产品期限？ | 贴息：36期/60期；非贴息：12-60期 | 36期/60期 | 12-60期 | 否 |\n| 年龄要求 | 年满18周岁，最高年龄+贷款期限不超过70周岁 | 年满18周岁，最高年龄+贷款期限不超过65周岁 | 年满18周岁，最高年龄+贷款期限不超过65周岁 | 年满20周岁，最高年龄+贷款期限不超过70周岁 |\n| 0首付准入要求 | 否 | 否 | 大数据评分高，征信良好，收入稳定 | 否 |\n| 准入参考资料（具体以客户实际情况为准） | 身份证、驾驶证、收入材料 | 身份证、驾驶证、银行卡+近半年银行流水 | 身份证、驾驶证、财力材料（流水、房保单、理财、股票余额等等），或做生意人的营业执照照片，或房产/或支付宝及微信流水等 | 身份证、12123电子驾照截图、还款卡、近一年微信流水、工作可核实（需上天下达公司牌） |\n| 放款材料 | 发票+首付凭证 | 发票，如附加品增配需提供相应凭证；小鹏销售系统订单截屏；购车合同（小鹏模板） | 发票、GPS | 发票+购车合同（骁龙线上签署）+ GPS |\n| 提前结清政策 | 1. 机构客户免除违约金；2. 个人客户视已还款期限采取不同比例违约金政策：还款期数<6期，剩余本金的5%；还款期数6<=x<=12期，剩余本金的3%；还款期数>12期，免收提前还款违约金。 | 1. 3免2产品及5免3后2年2.49%：偿还剩余本金，1年内提还需支付剩余本金3%作为结清手续费，1年后免手续费。提还手续费500元；2. 5免3后2年2.79%：偿还剩余本金，2年内提还需支付剩余本金5%作为结清手续费，2年后免手续费。提还手续费500元；3. 其余金融产品：以金融机构审核结果为准。 | 偿还剩余本金，1年内提还需支付剩余本金8%作为结清手续费；2年内提还需支付剩余本…"
        },
        {
          "from": 324,
          "to": 331,
          "chapter": "§一",
          "text": "| 放款材料 | 发票+首付凭证 | 发票，如附加品增配需提供相应凭证；小鹏销售系统订单截屏；购车合同（小鹏模板） | 发票、GPS | 发票+购车合同（骁龙线上签署）+ GPS |\n| 提前结清政策 | 1. 机构客户免除违约金；2. 个人客户视已还款期限采取不同比例违约金政策：还款期数<6期，剩余本金的5%；还款期数6<=x<=12期，剩余本金的3%；还款期数>12期，免收提前还款违约金。 | 1. 3免2产品及5免3后2年2.49%：偿还剩余本金，1年内提还需支付剩余本金3%作为结清手续费，1年后免手续费。提还手续费500元；2. 5免3后2年2.79%：偿还剩余本金，2年内提还需支付剩余本金5%作为结清手续费，2年后免手续费。提还手续费500元；3. 其余金融产品：以金融机构审核结果为准。 | 偿还剩余本金，1年内提还需支付剩余本金8%作为结清手续费；2年内提还需支付剩余本金6%；3-5年提还需支付剩余本金2% | 偿还剩余本金，提还需支付剩余本金3%作为结清手续费 |\n| 还款日是哪天？ | 放款日为还款日，一般放款的次月即为首次还款时间 | 合同生效日的次月为还款日，后期客户有短信通知 | 每月12日前按照当月固定12日还款，12日之后起租按照日对日还款 | 1-10号放款，还款日次月5号；11-20号放款，还款日次月15号；21-31号放款，还款日次月25号 |\n| 还款方式 | 个人：卡扣款，支持卡包括：工商银行、农业银行、建设银行；机构：公对公打款、担保人卡扣款 | 根据实际提供资方查看。易鑫自营：工/农/中/建/平安银行/邮储/中信/交行/浦发；和赢ABN：工/农/中/建/平安银行/邮储/中信；兴业银行：兴业银行二类卡 | 支持绑定：中国银行、农业银行、工商银行、建设银行、平安银行 | 通联代扣，支持主流银行卡还款 |\n| 是否为线上分期流程 | 否，仅线下，需手动建单并维护订单流程状态 | 否，仅线下，需手动建单并维护订单流程状态 | 否，仅线下，需手动建单并维护订单流程状态 | 否，仅线下，需手动建单并维护订单流程状态 |\n| 是否支持订单线上信…"
        },
        {
          "from": 330,
          "to": 333,
          "chapter": "§一",
          "text": "| 是否支持订单线上信息变更 | 否 | 否 | 否 | 否 |\n| 是否支持自动放款 | 银行人工放款 | 银行人工放款 | 银行人工放款 | 银行人工放款 |\n| 还款计划查询方式 | 小程序查询 | 根据实际提供资方查看 | 平安车管家app查询 | 还款链接/公众号查询 |\n## 二，8月金融政策"
        },
        {
          "from": 336,
          "to": 339,
          "chapter": "§一",
          "text": "| 是否支持自动放款 | 银行人工放款 | 银行人工放款 | 银行人工放款 | 银行人工放款 |\n| 还款计划查询方式 | 小程序查询 | 根据实际提供资方查看 | 平安车管家app查询 | 还款链接/公众号查询 |\n## 二，8月金融政策\n#### 一类机构分期产品"
        },
        {
          "from": 338,
          "to": 341,
          "chapter": "§二",
          "text": "| 还款计划查询方式 | 小程序查询 | 根据实际提供资方查看 | 平安车管家app查询 | 还款链接/公众号查询 |\n## 二，8月金融政策\n#### 一类机构分期产品\n### 小鹏官方金融政策（一类机构分期产品）"
        },
        {
          "from": 343,
          "to": 346,
          "chapter": "§二",
          "text": "## 二，8月金融政策\n#### 一类机构分期产品\n### 小鹏官方金融政策（一类机构分期产品）\n> 9 大类车型分期产品表"
        },
        {
          "from": 345,
          "to": 353,
          "chapter": "§二",
          "text": "#### 一类机构分期产品\n### 小鹏官方金融政策（一类机构分期产品）\n> 9 大类车型分期产品表\n| 具体车型 | 全款客户 | 选择非贴息方案的金融客户 | 选择0息/低息/3免2/5免3方案 | 首付 | 融资额 | 金融价值 | 产品名称 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| 2026款G6 | 3000元选装抵扣券 | 24期0息；3免2 2.49%年费率；36期 0.83%年费率；48期 1.25%年费率；60期 1.50%年费率 | 0%起 | 5万起 | 贴息最高立省 7968（以开票金额：16W为例） | — | — |\n| 2026款G7 | 3000元选装抵扣券 | （同上） | 0%起 | 5万起 | 贴息最高立省 9462（以开票金额：19W为例） | — | — |\n| 2026款P7+ | 3000元选装抵扣券 | （同上） | 0%起 | 5万起 | 贴息最高立省 8964（以开票金额：18W为例） | 【2605】小鹏智选-2年0息--GX/2026款P7+/G7/G6/G9；【2605】小鹏智选-3-5年低息--GX/2026款P7+/G7/G6/G9；【2605】小鹏智选-限时3免2-GX/2026款P7+/G7/G6/G9 | — |\n| 2026款G9 | 5000元选装抵扣券 | （同上） | 0%起 | 5万起 | 贴息最高立省 10956（以开票金额：22W为例） | — | — |"
        },
        {
          "from": 351,
          "to": 359,
          "chapter": "§二",
          "text": "| 2026款G7 | 3000元选装抵扣券 | （同上） | 0%起 | 5万起 | 贴息最高立省 9462（以开票金额：19W为例） | — | — |\n| 2026款P7+ | 3000元选装抵扣券 | （同上） | 0%起 | 5万起 | 贴息最高立省 8964（以开票金额：18W为例） | 【2605】小鹏智选-2年0息--GX/2026款P7+/G7/G6/G9；【2605】小鹏智选-3-5年低息--GX/2026款P7+/G7/G6/G9；【2605】小鹏智选-限时3免2-GX/2026款P7+/G7/G6/G9 | — |\n| 2026款G9 | 5000元选装抵扣券 | （同上） | 0%起 | 5万起 | 贴息最高立省 10956（以开票金额：22W为例） | — | — |\n| GX | 4\\*1000度电卡 | （同上） | 0%起 | 5万起 | 贴息最高立省 14442（以开票金额：29W为例） | — | — |\n| 2025款M03 | 2500元保险补贴 | 24期0息；3免2 2.79%年费率；36期 0.93%年费率；48期 1.40%年费率；60期 1.67%年费率 | 0%起 | 5万起 | 贴息最高立省 6,720（以开票金额：12W为例） | 【2607】小鹏智选-2年0息-L03/M03；【2607】小鹏智选-3-5年低息-L03/M03；【2607】小鹏智选-限时3免2-L03/M03 | — |\n| 2026款M03 | 30000积分 | （同上） | 0%起 | 5万起 | 贴息最高立省 7280（以开票金额：13W为例） | — | — |\n| L03 | 30000积分 | （同上） | 0%起 | 5万起 | 贴息最高立省 16500（以开票金额：22W为例） | — | — |\n| 新P7 | 50000积分 | 36期0息；5免3 2.49%年费率；60期 0.99%年费率 | 0%起 | 5万起 | 贴息最高立省 14250（以开票金额：19W为例） | 【2604】小鹏智选-3年0息-2025款G9；…"
        },
        {
          "from": 357,
          "to": 365,
          "chapter": "§二",
          "text": "| L03 | 30000积分 | （同上） | 0%起 | 5万起 | 贴息最高立省 16500（以开票金额：22W为例） | — | — |\n| 新P7 | 50000积分 | 36期0息；5免3 2.49%年费率；60期 0.99%年费率 | 0%起 | 5万起 | 贴息最高立省 14250（以开票金额：19W为例） | 【2604】小鹏智选-3年0息-2025款G9；【2604】小鹏智选-5年低息0.99%-2025款G9 | — |\n| 2025款G7 | 50000积分 | （同上） | 0%起 | 5万起 | 贴息最高立省 12000（以开票金额：16W为例） | 【2604】小鹏智选-3年0息-X9/2025款P7+/G6/G7；【2604】小鹏智选-5年低息0.99%-X9/2025P7+/G6/G7；【2604】小鹏智选-3年0息-新P7 | — |\n| 2025款G6 | 5000元保险补贴 | （同上） | 0%起 | 5万起 | 贴息最高立省 16500（以开票金额：22W为例） | — | — |\n| 2025款G9 | 8000元保险补贴 | （同上） | 0%起 | 5万起 | 贴息最高立省 27000（以开票金额：30W为例） | 【2604】小鹏智选-5年低息0.99%-新P7；【2605】小鹏智选-限时5免3-X9/2025款P7+；【2605】小鹏智选-限时5免3-新P7/2025款G6/G7/G9 | — |\n| 2025款P7+ | 50000积分 | 36期0息；5免3 2.79%年费率；60期 0.99%年费率 | 0%起 | 5万起 | — | — | — |\n| 2026款X9 | 5000元选装抵扣券 | （同上） | 0%起 | 5万起 | — | — | — |\n| 2025款G6、2025款G7、2025款G9、新P7、2026款P7+、2026款G7、2026款G6、2026款G9、GX | — | 12-60期：年费率 2.49% | 0%起 | 5万起 | — | 【2605】小鹏智选-限时费率2.49%…"
        },
        {
          "from": 363,
          "to": 366,
          "chapter": "§二",
          "text": "| 2026款X9 | 5000元选装抵扣券 | （同上） | 0%起 | 5万起 | — | — | — |\n| 2025款G6、2025款G7、2025款G9、新P7、2026款P7+、2026款G7、2026款G6、2026款G9、GX | — | 12-60期：年费率 2.49% | 0%起 | 5万起 | — | 【2605】小鹏智选-限时费率2.49%-GX/新P7/G7/G6/G9/26款P7+ | — |\n| L03、2025&2026款M03、2025款P7+、2026款X9 | — | 12-60期：年费率 2.79% | 0%起 | 5万起 | — | 【2603】小鹏智选-限时费率2.79%-0首付起 | — |\n| L03 | — | 融易购-年付尾款-低息：36/60期，年利率2.99%/3.99%（折算年费率1.99%/2.39%） | 10%起 | 5万起 | — | 【2607】小鹏智选-融易购-年付尾款-低息-L03 | — |"
        },
        {
          "from": 365,
          "to": 373,
          "chapter": "§二",
          "text": "| 2025款G6、2025款G7、2025款G9、新P7、2026款P7+、2026款G7、2026款G6、2026款G9、GX | — | 12-60期：年费率 2.49% | 0%起 | 5万起 | — | 【2605】小鹏智选-限时费率2.49%-GX/新P7/G7/G6/G9/26款P7+ | — |\n| L03、2025&2026款M03、2025款P7+、2026款X9 | — | 12-60期：年费率 2.79% | 0%起 | 5万起 | — | 【2603】小鹏智选-限时费率2.79%-0首付起 | — |\n| L03 | — | 融易购-年付尾款-低息：36/60期，年利率2.99%/3.99%（折算年费率1.99%/2.39%） | 10%起 | 5万起 | — | 【2607】小鹏智选-融易购-年付尾款-低息-L03 | — |\n> 🎯 **提示**\n>\n> **3免2及5免3产品注意事项如下：**\n> 1. **适用官方金融合作机构：中国银行、平安银行、招商银行、浦发银行、小鹏融租、中信银行**\n> 2. 智选分流暂不考虑客户刚需标签。\n> 3. **提前结清政策：**"
        },
        {
          "from": 375,
          "to": 383,
          "chapter": "§二",
          "text": "> 1. **适用官方金融合作机构：中国银行、平安银行、招商银行、浦发银行、小鹏融租、中信银行**\n> 2. 智选分流暂不考虑客户刚需标签。\n> 3. **提前结清政策：**\n> - 平安银行：2年内提还收取剩余本金的5%作为违约金，2年后免违约金\n> - 招商银行：2年内提还收取剩余本金的3%作为违约金，2年后提还可特殊申请违约金全额减免（客户拨打95555申请）\n> - 浦发银行：3免2产品 — 2年内提还收取剩余本金的3%作为违约金，2年后免违约金；5免3产品 — 3年内提还收取剩余本金的3%作为违约金，3年后免违约金\n> - 中国银行：总行不作违约金强制要求，以各地分行政策为准\n> - 小鹏融租（仅适用于上海银行，不含自营）：3免2产品：24期内提还需支付剩余本金的3%作为违约金，满24期无违约金；5免3产品：42期内提还需支付剩余本金的3%作为违约金，满42期无违约金。\n> - 中信银行：3免2产品：第13-25期收剩余本金3%作为违约金，其他期限内免收违约金；第25期提前还款，可向中信发起申请减免提前还款违约金。5免3产品：第19-42期提前还款收剩余本金5%作为违约金，其他期限内免收违约金"
        },
        {
          "from": 381,
          "to": 384,
          "chapter": "§二",
          "text": "> - 中国银行：总行不作违约金强制要求，以各地分行政策为准\n> - 小鹏融租（仅适用于上海银行，不含自营）：3免2产品：24期内提还需支付剩余本金的3%作为违约金，满24期无违约金；5免3产品：42期内提还需支付剩余本金的3%作为违约金，满42期无违约金。\n> - 中信银行：3免2产品：第13-25期收剩余本金3%作为违约金，其他期限内免收违约金；第25期提前还款，可向中信发起申请减免提前还款违约金。5免3产品：第19-42期提前还款收剩余本金5%作为违约金，其他期限内免收违约金\n---"
        },
        {
          "from": 385,
          "to": 388,
          "chapter": "§二",
          "text": "> - 小鹏融租（仅适用于上海银行，不含自营）：3免2产品：24期内提还需支付剩余本金的3%作为违约金，满24期无违约金；5免3产品：42期内提还需支付剩余本金的3%作为违约金，满42期无违约金。\n> - 中信银行：3免2产品：第13-25期收剩余本金3%作为违约金，其他期限内免收违约金；第25期提前还款，可向中信发起申请减免提前还款违约金。5免3产品：第19-42期提前还款收剩余本金5%作为违约金，其他期限内免收违约金\n---\n#### 尾款产品"
        },
        {
          "from": 387,
          "to": 390,
          "chapter": "§二",
          "text": "> - 中信银行：3免2产品：第13-25期收剩余本金3%作为违约金，其他期限内免收违约金；第25期提前还款，可向中信发起申请减免提前还款违约金。5免3产品：第19-42期提前还款收剩余本金5%作为违约金，其他期限内免收违约金\n---\n#### 尾款产品\n### 尾款产品：5050 轻松购"
        },
        {
          "from": 392,
          "to": 400,
          "chapter": "§二",
          "text": "---\n#### 尾款产品\n### 尾款产品：5050 轻松购\n| 适用车型 | 首付 | 期限 | 年费率 | 近似年化利率 | 尾款 | 融资额 | 产品名称 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| GX、新P7、2025&2026款G7、2025&2026款G6、2025&2026款G9、2026款P7+ | 50% | 12期 | 4.57% | — | 50% | 5万起 | 【2605】小鹏智选-5050轻松购-GX/新P7&G7&G6&G9&26款P7+ |\n| GX、新P7、2025&2026款G7、2025&2026款G6、2025&2026款G9、2026款P7+ | 50% | 24期 | 4.72% | — | 50% | 5万起 | 【2605】小鹏智选-5050轻松购-GX/新P7&G7&G6&G9&26款P7+ |\n| 2025&2026款M03、2025款P7+、2025款X9、2026款X9 | 50% | 12期 | 5.11% | — | 50% | 5万起 | 【2603】小鹏智选-5050轻松购-50%尾款 |\n| 2025&2026款M03、2025款P7+、2025款X9、2026款X9 | 50% | 24期 | 5.26% | — | 50% | 5万起 | 【2603】小鹏智选-5050轻松购-50%尾款 |"
        },
        {
          "from": 398,
          "to": 401,
          "chapter": "§二",
          "text": "| GX、新P7、2025&2026款G7、2025&2026款G6、2025&2026款G9、2026款P7+ | 50% | 24期 | 4.72% | — | 50% | 5万起 | 【2605】小鹏智选-5050轻松购-GX/新P7&G7&G6&G9&26款P7+ |\n| 2025&2026款M03、2025款P7+、2025款X9、2026款X9 | 50% | 12期 | 5.11% | — | 50% | 5万起 | 【2603】小鹏智选-5050轻松购-50%尾款 |\n| 2025&2026款M03、2025款P7+、2025款X9、2026款X9 | 50% | 24期 | 5.26% | — | 50% | 5万起 | 【2603】小鹏智选-5050轻松购-50%尾款 |\n---"
        },
        {
          "from": 405,
          "to": 408,
          "chapter": "§二",
          "text": "| 2025&2026款M03、2025款P7+、2025款X9、2026款X9 | 50% | 12期 | 5.11% | — | 50% | 5万起 | 【2603】小鹏智选-5050轻松购-50%尾款 |\n| 2025&2026款M03、2025款P7+、2025款X9、2026款X9 | 50% | 24期 | 5.26% | — | 50% | 5万起 | 【2603】小鹏智选-5050轻松购-50%尾款 |\n---\n#### 二类机构产品政策"
        },
        {
          "from": 407,
          "to": 410,
          "chapter": "§二",
          "text": "| 2025&2026款M03、2025款P7+、2025款X9、2026款X9 | 50% | 24期 | 5.26% | — | 50% | 5万起 | 【2603】小鹏智选-5050轻松购-50%尾款 |\n---\n#### 二类机构产品政策\n### 易鑫金融 8月金融政策（二类机构产品政策）"
        },
        {
          "from": 412,
          "to": 415,
          "chapter": "§二",
          "text": "---\n#### 二类机构产品政策\n### 易鑫金融 8月金融政策（二类机构产品政策）\n> 涵盖 3 免 2、5 免 3、标准产品（36/60期）、提价产品、直租产品"
        },
        {
          "from": 414,
          "to": 422,
          "chapter": "§二",
          "text": "#### 二类机构产品政策\n### 易鑫金融 8月金融政策（二类机构产品政策）\n> 涵盖 3 免 2、5 免 3、标准产品（36/60期）、提价产品、直租产品\n| 产品类型 | 车型 | 首付比例 | 期限 | 融资额 | (贴息)对客费率/年 | (非贴息)对客费率/年 | 服务机构 | 产品名称 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| 3免2 | GX、2026款P7+、2026款G7、2026款G6、2026款G9 | 5% | 36 | 2万起 | 2.49%（计息期） | — | 易鑫 | 【2605】二类机构产品-5免3/3免2-易鑫 |\n| 3免2 | L03、2025款M03、2026款M03 | 5% | 36 | 2万起 | 2.79%（计息期） | — | 易鑫 | 【2605】二类机构产品-5免3/3免2-易鑫 |\n| 5免3 | 新P7、2025款G7、2025款G6、2025款G9 | 5% | 60 | 2万起 | 2.49%（计息期） | — | 易鑫 | 【2605】二类机构产品-5免3/3免2-易鑫 |\n| 5免3 | 2025款P7+、2026款X9 | 5% | 60 | 2万起 | 2.79%（计息期） | — | 易鑫 | 【2605】二类机构产品-5免3/3免2-易鑫 |"
        },
        {
          "from": 420,
          "to": 428,
          "chapter": "§二",
          "text": "| 3免2 | L03、2025款M03、2026款M03 | 5% | 36 | 2万起 | 2.79%（计息期） | — | 易鑫 | 【2605】二类机构产品-5免3/3免2-易鑫 |\n| 5免3 | 新P7、2025款G7、2025款G6、2025款G9 | 5% | 60 | 2万起 | 2.49%（计息期） | — | 易鑫 | 【2605】二类机构产品-5免3/3免2-易鑫 |\n| 5免3 | 2025款P7+、2026款X9 | 5% | 60 | 2万起 | 2.79%（计息期） | — | 易鑫 | 【2605】二类机构产品-5免3/3免2-易鑫 |\n| 标准产品（36/60期） | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | 华夏东亚15%起、易鑫5%起、平安租赁0%起 | 36 | 不限 | 1.10% | 12-60期：2.99% | 易鑫/平安租赁/华夏东亚 | 【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚 |\n| 标准产品（36/60期） | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | 华夏东亚15%起、易鑫5%起、平安租赁0%起 | 60 | 不限 | 1.80% | 12-60期：2.99% | 易鑫/平安租赁/华夏东亚 | 【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚 |\n| 标准产品（36/60期） | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 华夏东亚15%起、易鑫5%起、平安租赁0%起 | 36 | 不限 | 1.70% | 12-60期：2.99% | 易鑫/平安租赁/华夏东亚 | 【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚 |\n| 标准产品（36/60期） | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 华夏东亚15%起、易…"
        },
        {
          "from": 426,
          "to": 434,
          "chapter": "§二",
          "text": "| 标准产品（36/60期） | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 华夏东亚15%起、易鑫5%起、平安租赁0%起 | 60 | 不限 | 2.20% | 12-60期：2.99% | 易鑫/平安租赁/华夏东亚 | 【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚 |\n| 提价产品 | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | 5% | 36 | 2万起 | 2.19% | 12-60期：3.99% | 易鑫 | 【2603】二类机构产品-贴息产品-易鑫（2.19-3.27%） |\n| 提价产品 | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | 5% | 60 | 2万起 | 2.91% | 12-60期：3.99% | 易鑫 | 【2603】二类机构产品-贴息产品-易鑫（2.19-3.27%） |\n| 提价产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 5% | 36 | 2万起 | 2.79% | 12-60期：3.99% | 易鑫 | 【2603】二类机构产品-贴息产品-易鑫（2.19-3.27%） |\n| 提价产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 5% | 60 | 2万起 | 3.27% | 12-60期：3.99% | 易鑫 | 【2603】二类机构产品-贴息产品-易鑫（2.19-3.27%） |\n| 提价产品 | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | 0%起 | 60 | 不限 | 3.25%（单查征信） | 4.33%（单查征信） | 平安租赁 | 【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚 |\n| 提价产品 | 2025款P7+…"
        },
        {
          "from": 432,
          "to": 440,
          "chapter": "§二",
          "text": "| 提价产品 | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | 0%起 | 60 | 不限 | 3.48%（C类客户提价） | 4.56%（C类客户提价） | 平安租赁 | 【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚 |\n| 提价产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 0%起 | 60 | 不限 | 3.61%（单查征信） | 4.74%（C类客户提价） | 平安租赁 | 【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚 |\n| 提价产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 0%起 | 60 | 不限 | 3.84%（D类客户提价） | — | 平安租赁 | 【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚 |\n| 直租产品 | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | ≤25% | 36 | 不限 | 4.19% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n| 直租产品 | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | ≤25% | 60 | 不限 | 4.90% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n| 直租产品 | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | >25% | 36 | 不限 | 3.69% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |…"
        },
        {
          "from": 438,
          "to": 442,
          "chapter": "§二",
          "text": "| 直租产品 | 2025款P7+、新P7、2025款G7、2025款G6、2025款G9、2026款X9 | >25% | 60 | 不限 | 4.50% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n| 直租产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | ≤25% | 36 | 不限 | 4.79% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n| 直租产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | ≤25% | 60 | 不限 | 5.29% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n| 直租产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | >25% | 36 | 不限 | 4.29% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n| 直租产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | >25% | 60 | 不限 | 4.79% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |"
        },
        {
          "from": 441,
          "to": 449,
          "chapter": "§二",
          "text": "| 直租产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | ≤25% | 60 | 不限 | 5.29% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n| 直租产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | >25% | 36 | 不限 | 4.29% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n| 直租产品 | L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | >25% | 60 | 不限 | 4.79% | 36-60期；首付15%-25%：6.50%；首付≥25%：5.99% | 天下达 | 【2512】二类机构产品-贴息产品-直租-天下达 |\n> 📌 **提示**\n>\n> **易鑫的3免2及5免3产品的车型对应费率与一类机构完全一致，用于承接一类机构拒绝的客户。**\n> 易鑫3免2及5免3产品，提前结清政策：\n> - 3免2 / 5免3 费率2.49%：1年内提前结清，收取剩余本金的3%作为违约金。12期后免违约金，提前结清手续费500元。\n> - 5免3 费率2.79%：2年内提前结清，收取剩余本金的5%作为违约金。24期后免违约金，提前结清手续费500元"
        },
        {
          "from": 451,
          "to": 454,
          "chapter": "§二",
          "text": "> 易鑫3免2及5免3产品，提前结清政策：\n> - 3免2 / 5免3 费率2.49%：1年内提前结清，收取剩余本金的3%作为违约金。12期后免违约金，提前结清手续费500元。\n> - 5免3 费率2.79%：2年内提前结清，收取剩余本金的5%作为违约金。24期后免违约金，提前结清手续费500元\n二类机构特殊要求说明："
        },
        {
          "from": 455,
          "to": 458,
          "chapter": "§二",
          "text": "> - 3免2 / 5免3 费率2.49%：1年内提前结清，收取剩余本金的3%作为违约金。12期后免违约金，提前结清手续费500元。\n> - 5免3 费率2.79%：2年内提前结清，收取剩余本金的5%作为违约金。24期后免违约金，提前结清手续费500元\n二类机构特殊要求说明：\n---"
        },
        {
          "from": 458,
          "to": 461,
          "chapter": "§二",
          "text": "> - 5免3 费率2.79%：2年内提前结清，收取剩余本金的5%作为违约金。24期后免违约金，提前结清手续费500元\n二类机构特殊要求说明：\n---\n#### 贴息节省金额参考"
        },
        {
          "from": 460,
          "to": 463,
          "chapter": "§二",
          "text": "二类机构特殊要求说明：\n---\n#### 贴息节省金额参考\n**注：请大家把统一将办理官方金融称为“分期”，**例如，客户选择了小鹏融资租赁办理10万元分期，**正确表述：分期10万，**错误表述：“贷款10万”、“按揭10万”**。**"
        },
        {
          "from": 463,
          "to": 466,
          "chapter": "§二",
          "text": "---\n#### 贴息节省金额参考\n**注：请大家把统一将办理官方金融称为“分期”，**例如，客户选择了小鹏融资租赁办理10万元分期，**正确表述：分期10万，**错误表述：“贷款10万”、“按揭10万”**。**\n## 三，金融计算器"
        },
        {
          "from": 465,
          "to": 468,
          "chapter": "§二",
          "text": "#### 贴息节省金额参考\n**注：请大家把统一将办理官方金融称为“分期”，**例如，客户选择了小鹏融资租赁办理10万元分期，**正确表述：分期10万，**错误表述：“贷款10万”、“按揭10万”**。**\n## 三，金融计算器\n**金融报价单：**"
        },
        {
          "from": 467,
          "to": 470,
          "chapter": "§三",
          "text": "**注：请大家把统一将办理官方金融称为“分期”，**例如，客户选择了小鹏融资租赁办理10万元分期，**正确表述：分期10万，**错误表述：“贷款10万”、“按揭10万”**。**\n## 三，金融计算器\n**金融报价单：**\n## 四，还款方式/绑卡说明"
        },
        {
          "from": 470,
          "to": 473,
          "chapter": "§三",
          "text": "## 三，金融计算器\n**金融报价单：**\n## 四，还款方式/绑卡说明\n### 小鹏官方金融的还款方式"
        },
        {
          "from": 472,
          "to": 477,
          "chapter": "§四",
          "text": "**金融报价单：**\n## 四，还款方式/绑卡说明\n### 小鹏官方金融的还款方式\n> 💡 **提示**\n>\n> 小鹏官方金融分期的还款方式为：**等额本息**，即每个月的还款额固定，但每月还款额中的本金比重逐月递增、利息比重逐月递减。如果客户要做等本等息的中行(需线下面签)/建行(需线下面签)/招商(需线下面签)/交通(部分线下面签)，请单独沟通。"
        },
        {
          "from": 477,
          "to": 480,
          "chapter": "§四",
          "text": "> 💡 **提示**\n>\n> 小鹏官方金融分期的还款方式为：**等额本息**，即每个月的还款额固定，但每月还款额中的本金比重逐月递增、利息比重逐月递减。如果客户要做等本等息的中行(需线下面签)/建行(需线下面签)/招商(需线下面签)/交通(部分线下面签)，请单独沟通。\n### 小鹏官方金融还款说明"
        },
        {
          "from": 480,
          "to": 488,
          "chapter": "§四",
          "text": ">\n> 小鹏官方金融分期的还款方式为：**等额本息**，即每个月的还款额固定，但每月还款额中的本金比重逐月递增、利息比重逐月递减。如果客户要做等本等息的中行(需线下面签)/建行(需线下面签)/招商(需线下面签)/交通(部分线下面签)，请单独沟通。\n### 小鹏官方金融还款说明\n> 💡 **提示**\n>\n> 1. 还款满12期，不管放款时间是哪天，都是**从第一期还款成功**开始计算，到第12期还款成功，**具体参照机构的还款计划**，而非是从放款开始计划或者放款次月计算。\n> 2. 小鹏融租支付日为起息日的每月对应日，无对应日的，以该月月末为支付日；最后一期支付日为到期日。比如：客户起息日为1月25日，之后每月25日为支付日；客户起息日为1月31日，之后每月31日为支付日，如当月无31日取月末最后一天作为支付日。\n> 3. 计息方式为按月计息，每期应还租息=上期期末剩余租赁本金\\*年化租赁利率/12，计算第1期租息时，上期期末剩余租赁本金=融资金额。\n> 4. 还款明细，最终都以实际机构的合同/还款计划表为准。"
        },
        {
          "from": 487,
          "to": 490,
          "chapter": "§四",
          "text": "> 2. 小鹏融租支付日为起息日的每月对应日，无对应日的，以该月月末为支付日；最后一期支付日为到期日。比如：客户起息日为1月25日，之后每月25日为支付日；客户起息日为1月31日，之后每月31日为支付日，如当月无31日取月末最后一天作为支付日。\n> 3. 计息方式为按月计息，每期应还租息=上期期末剩余租赁本金\\*年化租赁利率/12，计算第1期租息时，上期期末剩余租赁本金=融资金额。\n> 4. 还款明细，最终都以实际机构的合同/还款计划表为准。\n### 小鹏融租绑卡银行"
        },
        {
          "from": 491,
          "to": 494,
          "chapter": "§四",
          "text": "> 3. 计息方式为按月计息，每期应还租息=上期期末剩余租赁本金\\*年化租赁利率/12，计算第1期租息时，上期期末剩余租赁本金=融资金额。\n> 4. 还款明细，最终都以实际机构的合同/还款计划表为准。\n### 小鹏融租绑卡银行\n资金方为小鹏融租：扣款账户有：工行、建行、对公转账（每月打款至小鹏融租账号）"
        },
        {
          "from": 493,
          "to": 496,
          "chapter": "§四",
          "text": "> 4. 还款明细，最终都以实际机构的合同/还款计划表为准。\n### 小鹏融租绑卡银行\n资金方为小鹏融租：扣款账户有：工行、建行、对公转账（每月打款至小鹏融租账号）\n资金方为上海银行：扣款账户有：上海银行、工商银行、中国银行、建设银行、交通银行、平安银行、农业银行、邮储银行"
        },
        {
          "from": 495,
          "to": 498,
          "chapter": "§四",
          "text": "### 小鹏融租绑卡银行\n资金方为小鹏融租：扣款账户有：工行、建行、对公转账（每月打款至小鹏融租账号）\n资金方为上海银行：扣款账户有：上海银行、工商银行、中国银行、建设银行、交通银行、平安银行、农业银行、邮储银行\n## 五，客户APP资料填写指引"
        },
        {
          "from": 497,
          "to": 500,
          "chapter": "§四",
          "text": "资金方为小鹏融租：扣款账户有：工行、建行、对公转账（每月打款至小鹏融租账号）\n资金方为上海银行：扣款账户有：上海银行、工商银行、中国银行、建设银行、交通银行、平安银行、农业银行、邮储银行\n## 五，客户APP资料填写指引\n### 申请入口二维码"
        },
        {
          "from": 499,
          "to": 502,
          "chapter": "§五",
          "text": "资金方为上海银行：扣款账户有：上海银行、工商银行、中国银行、建设银行、交通银行、平安银行、农业银行、邮储银行\n## 五，客户APP资料填写指引\n### 申请入口二维码\n分期申请人可直接用微信或支付宝扫码，即可进入分期申请页面。注意登录的手机号码需要和AFL上预留的承租人手机号码（即骁龙上牌人电话）一致。"
        },
        {
          "from": 501,
          "to": 504,
          "chapter": "§五",
          "text": "## 五，客户APP资料填写指引\n### 申请入口二维码\n分期申请人可直接用微信或支付宝扫码，即可进入分期申请页面。注意登录的手机号码需要和AFL上预留的承租人手机号码（即骁龙上牌人电话）一致。\n### 申请入口二维码"
        },
        {
          "from": 506,
          "to": 509,
          "chapter": "§五",
          "text": "### 申请入口二维码\n分期申请人可直接用微信或支付宝扫码，即可进入分期申请页面。注意登录的手机号码需要和AFL上预留的承租人手机号码（即骁龙上牌人电话）一致。\n### 申请入口二维码\n> 客户 APP 资料填写指引 — 申请入口"
        },
        {
          "from": 508,
          "to": 511,
          "chapter": "§五",
          "text": "分期申请人可直接用微信或支付宝扫码，即可进入分期申请页面。注意登录的手机号码需要和AFL上预留的承租人手机号码（即骁龙上牌人电话）一致。\n### 申请入口二维码\n> 客户 APP 资料填写指引 — 申请入口\n**使用方式：**"
        },
        {
          "from": 510,
          "to": 514,
          "chapter": "§五",
          "text": "### 申请入口二维码\n> 客户 APP 资料填写指引 — 申请入口\n**使用方式：**\n- 分期申请人可直接用微信或支付宝扫码，即可进入分期申请页面\n- 注意：登录的手机号码需要和 AFL 上预留的承租人手机号码（即骁龙上牌人电话）一致"
        },
        {
          "from": 513,
          "to": 516,
          "chapter": "§五",
          "text": "**使用方式：**\n- 分期申请人可直接用微信或支付宝扫码，即可进入分期申请页面\n- 注意：登录的手机号码需要和 AFL 上预留的承租人手机号码（即骁龙上牌人电话）一致\n> 二维码为黑白样式正方形，外围有四个定位用方正色块，中心处有小鹏汽车品牌标识。"
        },
        {
          "from": 515,
          "to": 518,
          "chapter": "§五",
          "text": "- 分期申请人可直接用微信或支付宝扫码，即可进入分期申请页面\n- 注意：登录的手机号码需要和 AFL 上预留的承租人手机号码（即骁龙上牌人电话）一致\n> 二维码为黑白样式正方形，外围有四个定位用方正色块，中心处有小鹏汽车品牌标识。\n（原始二维码资源链接：<https://feishu.cn/file/J9nCb8RlNovzmYxpPrVcIRbEncd>）"
        },
        {
          "from": 517,
          "to": 520,
          "chapter": "§五",
          "text": "- 注意：登录的手机号码需要和 AFL 上预留的承租人手机号码（即骁龙上牌人电话）一致\n> 二维码为黑白样式正方形，外围有四个定位用方正色块，中心处有小鹏汽车品牌标识。\n（原始二维码资源链接：<https://feishu.cn/file/J9nCb8RlNovzmYxpPrVcIRbEncd>）\n### APP填写资料指引"
        },
        {
          "from": 523,
          "to": 526,
          "chapter": "§五",
          "text": "> 二维码为黑白样式正方形，外围有四个定位用方正色块，中心处有小鹏汽车品牌标识。\n（原始二维码资源链接：<https://feishu.cn/file/J9nCb8RlNovzmYxpPrVcIRbEncd>）\n### APP填写资料指引\n****"
        },
        {
          "from": 525,
          "to": 528,
          "chapter": "§五",
          "text": "（原始二维码资源链接：<https://feishu.cn/file/J9nCb8RlNovzmYxpPrVcIRbEncd>）\n### APP填写资料指引\n****\n### APP 填写资料指引 — 字段说明表"
        },
        {
          "from": 530,
          "to": 533,
          "chapter": "§五",
          "text": "### APP填写资料指引\n****\n### APP 填写资料指引 — 字段说明表\n> 客户在分期申请 APP 端需填写的资料详情，按板块列出字段名称与释义。"
        },
        {
          "from": 532,
          "to": 535,
          "chapter": "§五",
          "text": "****\n### APP 填写资料指引 — 字段说明表\n> 客户在分期申请 APP 端需填写的资料详情，按板块列出字段名称与释义。\n**板块 1：分期信息**"
        },
        {
          "from": 534,
          "to": 537,
          "chapter": "§五",
          "text": "### APP 填写资料指引 — 字段说明表\n> 客户在分期申请 APP 端需填写的资料详情，按板块列出字段名称与释义。\n**板块 1：分期信息**\n- 购车用途：购车的主要用途（如：自用 / 营运 / 公司用车等）"
        },
        {
          "from": 536,
          "to": 539,
          "chapter": "§五",
          "text": "> 客户在分期申请 APP 端需填写的资料详情，按板块列出字段名称与释义。\n**板块 1：分期信息**\n- 购车用途：购车的主要用途（如：自用 / 营运 / 公司用车等）\n**板块 2：上传证件**"
        },
        {
          "from": 538,
          "to": 542,
          "chapter": "§五",
          "text": "**板块 1：分期信息**\n- 购车用途：购车的主要用途（如：自用 / 营运 / 公司用车等）\n**板块 2：上传证件**\n- 身份证（人像面 + 国徽面）：按拍摄实例拍摄，字体清晰、亮度均匀\n- 驾驶证（如需）"
        },
        {
          "from": 541,
          "to": 544,
          "chapter": "§五",
          "text": "**板块 2：上传证件**\n- 身份证（人像面 + 国徽面）：按拍摄实例拍摄，字体清晰、亮度均匀\n- 驾驶证（如需）\n**板块 3：申请人信息**"
        },
        {
          "from": 543,
          "to": 548,
          "chapter": "§五",
          "text": "- 身份证（人像面 + 国徽面）：按拍摄实例拍摄，字体清晰、亮度均匀\n- 驾驶证（如需）\n**板块 3：申请人信息**\n- 可提供本人/亲属号码：本人实有效的手机号码\n- 手机号码：本人实有效的手机号码\n- 学历信息（如部分机构要求）"
        },
        {
          "from": 547,
          "to": 550,
          "chapter": "§五",
          "text": "- 可提供本人/亲属号码：本人实有效的手机号码\n- 手机号码：本人实有效的手机号码\n- 学历信息（如部分机构要求）\n**板块 4：住房信息**"
        },
        {
          "from": 549,
          "to": 553,
          "chapter": "§五",
          "text": "- 手机号码：本人实有效的手机号码\n- 学历信息（如部分机构要求）\n**板块 4：住房信息**\n- 居住情况：自有房 / 租房 / 与父母同住 / 公司宿舍 / 其他\n- 居住地址：详细住址（精确到门牌号）"
        },
        {
          "from": 552,
          "to": 555,
          "chapter": "§五",
          "text": "**板块 4：住房信息**\n- 居住情况：自有房 / 租房 / 与父母同住 / 公司宿舍 / 其他\n- 居住地址：详细住址（精确到门牌号）\n**板块 5：工作单位信息**"
        },
        {
          "from": 554,
          "to": 562,
          "chapter": "§五",
          "text": "- 居住情况：自有房 / 租房 / 与父母同住 / 公司宿舍 / 其他\n- 居住地址：详细住址（精确到门牌号）\n**板块 5：工作单位信息**\n- 职业：当前从事的职业类别\n- 工作单位名称：当前就职的单位名称（与社保/工资单一致）\n- 单位电话：单位座机或人事联系电话\n- 单位地址：当前工作单位的详细地址\n- 单位详细地址：精确到门牌号或楼栋\n- 直系亲属信息（如有共申需求）"
        },
        {
          "from": 560,
          "to": 563,
          "chapter": "§五",
          "text": "- 单位地址：当前工作单位的详细地址\n- 单位详细地址：精确到门牌号或楼栋\n- 直系亲属信息（如有共申需求）\n**板块 6：补件**"
        },
        {
          "from": 563,
          "to": 567,
          "chapter": "§五",
          "text": "- 单位详细地址：精确到门牌号或楼栋\n- 直系亲属信息（如有共申需求）\n**板块 6：补件**\n- 人行征信报告：手机银行 APP 搜索\"个人征信查询\"申请，24小时内邮箱收报告\n- 银行流水：近 6 个月银行流水（详版可柜台打印）"
        },
        {
          "from": 566,
          "to": 569,
          "chapter": "§五",
          "text": "**板块 6：补件**\n- 人行征信报告：手机银行 APP 搜索\"个人征信查询\"申请，24小时内邮箱收报告\n- 银行流水：近 6 个月银行流水（详版可柜台打印）\n（原始资料填写说明图链接：<https://feishu.cn/file/Ud5wboZTCoapqBxx8iRcHbJ8nVc>）"
        },
        {
          "from": 568,
          "to": 571,
          "chapter": "§五",
          "text": "- 人行征信报告：手机银行 APP 搜索\"个人征信查询\"申请，24小时内邮箱收报告\n- 银行流水：近 6 个月银行流水（详版可柜台打印）\n（原始资料填写说明图链接：<https://feishu.cn/file/Ud5wboZTCoapqBxx8iRcHbJ8nVc>）\n### 快审及分期申请指引"
        },
        {
          "from": 574,
          "to": 577,
          "chapter": "§五",
          "text": "- 银行流水：近 6 个月银行流水（详版可柜台打印）\n（原始资料填写说明图链接：<https://feishu.cn/file/Ud5wboZTCoapqBxx8iRcHbJ8nVc>）\n### 快审及分期申请指引\n> 下载原图请见：https://xiaopeng.feishu.cn/drive/folder/NxC1f82VBllcg4dXUdRcYvQ0nOd"
        },
        {
          "from": 576,
          "to": 579,
          "chapter": "§五",
          "text": "（原始资料填写说明图链接：<https://feishu.cn/file/Ud5wboZTCoapqBxx8iRcHbJ8nVc>）\n### 快审及分期申请指引\n> 下载原图请见：https://xiaopeng.feishu.cn/drive/folder/NxC1f82VBllcg4dXUdRcYvQ0nOd\n**快审指引****分期申请指引****小鹏融租****中国银行****建设银行****招商银行****平安银行****中信银行****交通银行****浦发银行**"
        },
        {
          "from": 578,
          "to": 581,
          "chapter": "§五",
          "text": "### 快审及分期申请指引\n> 下载原图请见：https://xiaopeng.feishu.cn/drive/folder/NxC1f82VBllcg4dXUdRcYvQ0nOd\n**快审指引****分期申请指引****小鹏融租****中国银行****建设银行****招商银行****平安银行****中信银行****交通银行****浦发银行**\n### 快审操作指引（7 步）"
        },
        {
          "from": 582,
          "to": 590,
          "chapter": "§五",
          "text": "> 下载原图请见：https://xiaopeng.feishu.cn/drive/folder/NxC1f82VBllcg4dXUdRcYvQ0nOd\n**快审指引****分期申请指引****小鹏融租****中国银行****建设银行****招商银行****平安银行****中信银行****交通银行****浦发银行**\n### 快审操作指引（7 步）\n1. 在小鹏 APP 底部导航栏点击【服务】\n2. 点击【金融服务】入口\n3. 在金融服务页点击【快审服务】\n4. 点击\"点击这里\"开始申请（快审服务页面顶部按钮）\n5. 上传身份证影像（人像面、国徽面），按页面提示填写个人/工作/单位信息\n6. 选择机构（推荐机构如\"平安汽融 唯快不破\"），点击\"选好了，下一步\""
        },
        {
          "from": 588,
          "to": 591,
          "chapter": "§五",
          "text": "4. 点击\"点击这里\"开始申请（快审服务页面顶部按钮）\n5. 上传身份证影像（人像面、国徽面），按页面提示填写个人/工作/单位信息\n6. 选择机构（推荐机构如\"平安汽融 唯快不破\"），点击\"选好了，下一步\"\n7. 查看审批结果：系统提示\"快审审批已通过，最终审批结果请以同贷书为准\""
        },
        {
          "from": 590,
          "to": 593,
          "chapter": "§五",
          "text": "5. 上传身份证影像（人像面、国徽面），按页面提示填写个人/工作/单位信息\n6. 选择机构（推荐机构如\"平安汽融 唯快不破\"），点击\"选好了，下一步\"\n7. 查看审批结果：系统提示\"快审审批已通过，最终审批结果请以同贷书为准\"\n> 快审服务是小鹏汽车APP端的快速预审入口，可在门店看车/订车前预估审批额度。"
        },
        {
          "from": 592,
          "to": 595,
          "chapter": "§五",
          "text": "6. 选择机构（推荐机构如\"平安汽融 唯快不破\"），点击\"选好了，下一步\"\n7. 查看审批结果：系统提示\"快审审批已通过，最终审批结果请以同贷书为准\"\n> 快审服务是小鹏汽车APP端的快速预审入口，可在门店看车/订车前预估审批额度。\n### 分期申请指引（8 步）"
        },
        {
          "from": 600,
          "to": 608,
          "chapter": "§五",
          "text": "7. 查看审批结果：系统提示\"快审审批已通过，最终审批结果请以同贷书为准\"\n> 快审服务是小鹏汽车APP端的快速预审入口，可在门店看车/订车前预估审批额度。\n### 分期申请指引（8 步）\n1. 依次点击【服务】→【金融服务】\n2. 点击【分期进度】或【分期服务】\n3. 在分期进度页点击\"点击这里\"开始申请\n4. 弹窗提示\"签署个人信息授权书\"，点击【同意】\n5. 填写所有个人真实资料（姓名、证件类型/号码、有效期、手机号、驾驶证类型、单位/职业等）\n6. 弹出提示\"提交后信息将不可更改，是否确认提交\"——点击【提交】"
        },
        {
          "from": 606,
          "to": 610,
          "chapter": "§五",
          "text": "4. 弹窗提示\"签署个人信息授权书\"，点击【同意】\n5. 填写所有个人真实资料（姓名、证件类型/号码、有效期、手机号、驾驶证类型、单位/职业等）\n6. 弹出提示\"提交后信息将不可更改，是否确认提交\"——点击【提交】\n7. 确认推荐的分期机构：弹出\"XX银行将受理您的申请\"——点击【同意】\n8. 跳转到分期机构页面完成其他信息录入和文件签署（合同/电子签约/等待审批）"
        },
        {
          "from": 609,
          "to": 612,
          "chapter": "§五",
          "text": "6. 弹出提示\"提交后信息将不可更改，是否确认提交\"——点击【提交】\n7. 确认推荐的分期机构：弹出\"XX银行将受理您的申请\"——点击【同意】\n8. 跳转到分期机构页面完成其他信息录入和文件签署（合同/电子签约/等待审批）\n### 小鹏融资租赁（4 步）"
        },
        {
          "from": 617,
          "to": 623,
          "chapter": "§五",
          "text": "7. 确认推荐的分期机构：弹出\"XX银行将受理您的申请\"——点击【同意】\n8. 跳转到分期机构页面完成其他信息录入和文件签署（合同/电子签约/等待审批）\n### 小鹏融资租赁（4 步）\n1. 在分期申请进度页点击【去签署】——系统提示\"您需要先签署申请表和相关授权文件，才能进行融资租赁申请\"\n2. 跳转至 e 签宝登录页，使用【验证码登录】方式，填写动态验证码并点击【登录/注册】——跳转至文件详情\n3. 查看文件（文档1 征信授权书 / 文档2），在签名区签名后点击【提交签署】\n4. 提交成功：系统提示\"提交成功，请耐心等待审批结果\"——点击【确定】完成分期申请"
        },
        {
          "from": 622,
          "to": 625,
          "chapter": "§五",
          "text": "2. 跳转至 e 签宝登录页，使用【验证码登录】方式，填写动态验证码并点击【登录/注册】——跳转至文件详情\n3. 查看文件（文档1 征信授权书 / 文档2），在签名区签名后点击【提交签署】\n4. 提交成功：系统提示\"提交成功，请耐心等待审批结果\"——点击【确定】完成分期申请\n### 中国银行分期申请指引（5 步）"
        },
        {
          "from": 630,
          "to": 637,
          "chapter": "§五",
          "text": "3. 查看文件（文档1 征信授权书 / 文档2），在签名区签名后点击【提交签署】\n4. 提交成功：系统提示\"提交成功，请耐心等待审批结果\"——点击【确定】完成分期申请\n### 中国银行分期申请指引（5 步）\n1. 进入中国银行分期申请页：上传身份证影像（人像面/国徽面），确认个人信息并勾选\"我已阅读并同意中信银行收集本人身份证件信息用于办理个人贷款业务身份验证\"——点击【提交】\n2. 收到短信验证码后，在\"电子签\"页面填写办理人手机号中间六位数字——等待页面跳转\n3. 弹出\"人脸识别使用告知书\"，点击【同意本次授权（1S）】——完成人脸识别\n4. 跳转至\"合同清单\"页面，可查看主借款人-人脸识别使用告知书、信用卡客户个人信息查询及报送授权书、GPB1A信息授权书、消费分期信用卡激活授权书——点击【开始签署】\n5. 系统提示\"进件成功\"——分期申请提交成功（底部文案\"我行客户经理会联系您，请耐心等待\"）"
        },
        {
          "from": 636,
          "to": 639,
          "chapter": "§五",
          "text": "3. 弹出\"人脸识别使用告知书\"，点击【同意本次授权（1S）】——完成人脸识别\n4. 跳转至\"合同清单\"页面，可查看主借款人-人脸识别使用告知书、信用卡客户个人信息查询及报送授权书、GPB1A信息授权书、消费分期信用卡激活授权书——点击【开始签署】\n5. 系统提示\"进件成功\"——分期申请提交成功（底部文案\"我行客户经理会联系您，请耐心等待\"）\n### 建设银行分期申请指引（6 步）"
        },
        {
          "from": 644,
          "to": 652,
          "chapter": "§五",
          "text": "4. 跳转至\"合同清单\"页面，可查看主借款人-人脸识别使用告知书、信用卡客户个人信息查询及报送授权书、GPB1A信息授权书、消费分期信用卡激活授权书——点击【开始签署】\n5. 系统提示\"进件成功\"——分期申请提交成功（底部文案\"我行客户经理会联系您，请耐心等待\"）\n### 建设银行分期申请指引（6 步）\n1. 进入\"办理分期\"页（开始申请步骤），确认姓名、证件号码、有效期——点击【下一步】\n2. 进入\"身份核验\"步骤：阅读\"建行车生活面容采集授权协议\"——点击【确定】完成人脸识别\n3. 进入\"手机验证\"步骤：填写姓名、证件类型/号码、手机号、短信验证码——点击【下一步】\n4. 进入\"分期信息\"步骤：确认城市、车型、展厅名称、分期金额/期数、年收入——点击【下一步】\n5. 进入\"信息确认\"步骤：依次完整抄录三段文字（1.本人已阅读全部申请材料；2.充分了解并清楚知晓该信用卡分期产品的相关信息；3.愿意遵守领用协议及约定条款的各项规则）——点击【确认提交】\n6. 系统提示\"您已成功提交申请，银行处理中，请耐心等待\"——后续建设银行客户经理会主动与您电话联系"
        },
        {
          "from": 650,
          "to": 653,
          "chapter": "§五",
          "text": "4. 进入\"分期信息\"步骤：确认城市、车型、展厅名称、分期金额/期数、年收入——点击【下一步】\n5. 进入\"信息确认\"步骤：依次完整抄录三段文字（1.本人已阅读全部申请材料；2.充分了解并清楚知晓该信用卡分期产品的相关信息；3.愿意遵守领用协议及约定条款的各项规则）——点击【确认提交】\n6. 系统提示\"您已成功提交申请，银行处理中，请耐心等待\"——后续建设银行客户经理会主动与您电话联系\n### 招商银行分期申请指引（3 步）"
        },
        {
          "from": 659,
          "to": 664,
          "chapter": "§五",
          "text": "5. 进入\"信息确认\"步骤：依次完整抄录三段文字（1.本人已阅读全部申请材料；2.充分了解并清楚知晓该信用卡分期产品的相关信息；3.愿意遵守领用协议及约定条款的各项规则）——点击【确认提交】\n6. 系统提示\"您已成功提交申请，银行处理中，请耐心等待\"——后续建设银行客户经理会主动与您电话联系\n### 招商银行分期申请指引（3 步）\n1. 进入\"招行汽车分期\"页：按页面提示填写姓名、身份证号、手机号码、行业类别（非必选）、岗位、月均收入、邮箱等个人信息\n2. 在\"我要申请额度\"页（xdcc.bas.cmbchina.com 域名）继续填写工作单位、行业类别、岗位、月均收入、意向品牌/车型、意向车价、分期金额——点击【提交】\n3. 跳转至\"预审结果\"页：系统显示\"✓ 申请已受理——您的申请已受理，3分钟内将由短信通知您的申请结果，请耐心等待，谢谢\"——分期申请提交成功"
        },
        {
          "from": 663,
          "to": 666,
          "chapter": "§五",
          "text": "1. 进入\"招行汽车分期\"页：按页面提示填写姓名、身份证号、手机号码、行业类别（非必选）、岗位、月均收入、邮箱等个人信息\n2. 在\"我要申请额度\"页（xdcc.bas.cmbchina.com 域名）继续填写工作单位、行业类别、岗位、月均收入、意向品牌/车型、意向车价、分期金额——点击【提交】\n3. 跳转至\"预审结果\"页：系统显示\"✓ 申请已受理——您的申请已受理，3分钟内将由短信通知您的申请结果，请耐心等待，谢谢\"——分期申请提交成功\n### 平安银行分期申请指引（5 步）"
        },
        {
          "from": 671,
          "to": 678,
          "chapter": "§五",
          "text": "2. 在\"我要申请额度\"页（xdcc.bas.cmbchina.com 域名）继续填写工作单位、行业类别、岗位、月均收入、意向品牌/车型、意向车价、分期金额——点击【提交】\n3. 跳转至\"预审结果\"页：系统显示\"✓ 申请已受理——您的申请已受理，3分钟内将由短信通知您的申请结果，请耐心等待，谢谢\"——分期申请提交成功\n### 平安银行分期申请指引（5 步）\n1. 进入\"填写贷款信息\"页：填写车辆信息（品牌/车系/车型/贷款金额/贷款期数）+ 联系信息（上牌城市/上牌人/手机号）——确认并提交\n2. 跳转后填写验证码——点击【下一步】\n3. 跳转至\"征信授权\"页：按要求拍摄或上传身份证（人像面/国徽面），并完成人脸识别——点击【下一步，人脸识别】\n4. 跳转至\"征信授权书\"页：阅读后点击【同意授权并提交】\n5. 跳转至\"申请结果\"页：系统显示\"✓ 初审通过\"——分期申请提交成功。后续可选\"开通互联网账户/补录信息/联系客户经理\""
        },
        {
          "from": 677,
          "to": 680,
          "chapter": "§五",
          "text": "3. 跳转至\"征信授权\"页：按要求拍摄或上传身份证（人像面/国徽面），并完成人脸识别——点击【下一步，人脸识别】\n4. 跳转至\"征信授权书\"页：阅读后点击【同意授权并提交】\n5. 跳转至\"申请结果\"页：系统显示\"✓ 初审通过\"——分期申请提交成功。后续可选\"开通互联网账户/补录信息/联系客户经理\"\n### 中信银行分期申请指引（6 步）"
        },
        {
          "from": 685,
          "to": 693,
          "chapter": "§五",
          "text": "4. 跳转至\"征信授权书\"页：阅读后点击【同意授权并提交】\n5. 跳转至\"申请结果\"页：系统显示\"✓ 初审通过\"——分期申请提交成功。后续可选\"开通互联网账户/补录信息/联系客户经理\"\n### 中信银行分期申请指引（6 步）\n1. 进入\"中信银行\"界面的\"身份信息核验\"页：上传身份证人像面照片、上传身份证国徽面照片，勾选\"我并同意中信银行收集本人身份证件信息用于办理个人业务身份验证\"——确认提交\n2. 跳转至第二屏：完成手机号码验证（杨*立 身份证号 44****220977），输入短信验证码 315563（系统已发送至 186****9399，180秒内输入）——勾选同意——点击【下一步】\n3. 跳转至\"信息填写\"页：核对姓名、证件号码、证件类型、手机号、婚姻状况、居住情况、居住地址、职业、单位名称、本人年收入、意向购车金额、意向贷款金额、首付比例等——确认个人信息\n4. 在\"信息填写\"页第二屏：确认分期信息（意向购车金额 119800.00、意向贷款金额 81464.00、首付比例 32%、意向购车品牌 小鹏汽车（直连）、意向贷款期限 24、意向购车城市 广东省-广州市等）——点击【提交】\n5. 跳转至\"人脸识别\"页：按提示完成人脸识别（平视避免遮挡/避免环境强光/请勿多人同框）——点击【开启检测】\n6. 跳转至\"预审结果\"页：系统提示\"贷款申请处理中，您的贷款申请处理中，请耐心等候\"——分期申请提交成功"
        },
        {
          "from": 691,
          "to": 694,
          "chapter": "§五",
          "text": "4. 在\"信息填写\"页第二屏：确认分期信息（意向购车金额 119800.00、意向贷款金额 81464.00、首付比例 32%、意向购车品牌 小鹏汽车（直连）、意向贷款期限 24、意向购车城市 广东省-广州市等）——点击【提交】\n5. 跳转至\"人脸识别\"页：按提示完成人脸识别（平视避免遮挡/避免环境强光/请勿多人同框）——点击【开启检测】\n6. 跳转至\"预审结果\"页：系统提示\"贷款申请处理中，您的贷款申请处理中，请耐心等候\"——分期申请提交成功\n### 交通银行分期申请指引（9 步）"
        },
        {
          "from": 700,
          "to": 708,
          "chapter": "§五",
          "text": "5. 跳转至\"人脸识别\"页：按提示完成人脸识别（平视避免遮挡/避免环境强光/请勿多人同框）——点击【开启检测】\n6. 跳转至\"预审结果\"页：系统提示\"贷款申请处理中，您的贷款申请处理中，请耐心等候\"——分期申请提交成功\n### 交通银行分期申请指引（9 步）\n1. 在\"交行车贷\"首页点击【立即申请】（产品说明：利率低可享门店贴息政策 / 最长5年 / 申请仅需身份证）\n2. 进入\"申请首页默认字段\"页：填写申请人姓名（输入生僻字）、证件号码、申请人手机号、短信验证码（6位数字验证码 获取验证码）、推荐人（选填），勾选\"我已阅读《交通银行个人汽车场景贷款个人信息处理授权书》\"——点击【下一步】\n3. 跳转至\"信息完善\"页：依次完成 身份证认证 / 影像采集 / 信息录入 / 贷款信息 四项（每项未完成都有红标\"未完成\"）——勾选三份授权书——依次完成信息提交\n4. 进入\"录入要求\"页：人脸识别——完成人脸识别（光线充足/边框完整/拍摄动作）——点击【进入人脸识别认证】完成认证\n5. 跳转至\"身份证影像信息\"页：上传身份证人像面+国徽面，按拍摄要求（标准样式/边框缺失/照片模糊/闪光强烈）上传后——点击【提交】\n6. 进入\"用途信息\"页：确认购车城市、购车门店、交付城市、交付中心、汽车品牌、车系、购车价格（万元）等"
        },
        {
          "from": 706,
          "to": 711,
          "chapter": "§五",
          "text": "4. 进入\"录入要求\"页：人脸识别——完成人脸识别（光线充足/边框完整/拍摄动作）——点击【进入人脸识别认证】完成认证\n5. 跳转至\"身份证影像信息\"页：上传身份证人像面+国徽面，按拍摄要求（标准样式/边框缺失/照片模糊/闪光强烈）上传后——点击【提交】\n6. 进入\"用途信息\"页：确认购车城市、购车门店、交付城市、交付中心、汽车品牌、车系、购车价格（万元）等\n7. 进入\"贷款信息\"页：确认期望贷款金额 200000、还款方式 等本勾息、贷款期限 60、年利率（单利，%）4.92、担保方式 信用/抵押、还款计划 2025.11.30月还 3750.17——点击【下一步】\n8. 提交分期申请：弹出\"完成以下信息即可提交额度申请\"——勾选三份授权书——点击【立即提交】\n9. 跳转至\"贷款申请已完成\"页：系统提示\"✓ 贷款申请已完成——尊敬的客户，您的申请已提交，客服人员将在3个工作日内与您联系，请保持电话畅通\"——分期申请提交成功"
        },
        {
          "from": 710,
          "to": 713,
          "chapter": "§五",
          "text": "7. 进入\"贷款信息\"页：确认期望贷款金额 200000、还款方式 等本勾息、贷款期限 60、年利率（单利，%）4.92、担保方式 信用/抵押、还款计划 2025.11.30月还 3750.17——点击【下一步】\n8. 提交分期申请：弹出\"完成以下信息即可提交额度申请\"——勾选三份授权书——点击【立即提交】\n9. 跳转至\"贷款申请已完成\"页：系统提示\"✓ 贷款申请已完成——尊敬的客户，您的申请已提交，客服人员将在3个工作日内与您联系，请保持电话畅通\"——分期申请提交成功\n### 浦发银行操作指引（8 步）"
        },
        {
          "from": 718,
          "to": 726,
          "chapter": "§五",
          "text": "8. 提交分期申请：弹出\"完成以下信息即可提交额度申请\"——勾选三份授权书——点击【立即提交】\n9. 跳转至\"贷款申请已完成\"页：系统提示\"✓ 贷款申请已完成——尊敬的客户，您的申请已提交，客服人员将在3个工作日内与您联系，请保持电话畅通\"——分期申请提交成功\n### 浦发银行操作指引（8 步）\n1. 进入\"浦发银行-i车贷-小鹏\"首页（最长期限7年，最高额度100万）——点击【申请及查询】（提示：浦发银行账户包括我行一类及二类账户，不含信用卡账户）\n2. 进入\"身份证信息录入\"页：上传身份证信息面、上传身份证国徽面——参考拍摄实例——点击【下一步】（以上信息仅用于身份验证，您的信息将进行严格保密）\n3. 完成人脸识别——系统提示\"✓ 人脸识别已通过\"\n4. 跳转至\"订单信息确认\"页：核对客户姓名、身份证号、手机号（可改）、客户月收入（可改）等——点击【提交】\n5. 跳转至\"协议签订\"页：勾选所有协议项（本人已认真阅读并同意以下协议内容/客户须知/个人授权书（适用于零售信贷线上业务个人信息授权）/个人授权书_授权个人信息的查询、收集、存储和使用，授权信息范围/个人授权书_授权个人信息的对外提供/个人互联网贷款使用说明书/个人征信授权书/反欺诈风险提示/个人信息单独同意授权书/贷款申请确认书/个人信用信息基础数据库/授权信息提供）——点击【确认】\n6. 跳转至\"预审结果\"页：系统提示\"✓ 预审通过——审批参考额度 151,900.00元——最终额度以正式审批结果为准\"——点击【下一步】或【联系客户经理】"
        },
        {
          "from": 724,
          "to": 728,
          "chapter": "§五",
          "text": "4. 跳转至\"订单信息确认\"页：核对客户姓名、身份证号、手机号（可改）、客户月收入（可改）等——点击【提交】\n5. 跳转至\"协议签订\"页：勾选所有协议项（本人已认真阅读并同意以下协议内容/客户须知/个人授权书（适用于零售信贷线上业务个人信息授权）/个人授权书_授权个人信息的查询、收集、存储和使用，授权信息范围/个人授权书_授权个人信息的对外提供/个人互联网贷款使用说明书/个人征信授权书/反欺诈风险提示/个人信息单独同意授权书/贷款申请确认书/个人信用信息基础数据库/授权信息提供）——点击【确认】\n6. 跳转至\"预审结果\"页：系统提示\"✓ 预审通过——审批参考额度 151,900.00元——最终额度以正式审批结果为准\"——点击【下一步】或【联系客户经理】\n7. 跳转至\"正式申请信息\"页：确认与本人关系（夫妻）、上牌城市（可改）、贷款金额/期数（151,900.00元/60期）、首付比例 15%、首付金额 26,900.00元等——点击【提交】\n8. 跳转至\"正式申请结果\"页：系统提示\"申请已提交，待客户经理确认\"——分期申请提交成功"
        },
        {
          "from": 727,
          "to": 730,
          "chapter": "§五",
          "text": "6. 跳转至\"预审结果\"页：系统提示\"✓ 预审通过——审批参考额度 151,900.00元——最终额度以正式审批结果为准\"——点击【下一步】或【联系客户经理】\n7. 跳转至\"正式申请信息\"页：确认与本人关系（夫妻）、上牌城市（可改）、贷款金额/期数（151,900.00元/60期）、首付比例 15%、首付金额 26,900.00元等——点击【提交】\n8. 跳转至\"正式申请结果\"页：系统提示\"申请已提交，待客户经理确认\"——分期申请提交成功\n## 六，客户刚需标签"
        },
        {
          "from": 733,
          "to": 739,
          "chapter": "§五",
          "text": "7. 跳转至\"正式申请信息\"页：确认与本人关系（夫妻）、上牌城市（可改）、贷款金额/期数（151,900.00元/60期）、首付比例 15%、首付金额 26,900.00元等——点击【提交】\n8. 跳转至\"正式申请结果\"页：系统提示\"申请已提交，待客户经理确认\"——分期申请提交成功\n## 六，客户刚需标签\n> 🪄 **提示**\n>\n> 请通过选择“客户刚需标签”，满足客户的个性化金融需求\n> **提升客户金融体验、减少人工指定分期机构**"
        },
        {
          "from": 739,
          "to": 742,
          "chapter": "§六",
          "text": ">\n> 请通过选择“客户刚需标签”，满足客户的个性化金融需求\n> **提升客户金融体验、减少人工指定分期机构**\n### 客户刚需标签 → 可支持机构 / 地区对照表"
        },
        {
          "from": 744,
          "to": 747,
          "chapter": "§六",
          "text": "> 请通过选择“客户刚需标签”，满足客户的个性化金融需求\n> **提升客户金融体验、减少人工指定分期机构**\n### 客户刚需标签 → 可支持机构 / 地区对照表\n> 5 大刚需标签 + AFL产品标签 + 9 家合作机构 + 可支持省份/城市"
        },
        {
          "from": 746,
          "to": 749,
          "chapter": "§六",
          "text": "> **提升客户金融体验、减少人工指定分期机构**\n### 客户刚需标签 → 可支持机构 / 地区对照表\n> 5 大刚需标签 + AFL产品标签 + 9 家合作机构 + 可支持省份/城市\n**标签 1：客户有提前还款需求（AFL：等本等息）**"
        },
        {
          "from": 748,
          "to": 756,
          "chapter": "§六",
          "text": "### 客户刚需标签 → 可支持机构 / 地区对照表\n> 5 大刚需标签 + AFL产品标签 + 9 家合作机构 + 可支持省份/城市\n**标签 1：客户有提前还款需求（AFL：等本等息）**\n| 可支持机构 (RDM) | 可支持地区（单位/省份） | 可支持地区（单位/城市） |\n| --- | --- | --- |\n| 建行 | 除云南省、福建省外 | — |\n| 交行 | 所有省份 | — |\n| 招行 | 除河北省（不含廊坊市）、上海市、云南省、贵州省、四川省外 | 除湖州市、嘉兴市、金华市外 |\n| 中行 | 所有省份 | — |"
        },
        {
          "from": 754,
          "to": 758,
          "chapter": "§六",
          "text": "| 交行 | 所有省份 | — |\n| 招行 | 除河北省（不含廊坊市）、上海市、云南省、贵州省、四川省外 | 除湖州市、嘉兴市、金华市外 |\n| 中行 | 所有省份 | — |\n| 浦发 | 试点城市 | — |\n| 融租、中信、平安（0息产品） | 所有省份 | — |"
        },
        {
          "from": 757,
          "to": 760,
          "chapter": "§六",
          "text": "| 中行 | 所有省份 | — |\n| 浦发 | 试点城市 | — |\n| 融租、中信、平安（0息产品） | 所有省份 | — |\n**标签 2：客户征信瑕疵（AFL：客户征信瑕疵）**"
        },
        {
          "from": 759,
          "to": 765,
          "chapter": "§六",
          "text": "| 浦发 | 试点城市 | — |\n| 融租、中信、平安（0息产品） | 所有省份 | — |\n**标签 2：客户征信瑕疵（AFL：客户征信瑕疵）**\n| 可支持机构 (RDM) | 可支持地区（单位/省份） |\n| --- | --- |\n| 平安银行 | 福建省、黑龙江省、吉林省、辽宁省 |\n| 小鹏融租 | 所有省份 |"
        },
        {
          "from": 764,
          "to": 767,
          "chapter": "§六",
          "text": "| --- | --- |\n| 平安银行 | 福建省、黑龙江省、吉林省、辽宁省 |\n| 小鹏融租 | 所有省份 |\n**标签 3：客户要求免抵押（AFL：支持免抵押）**"
        },
        {
          "from": 766,
          "to": 774,
          "chapter": "§六",
          "text": "| 平安银行 | 福建省、黑龙江省、吉林省、辽宁省 |\n| 小鹏融租 | 所有省份 |\n**标签 3：客户要求免抵押（AFL：支持免抵押）**\n| 可支持机构 (RDM) | 可支持地区（单位/省份） | 可支持地区（单位/城市） |\n| --- | --- | --- |\n| 中信 | 所有省份 | — |\n| 民生 | 除云南省、贵州省、河北省外 | 除上海市、杭州市外 |\n| 交行 | 所有省份 | — |\n| 中行 | 陕西省 | 上海市、北京市、深圳市、南通市、镇江市、天津市、湖州市、嘉兴市、杭州市、台州市、宁波市、合肥市 |"
        },
        {
          "from": 772,
          "to": 777,
          "chapter": "§六",
          "text": "| 民生 | 除云南省、贵州省、河北省外 | 除上海市、杭州市外 |\n| 交行 | 所有省份 | — |\n| 中行 | 陕西省 | 上海市、北京市、深圳市、南通市、镇江市、天津市、湖州市、嘉兴市、杭州市、台州市、宁波市、合肥市 |\n| 平安 | 福建省、辽宁省、山西省、山东省 | 深圳市、佛山市、常州市、扬州市、徐州市、北京市、温州市、丽水市、衢州市、绍兴市、金华市 |\n| 建行 | 广东省、海南省、四川省、广西省、江西省 | 上海市、北京市、天津市、无锡市、西安市 |\n| 招行 | 山东省 | 北京市、廊坊市、无锡市、天津市、温州市、绍兴市、舟山市、衢州市 |"
        },
        {
          "from": 776,
          "to": 779,
          "chapter": "§六",
          "text": "| 平安 | 福建省、辽宁省、山西省、山东省 | 深圳市、佛山市、常州市、扬州市、徐州市、北京市、温州市、丽水市、衢州市、绍兴市、金华市 |\n| 建行 | 广东省、海南省、四川省、广西省、江西省 | 上海市、北京市、天津市、无锡市、西安市 |\n| 招行 | 山东省 | 北京市、廊坊市、无锡市、天津市、温州市、绍兴市、舟山市、衢州市 |\n**标签 4：申请人非上牌人（AFL：主贷分离）**"
        },
        {
          "from": 778,
          "to": 786,
          "chapter": "§六",
          "text": "| 建行 | 广东省、海南省、四川省、广西省、江西省 | 上海市、北京市、天津市、无锡市、西安市 |\n| 招行 | 山东省 | 北京市、廊坊市、无锡市、天津市、温州市、绍兴市、舟山市、衢州市 |\n**标签 4：申请人非上牌人（AFL：主贷分离）**\n| 可支持机构 (RDM) | 可支持地区（单位/省份） | 可支持地区（单位/城市） |\n| --- | --- | --- |\n| 招行 | 除吉林省、辽宁省外 | 除广州市、天津市外 |\n| 建行 | 吉林省、辽宁省 | 广州市、河源市、梅州市、汕头市、揭阳市、潮州市、汕尾市、天津市、青岛市、东莞市、天津市 |\n| 平安 | 福建省 | 北京市 |\n| 中行 | — | 广州市、揭阳市、潮州市、汕尾市、宁波市、深圳市 |"
        },
        {
          "from": 784,
          "to": 787,
          "chapter": "§六",
          "text": "| 建行 | 吉林省、辽宁省 | 广州市、河源市、梅州市、汕头市、揭阳市、潮州市、汕尾市、天津市、青岛市、东莞市、天津市 |\n| 平安 | 福建省 | 北京市 |\n| 中行 | — | 广州市、揭阳市、潮州市、汕尾市、宁波市、深圳市 |\n| 浦发 | — | 除合肥市外 |"
        },
        {
          "from": 786,
          "to": 789,
          "chapter": "§六",
          "text": "| 平安 | 福建省 | 北京市 |\n| 中行 | — | 广州市、揭阳市、潮州市、汕尾市、宁波市、深圳市 |\n| 浦发 | — | 除合肥市外 |\n> 备注：此表内的 5 大刚需标签包括「客户有提前还款需求」「客户征信瑕疵」「客户要求免抵押」「申请人非上牌人」「客户为合理避税」等；本图为其中 4 大标签完整提取。\"客户为合理避税\"等其他刚需标签请见原始文档或联系金融同学。"
        },
        {
          "from": 788,
          "to": 791,
          "chapter": "§六",
          "text": "| 中行 | — | 广州市、揭阳市、潮州市、汕尾市、宁波市、深圳市 |\n| 浦发 | — | 除合肥市外 |\n> 备注：此表内的 5 大刚需标签包括「客户有提前还款需求」「客户征信瑕疵」「客户要求免抵押」「申请人非上牌人」「客户为合理避税」等；本图为其中 4 大标签完整提取。\"客户为合理避税\"等其他刚需标签请见原始文档或联系金融同学。\n## 七，小鹏融租指引工具"
        },
        {
          "from": 794,
          "to": 797,
          "chapter": "§六",
          "text": "| 浦发 | — | 除合肥市外 |\n> 备注：此表内的 5 大刚需标签包括「客户有提前还款需求」「客户征信瑕疵」「客户要求免抵押」「申请人非上牌人」「客户为合理避税」等；本图为其中 4 大标签完整提取。\"客户为合理避税\"等其他刚需标签请见原始文档或联系金融同学。\n## 七，小鹏融租指引工具\n**APP申请指引****公司牌提交指引****客户APP修改金融方案****绑卡指引****自营绑卡二维码****查询还款明细****对公转账查询账号****换绑卡指引****提前还款****查询/借阅登记证****查看电子合同****解押指引**"
        },
        {
          "from": 796,
          "to": 799,
          "chapter": "§七",
          "text": "> 备注：此表内的 5 大刚需标签包括「客户有提前还款需求」「客户征信瑕疵」「客户要求免抵押」「申请人非上牌人」「客户为合理避税」等；本图为其中 4 大标签完整提取。\"客户为合理避税\"等其他刚需标签请见原始文档或联系金融同学。\n## 七，小鹏融租指引工具\n**APP申请指引****公司牌提交指引****客户APP修改金融方案****绑卡指引****自营绑卡二维码****查询还款明细****对公转账查询账号****换绑卡指引****提前还款****查询/借阅登记证****查看电子合同****解押指引**\n## 八，征信下载"
        },
        {
          "from": 798,
          "to": 806,
          "chapter": "§七",
          "text": "## 七，小鹏融租指引工具\n**APP申请指引****公司牌提交指引****客户APP修改金融方案****绑卡指引****自营绑卡二维码****查询还款明细****对公转账查询账号****换绑卡指引****提前还款****查询/借阅登记证****查看电子合同****解押指引**\n## 八，征信下载\n> 💡 **提示**\n>\n> **简版征信：**\n> 手机银行APP在搜索栏输入“个人征信查询”，点击申请，输入邮箱号，24小时内收到报告。\n> (包含工商银行、中国银行、建设银行、交通银行、中信银行、光大银行、招商银行、广发银行、平安银行、浦发银行 民生银行、农业银行、邮储银行)。\n> **详版征信：**"
        },
        {
          "from": 805,
          "to": 808,
          "chapter": "§八",
          "text": "> 手机银行APP在搜索栏输入“个人征信查询”，点击申请，输入邮箱号，24小时内收到报告。\n> (包含工商银行、中国银行、建设银行、交通银行、中信银行、光大银行、招商银行、广发银行、平安银行、浦发银行 民生银行、农业银行、邮储银行)。\n> **详版征信：**\n> 客户本人携带身份证去银行柜台打印。"
        },
        {
          "from": 807,
          "to": 810,
          "chapter": "§八",
          "text": "> (包含工商银行、中国银行、建设银行、交通银行、中信银行、光大银行、招商银行、广发银行、平安银行、浦发银行 民生银行、农业银行、邮储银行)。\n> **详版征信：**\n> 客户本人携带身份证去银行柜台打印。\n## 九，电子流水下载"
        },
        {
          "from": 810,
          "to": 818,
          "chapter": "§八",
          "text": "> **详版征信：**\n> 客户本人携带身份证去银行柜台打印。\n## 九，电子流水下载\n> 💡 **提示**\n>\n> **银行流水下载流程：**\n> https://mp.weixin.qq.com/s/GNBC1Nmj_5cxHmAqjoZO-A\n> **支付宝流水下载流程：**\n> 我的-总资产-更多服务（右上角）-资产证明-余额资产和流水证明-输入邮箱-点击发送。"
        },
        {
          "from": 817,
          "to": 821,
          "chapter": "§九",
          "text": "> https://mp.weixin.qq.com/s/GNBC1Nmj_5cxHmAqjoZO-A\n> **支付宝流水下载流程：**\n> 我的-总资产-更多服务（右上角）-资产证明-余额资产和流水证明-输入邮箱-点击发送。\n> **微信流水下载流程：**\n> 我-支付-钱包-账单—常见问题—下载 账单—选择用做证明材料。"
        },
        {
          "from": 820,
          "to": 823,
          "chapter": "§九",
          "text": "> 我的-总资产-更多服务（右上角）-资产证明-余额资产和流水证明-输入邮箱-点击发送。\n> **微信流水下载流程：**\n> 我-支付-钱包-账单—常见问题—下载 账单—选择用做证明材料。\n### 电子流水下载流程（14 家银行）"
        },
        {
          "from": 825,
          "to": 828,
          "chapter": "§九",
          "text": "> **微信流水下载流程：**\n> 我-支付-钱包-账单—常见问题—下载 账单—选择用做证明材料。\n### 电子流水下载流程（14 家银行）\n> 常见银行电子流水下载流程参考"
        },
        {
          "from": 827,
          "to": 835,
          "chapter": "§九",
          "text": "> 我-支付-钱包-账单—常见问题—下载 账单—选择用做证明材料。\n### 电子流水下载流程（14 家银行）\n> 常见银行电子流水下载流程参考\n| 银行 | 下载步骤（简述） |\n| --- | --- |\n| 工商银行 | 我的账户 → 右上角更多 → 历史明细打印 → 选择时间 → 显示对方账号及户名选\"是\" → 申请成功后选择\"我的办理进度 - 已完成\" → 在业务办理记录的订单详情中查看文件密码 |\n| 农业银行 | （详见银行 APP 指引） |\n| 建设银行 | （详见银行 APP 指引） |\n| 中国银行 | （详见银行 APP 指引） |"
        },
        {
          "from": 833,
          "to": 841,
          "chapter": "§九",
          "text": "| 农业银行 | （详见银行 APP 指引） |\n| 建设银行 | （详见银行 APP 指引） |\n| 中国银行 | （详见银行 APP 指引） |\n| 交通银行 | （详见银行 APP 指引） |\n| 招商银行 | （详见银行 APP 指引） |\n| 浦发银行 | （详见银行 APP 指引） |\n| 中信银行 | （详见银行 APP 指引） |\n| 民生银行 | （详见银行 APP 指引） |\n| 光大银行 | （详见银行 APP 指引） |"
        },
        {
          "from": 839,
          "to": 845,
          "chapter": "§九",
          "text": "| 中信银行 | （详见银行 APP 指引） |\n| 民生银行 | （详见银行 APP 指引） |\n| 光大银行 | （详见银行 APP 指引） |\n| 平安银行 | （详见银行 APP 指引） |\n| 广发银行 | （详见银行 APP 指引） |\n| 邮储银行 | （详见银行 APP 指引） |\n| 兴业银行 | （详见银行 APP 指引） |"
        },
        {
          "from": 844,
          "to": 847,
          "chapter": "§九",
          "text": "| 广发银行 | （详见银行 APP 指引） |\n| 邮储银行 | （详见银行 APP 指引） |\n| 兴业银行 | （详见银行 APP 指引） |\n**支付宝流水下载流程：** 我的 → 总资产 → 更多服务（右上角）→ 资产证明 → 余额资产和流水证明 → 输入邮箱 → 点击发送"
        },
        {
          "from": 846,
          "to": 849,
          "chapter": "§九",
          "text": "| 邮储银行 | （详见银行 APP 指引） |\n| 兴业银行 | （详见银行 APP 指引） |\n**支付宝流水下载流程：** 我的 → 总资产 → 更多服务（右上角）→ 资产证明 → 余额资产和流水证明 → 输入邮箱 → 点击发送\n**微信流水下载流程：** 我 → 支付 → 钱包 → 账单 → 常见问题 → 下载账单 → 选择用做证明材料"
        },
        {
          "from": 848,
          "to": 851,
          "chapter": "§九",
          "text": "| 兴业银行 | （详见银行 APP 指引） |\n**支付宝流水下载流程：** 我的 → 总资产 → 更多服务（右上角）→ 资产证明 → 余额资产和流水证明 → 输入邮箱 → 点击发送\n**微信流水下载流程：** 我 → 支付 → 钱包 → 账单 → 常见问题 → 下载账单 → 选择用做证明材料\n> 银行流水下载流程汇总链接：<https://mp.weixin.qq.com/s/GNBC1Nmj_5cxHmAqjoZO-A>"
        },
        {
          "from": 850,
          "to": 853,
          "chapter": "§九",
          "text": "**支付宝流水下载流程：** 我的 → 总资产 → 更多服务（右上角）→ 资产证明 → 余额资产和流水证明 → 输入邮箱 → 点击发送\n**微信流水下载流程：** 我 → 支付 → 钱包 → 账单 → 常见问题 → 下载账单 → 选择用做证明材料\n> 银行流水下载流程汇总链接：<https://mp.weixin.qq.com/s/GNBC1Nmj_5cxHmAqjoZO-A>\n（原始电子流水下载流程图表链接：<https://feishu.cn/file/XMgCbL0xQoAYsJxAVHMcvrX1n6g>）"
        },
        {
          "from": 852,
          "to": 855,
          "chapter": "§九",
          "text": "**微信流水下载流程：** 我 → 支付 → 钱包 → 账单 → 常见问题 → 下载账单 → 选择用做证明材料\n> 银行流水下载流程汇总链接：<https://mp.weixin.qq.com/s/GNBC1Nmj_5cxHmAqjoZO-A>\n（原始电子流水下载流程图表链接：<https://feishu.cn/file/XMgCbL0xQoAYsJxAVHMcvrX1n6g>）\n## 十，营运车分期产品"
        },
        {
          "from": 858,
          "to": 861,
          "chapter": "§九",
          "text": "> 银行流水下载流程汇总链接：<https://mp.weixin.qq.com/s/GNBC1Nmj_5cxHmAqjoZO-A>\n（原始电子流水下载流程图表链接：<https://feishu.cn/file/XMgCbL0xQoAYsJxAVHMcvrX1n6g>）\n## 十，营运车分期产品\n### 营运车分期产品总表（2026 年版）"
        },
        {
          "from": 863,
          "to": 866,
          "chapter": "§十",
          "text": "（原始电子流水下载流程图表链接：<https://feishu.cn/file/XMgCbL0xQoAYsJxAVHMcvrX1n6g>）\n## 十，营运车分期产品\n### 营运车分期产品总表（2026 年版）\n> 3 家合作机构营运车产品对照：易鑫 / 华夏东亚 / 平安租赁"
        },
        {
          "from": 865,
          "to": 873,
          "chapter": "§十",
          "text": "## 十，营运车分期产品\n### 营运车分期产品总表（2026 年版）\n> 3 家合作机构营运车产品对照：易鑫 / 华夏东亚 / 平安租赁\n| 营运车产品合作机构 | 易鑫 | 华夏东亚 | 平安租赁 |\n| --- | --- | --- | --- |\n| 产品类型 | 贴息产品 | 贴息产品 + 非贴息产品（两种均可承接） | 非贴息产品 |\n| 年费率 | 贴息：1.10%~2.20%（详见下方\"贴息费率明细\"） | 贴息：1.10%~2.20%（详见下方\"贴息费率明细\"）；非贴息：2.99% | 4.50% |\n| 最低首付比例 | 5%起 | 25%起 | 10%起 |\n| 产品期限 | 36期 / 60期 | 贴息：36期 / 60期；非贴息：12-60期 | 12-60期 |"
        },
        {
          "from": 871,
          "to": 879,
          "chapter": "§十",
          "text": "| 年费率 | 贴息：1.10%~2.20%（详见下方\"贴息费率明细\"） | 贴息：1.10%~2.20%（详见下方\"贴息费率明细\"）；非贴息：2.99% | 4.50% |\n| 最低首付比例 | 5%起 | 25%起 | 10%起 |\n| 产品期限 | 36期 / 60期 | 贴息：36期 / 60期；非贴息：12-60期 | 12-60期 |\n| 适用客户 | 个人 | 个人 / 公司 | 个人 |\n| 展业范围 | 全国 | 全国 | 部分城市政策禁入（具体查看清单） |\n| 准入要求 | 驾驶证、人证（网络预约出租汽车驾驶员证） | 驾驶证、人证 | 驾驶证、人证 |\n| 是否抵押 | 抵押 | 抵押 | 抵押 |\n| 还款方式 | 等额本息 | 等额本息 | 等额本息 |\n| 提前还款政策 | 根据具体承接资方要求 | 个人：归还剩余本金；6个月内提还违约金5%；6~12个月提还违约金3%；满1年后提还无需违约金。企业购车：无提还违约金 | 归还剩余本金；结清手续费按剩余本金的：12期内（含）8%；24期内（含）6%；36期内（含）2%；48期内（含）2%；60期内（含）2% |"
        },
        {
          "from": 877,
          "to": 880,
          "chapter": "§十",
          "text": "| 是否抵押 | 抵押 | 抵押 | 抵押 |\n| 还款方式 | 等额本息 | 等额本息 | 等额本息 |\n| 提前还款政策 | 根据具体承接资方要求 | 个人：归还剩余本金；6个月内提还违约金5%；6~12个月提还违约金3%；满1年后提还无需违约金。企业购车：无提还违约金 | 归还剩余本金；结清手续费按剩余本金的：12期内（含）8%；24期内（含）6%；36期内（含）2%；48期内（含）2%；60期内（含）2% |\n**贴息费率明细（适用：易鑫 / 华夏东亚 — 两家费率一致）**"
        },
        {
          "from": 880,
          "to": 886,
          "chapter": "§十",
          "text": "| 还款方式 | 等额本息 | 等额本息 | 等额本息 |\n| 提前还款政策 | 根据具体承接资方要求 | 个人：归还剩余本金；6个月内提还违约金5%；6~12个月提还违约金3%；满1年后提还无需违约金。企业购车：无提还违约金 | 归还剩余本金；结清手续费按剩余本金的：12期内（含）8%；24期内（含）6%；36期内（含）2%；48期内（含）2%；60期内（含）2% |\n**贴息费率明细（适用：易鑫 / 华夏东亚 — 两家费率一致）**\n| 适用车型 | 36期年费率 | 60期年费率 |\n| --- | --- | --- |\n| 2025款P7+、P7、2025款G7、2025款G6、2025款G9、2025款X9、2026款X9 | 1.10% | 1.80% |\n| L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 1.70% | 2.20% |"
        },
        {
          "from": 885,
          "to": 888,
          "chapter": "§十",
          "text": "| --- | --- | --- |\n| 2025款P7+、P7、2025款G7、2025款G6、2025款G9、2025款X9、2026款X9 | 1.10% | 1.80% |\n| L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 1.70% | 2.20% |\n> 贴息产品名称：【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚"
        },
        {
          "from": 887,
          "to": 890,
          "chapter": "§十",
          "text": "| 2025款P7+、P7、2025款G7、2025款G6、2025款G9、2025款X9、2026款X9 | 1.10% | 1.80% |\n| L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 1.70% | 2.20% |\n> 贴息产品名称：【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚\n**公司购买营运车辆 — 申请材料（适用：华夏东亚 营运公户业务）**"
        },
        {
          "from": 889,
          "to": 897,
          "chapter": "§十",
          "text": "| L03、GX、2026款P7+、2026款G7、2026款G6、2026款G9、2025&2026款M03 | 1.70% | 2.20% |\n> 贴息产品名称：【2512】二类机构产品-贴息产品-回租-平安租赁/易鑫/华夏东亚\n**公司购买营运车辆 — 申请材料（适用：华夏东亚 营运公户业务）**\n1. 营业执照\n2. 法人代表及担保人等身份材料\n3. 财务报表（利润表和资产负债表，盖公章），近两年（或经营年限）\n4. 公司及担保人银行流水，近六个月\n5. 验资报告或注资凭证\n6. 其他：根据客户资质要求补充的其他材料，例如："
        },
        {
          "from": 895,
          "to": 900,
          "chapter": "§十",
          "text": "4. 公司及担保人银行流水，近六个月\n5. 验资报告或注资凭证\n6. 其他：根据客户资质要求补充的其他材料，例如：\n- 合作的正规网约车平台的合作协议 / 交易系统流水 / 平台证等\n- 公司已有车辆的相关产证、车证等证明材料\n- 公司汽车租赁经营许可证等证明材料"
        },
        {
          "from": 899,
          "to": 902,
          "chapter": "§十",
          "text": "- 合作的正规网约车平台的合作协议 / 交易系统流水 / 平台证等\n- 公司已有车辆的相关产证、车证等证明材料\n- 公司汽车租赁经营许可证等证明材料\n> （具体资料视客户和合作平台资质而定）"
        },
        {
          "from": 901,
          "to": 904,
          "chapter": "§十",
          "text": "- 公司已有车辆的相关产证、车证等证明材料\n- 公司汽车租赁经营许可证等证明材料\n> （具体资料视客户和合作平台资质而定）\n## 十一，港澳台/外籍客户指引"
        },
        {
          "from": 907,
          "to": 910,
          "chapter": "§十",
          "text": "- 公司汽车租赁经营许可证等证明材料\n> （具体资料视客户和合作平台资质而定）\n## 十一，港澳台/外籍客户指引\n> 2026年4月13日更新：删除费率描述、小鹏融租的年龄要求更新至73周岁、删除小鹏融租对征信资料的要求。"
        },
        {
          "from": 909,
          "to": 912,
          "chapter": "§十一",
          "text": "> （具体资料视客户和合作平台资质而定）\n## 十一，港澳台/外籍客户指引\n> 2026年4月13日更新：删除费率描述、小鹏融租的年龄要求更新至73周岁、删除小鹏融租对征信资料的要求。\n### 港澳台/外籍客户指引"
        },
        {
          "from": 914,
          "to": 917,
          "chapter": "§十一",
          "text": "## 十一，港澳台/外籍客户指引\n> 2026年4月13日更新：删除费率描述、小鹏融租的年龄要求更新至73周岁、删除小鹏融租对征信资料的要求。\n### 港澳台/外籍客户指引\n> 2026 年 4 月 13 日更新：删除费率描述、小鹏融租的年龄要求更新至 73 周岁、删除小鹏融租对征信资料的要求。"
        },
        {
          "from": 916,
          "to": 919,
          "chapter": "§十一",
          "text": "> 2026年4月13日更新：删除费率描述、小鹏融租的年龄要求更新至73周岁、删除小鹏融租对征信资料的要求。\n### 港澳台/外籍客户指引\n> 2026 年 4 月 13 日更新：删除费率描述、小鹏融租的年龄要求更新至 73 周岁、删除小鹏融租对征信资料的要求。\n**3 大合作机构对照：小鹏金融 / 平安银行 / 中国银行**"
        },
        {
          "from": 918,
          "to": 925,
          "chapter": "§十一",
          "text": "### 港澳台/外籍客户指引\n> 2026 年 4 月 13 日更新：删除费率描述、小鹏融租的年龄要求更新至 73 周岁、删除小鹏融租对征信资料的要求。\n**3 大合作机构对照：小鹏金融 / 平安银行 / 中国银行**\n| 机构 | 首付比例 | 服务机构 | 年龄要求 | 还款方式 | 申请/续贷流程 |\n| --- | --- | --- | --- | --- | --- |\n| 小鹏金融 | 10%起 | 小鹏融租 | 年满18周岁，最高年龄+分期期限不超过73周岁（年龄+分期期限超过68周岁需添加直系亲属作为共申） | 等额本息 | 需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件 |\n| 平安银行 | 15%起 | 平安银行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 | 等额本息 | 需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件 |\n| 中国银行 | 15%起 | 中国银行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 | 等额本息 / 等本等息（需线下面签） | 需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件 |"
        },
        {
          "from": 924,
          "to": 927,
          "chapter": "§十一",
          "text": "| 小鹏金融 | 10%起 | 小鹏融租 | 年满18周岁，最高年龄+分期期限不超过73周岁（年龄+分期期限超过68周岁需添加直系亲属作为共申） | 等额本息 | 需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件 |\n| 平安银行 | 15%起 | 平安银行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 | 等额本息 | 需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件 |\n| 中国银行 | 15%起 | 中国银行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 | 等额本息 / 等本等息（需线下面签） | 需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件 |\n**港澳台/外籍客户特别说明：**"
        },
        {
          "from": 926,
          "to": 931,
          "chapter": "§十一",
          "text": "| 平安银行 | 15%起 | 平安银行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 | 等额本息 | 需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件 |\n| 中国银行 | 15%起 | 中国银行 | 年满18周岁，最高年龄+贷款期限不超过70周岁 | 等额本息 / 等本等息（需线下面签） | 需有稳定工作收入及在住的中国大陆户籍居民作为共同申请人或担保人，且需满足特定条件 |\n**港澳台/外籍客户特别说明：**\n- 港澳台客户需增加一位拥有大陆户籍的人士做共申，共申申请材料与主申一致\n- 接受买车上公司牌，最多两台，上牌人为公司，需提供工商信息公示的法人/股东/监事做共同申请人\n- 具体准入与材料以客户实际情况为准"
        },
        {
          "from": 930,
          "to": 933,
          "chapter": "§十一",
          "text": "- 港澳台客户需增加一位拥有大陆户籍的人士做共申，共申申请材料与主申一致\n- 接受买车上公司牌，最多两台，上牌人为公司，需提供工商信息公示的法人/股东/监事做共同申请人\n- 具体准入与材料以客户实际情况为准\n（原始港澳台/外籍客户指引图链接：<https://feishu.cn/file/Wu7mbQI0Yob7HAxeqLDcBBb2nxc>）"
        },
        {
          "from": 932,
          "to": 935,
          "chapter": "§十一",
          "text": "- 接受买车上公司牌，最多两台，上牌人为公司，需提供工商信息公示的法人/股东/监事做共同申请人\n- 具体准入与材料以客户实际情况为准\n（原始港澳台/外籍客户指引图链接：<https://feishu.cn/file/Wu7mbQI0Yob7HAxeqLDcBBb2nxc>）\n## 十二，机构详解"
        },
        {
          "from": 938,
          "to": 941,
          "chapter": "§十一",
          "text": "- 具体准入与材料以客户实际情况为准\n（原始港澳台/外籍客户指引图链接：<https://feishu.cn/file/Wu7mbQI0Yob7HAxeqLDcBBb2nxc>）\n## 十二，机构详解\n### 小鹏融租"
        },
        {
          "from": 940,
          "to": 948,
          "chapter": "§十二",
          "text": "（原始港澳台/外籍客户指引图链接：<https://feishu.cn/file/Wu7mbQI0Yob7HAxeqLDcBBb2nxc>）\n## 十二，机构详解\n### 小鹏融租\n> 💡 **提示**\n>\n> **年龄要求:**\n> 年满18周岁，最高年龄+分期期限不超过73周岁(如:客户已过68周岁生日，最高分期年限为4年)。其中年龄+分期期限超过68周岁需添加直系亲属作为共同申请人。\n> **资质要求:**\n> 个人信用良好，未被列入内外部黑名单、失信被执行人名单、限制高消费名单、犯罪涉刑人员等。"
        },
        {
          "from": 947,
          "to": 955,
          "chapter": "§十二",
          "text": "> 年满18周岁，最高年龄+分期期限不超过73周岁(如:客户已过68周岁生日，最高分期年限为4年)。其中年龄+分期期限超过68周岁需添加直系亲属作为共同申请人。\n> **资质要求:**\n> 个人信用良好，未被列入内外部黑名单、失信被执行人名单、限制高消费名单、犯罪涉刑人员等。\n> 具有稳定的合法收入(自由职业也可以,有收入就行,微信、支付宝流水也接受)，或足够偿还租金的个人合法资产。\n> **资料清单：**\n> 身份证、驾驶证（或科目一及以上考试通过证明）、申请表、征信授权书、近6个月银行流水（首付比例 **提前结清：**\n> 1、租息：收取提前结清上一期账单日到结清日期间的租息\n> 租息金额=剩余未还融资额\\*年化租赁利率/360\\*资金实际占用天数\n> 2、违约金：贴息产品（3免2及5免3产品除外），提前结清不收取违约金；"
        },
        {
          "from": 953,
          "to": 961,
          "chapter": "§十二",
          "text": "> 1、租息：收取提前结清上一期账单日到结清日期间的租息\n> 租息金额=剩余未还融资额\\*年化租赁利率/360\\*资金实际占用天数\n> 2、违约金：贴息产品（3免2及5免3产品除外），提前结清不收取违约金；\n> 非贴息产品：还款不满12期，支付剩余融资额的2%作为违约金\n> 还款满12期，无违约金；\n> 试驾车、充电桩产品，提前结清不收取违约金；\n> 3免2及5免3产品（仅适用于上海银行，不含自营）：① 3免2产品：24期内提还需支付剩余本金的3%作为违约金，满24期无违约金；② 5免3产品：42期内提还需支付剩余本金的3%作为违约金，满42期无违约金。\n> 3、如涉及提前结清违约金及利息减免，可参照小鹏融租提前结清违约金减免规则执行\n> **特殊客群:**"
        },
        {
          "from": 959,
          "to": 967,
          "chapter": "§十二",
          "text": "> 3免2及5免3产品（仅适用于上海银行，不含自营）：① 3免2产品：24期内提还需支付剩余本金的3%作为违约金，满24期无违约金；② 5免3产品：42期内提还需支付剩余本金的3%作为违约金，满42期无违约金。\n> 3、如涉及提前结清违约金及利息减免，可参照小鹏融租提前结清违约金减免规则执行\n> **特殊客群:**\n> 1、没有驾照(科目一也没过)的情况下可以增加有驾照的直系亲属共同申请,共申申请材料与主申一致;\n> 2、港澳台客户需增加一位拥有大陆户籍的人士做共申,共申申请材料与主申一致;\n> 3、接受买车上公司牌,最多两台,上牌人为公司,需提供工商信息公示的法人/股东/监事做共同申请人;\n> 4、客户为学生、家庭主妇等无收入群体,需增加有稳定收入的直系亲属做共同申请人,共申申请材料与\n> 主申一致;\n> 5、客户无固定工作但是有稳定房租收入、炒股、理财利息收入等也是为有收入。"
        },
        {
          "from": 965,
          "to": 971,
          "chapter": "§十二",
          "text": "> 4、客户为学生、家庭主妇等无收入群体,需增加有稳定收入的直系亲属做共同申请人,共申申请材料与\n> 主申一致;\n> 5、客户无固定工作但是有稳定房租收入、炒股、理财利息收入等也是为有收入。\n> **特别说明:**\n> 1、融租通过后可更改发票价,更改后找对应金融客服重新提交审批;\n> 2、3月24日下午2点起，小鹏融租解绑门店PDI校验流程，当客户满足放款条件后可正常放款。\n> 3、融租属于汽车分期方式的一种,不能用“贷款”字样,可以统一用“分期”。"
        },
        {
          "from": 970,
          "to": 973,
          "chapter": "§十二",
          "text": "> 1、融租通过后可更改发票价,更改后找对应金融客服重新提交审批;\n> 2、3月24日下午2点起，小鹏融租解绑门店PDI校验流程，当客户满足放款条件后可正常放款。\n> 3、融租属于汽车分期方式的一种,不能用“贷款”字样,可以统一用“分期”。\n### 中行"
        },
        {
          "from": 973,
          "to": 976,
          "chapter": "§十二",
          "text": "> 2、3月24日下午2点起，小鹏融租解绑门店PDI校验流程，当客户满足放款条件后可正常放款。\n> 3、融租属于汽车分期方式的一种,不能用“贷款”字样,可以统一用“分期”。\n### 中行\n> 20260427，年龄要求更新。"
        },
        {
          "from": 975,
          "to": 983,
          "chapter": "§十二",
          "text": "> 3、融租属于汽车分期方式的一种,不能用“贷款”字样,可以统一用“分期”。\n### 中行\n> 20260427，年龄要求更新。\n> 💡 **提示**\n>\n> **年龄要求：**\n> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限为4年）。\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产/学历（本科）。"
        },
        {
          "from": 982,
          "to": 988,
          "chapter": "§十二",
          "text": "> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限为4年）。\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产/学历（本科）。\n> **特别说明：**\n> 1，客户在小鹏APP上提交成功后，中行客户经理联系客户办理，系统状态需银行调整（客户提交后系统仍显示等待客户提交资料，只有银行客户经理介入后才会调整状态）；\n> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需中行重审；\n> 3，中行需线下面签。"
        },
        {
          "from": 987,
          "to": 990,
          "chapter": "§十二",
          "text": "> 1，客户在小鹏APP上提交成功后，中行客户经理联系客户办理，系统状态需银行调整（客户提交后系统仍显示等待客户提交资料，只有银行客户经理介入后才会调整状态）；\n> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需中行重审；\n> 3，中行需线下面签。\n### 建行"
        },
        {
          "from": 990,
          "to": 993,
          "chapter": "§十二",
          "text": "> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需中行重审；\n> 3，中行需线下面签。\n### 建行\n> 20260427，年龄要求更新。"
        },
        {
          "from": 992,
          "to": 1000,
          "chapter": "§十二",
          "text": "> 3，中行需线下面签。\n### 建行\n> 20260427，年龄要求更新。\n> 💡 **提示**\n>\n> **年龄要求：**\n> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限为4年）。\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产/学历（本科）。"
        },
        {
          "from": 999,
          "to": 1005,
          "chapter": "§十二",
          "text": "> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限为4年）。\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产/学历（本科）。\n> **特别说明：**\n> 1，客户在小鹏APP上提交成功后，建行客户经理联系客户办理，系统状态为银行调整（客户提交后系统仍显示等待客户提交资料，只有银行客户经理介入后才会调整状态）；\n> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需建行重审；\n> 3，建行需线下面签。"
        },
        {
          "from": 1004,
          "to": 1007,
          "chapter": "§十二",
          "text": "> 1，客户在小鹏APP上提交成功后，建行客户经理联系客户办理，系统状态为银行调整（客户提交后系统仍显示等待客户提交资料，只有银行客户经理介入后才会调整状态）；\n> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需建行重审；\n> 3，建行需线下面签。\n### 中信"
        },
        {
          "from": 1007,
          "to": 1010,
          "chapter": "§十二",
          "text": "> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需建行重审；\n> 3，建行需线下面签。\n### 中信\n> 20260427，年龄要求更新。"
        },
        {
          "from": 1009,
          "to": 1017,
          "chapter": "§十二",
          "text": "> 3，建行需线下面签。\n### 中信\n> 20260427，年龄要求更新。\n> 💡 **提示**\n>\n> **年龄要求：**\n> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限为4年）。\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产。"
        },
        {
          "from": 1016,
          "to": 1023,
          "chapter": "§十二",
          "text": "> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限为4年）。\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产。\n> **特别说明：**\n> 1，客户在小鹏APP上提交后，10分钟左右出预审结果。如果客户收到短信提醒通过，说明预审通过，1小时内会有中信客户经理联系客户终审并指引线上签约；\n> 2，中信接受客户本人没有驾驶证，但终审时需提供直系亲属驾驶证及关系证明；\n> 3，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需中信重审。\n> 4，中信进入人工审批可能会需要补充驾驶证。"
        },
        {
          "from": 1022,
          "to": 1025,
          "chapter": "§十二",
          "text": "> 2，中信接受客户本人没有驾驶证，但终审时需提供直系亲属驾驶证及关系证明；\n> 3，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需中信重审。\n> 4，中信进入人工审批可能会需要补充驾驶证。\n### 民生"
        },
        {
          "from": 1025,
          "to": 1033,
          "chapter": "§十二",
          "text": "> 3，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需中信重审。\n> 4，中信进入人工审批可能会需要补充驾驶证。\n### 民生\n> 💡 **提示**\n>\n> **年龄要求：**\n> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限为4年）。\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产。"
        },
        {
          "from": 1032,
          "to": 1039,
          "chapter": "§十二",
          "text": "> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限为4年）。\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产。\n> **特别说明：**\n> 1，客户在小鹏APP上提交后，短信通知客户结果，如果收到通过短信，客户经理会联系客户指引线上视频签约，视频签约完成后才能更新通过状态。\n> 2，22-55周岁提交时无需提供驾驶证，但若审批判断需要提供，则需提供本人驾驶证；\n> 3，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需民生重审；\n> 4，民生为视频签约，需客户在民生银行APP上视频联系工作人员回答问题。"
        },
        {
          "from": 1038,
          "to": 1041,
          "chapter": "§十二",
          "text": "> 2，22-55周岁提交时无需提供驾驶证，但若审批判断需要提供，则需提供本人驾驶证；\n> 3，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需民生重审；\n> 4，民生为视频签约，需客户在民生银行APP上视频联系工作人员回答问题。\n### 平安"
        },
        {
          "from": 1041,
          "to": 1044,
          "chapter": "§十二",
          "text": "> 3，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需民生重审；\n> 4，民生为视频签约，需客户在民生银行APP上视频联系工作人员回答问题。\n### 平安\n> 20260427，年龄要求更新。"
        },
        {
          "from": 1043,
          "to": 1051,
          "chapter": "§十二",
          "text": "> 4，民生为视频签约，需客户在民生银行APP上视频联系工作人员回答问题。\n### 平安\n> 20260427，年龄要求更新。\n> 💡 **提示**\n>\n> **年龄要求：**\n> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限4年）\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产/学历（本科）/其他资产（车产等）。"
        },
        {
          "from": 1050,
          "to": 1056,
          "chapter": "§十二",
          "text": "> 年满18周岁，最高年龄+贷款期限不超过70周岁（如：客户已过65周岁生日，最高分期年限4年）\n> **资质要求：**\n> 有稳定工作收入/社保公积金/房产/学历（本科）/其他资产（车产等）。\n> **特别说明：**\n> 1，客户在小鹏APP上提交成功后，平安客户经理联系客户办理，系统状态需银行调整（客户提交后系统仍显示等待客户提交资料，只有银行客户经理介入后才会调整状态）；\n> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需平安重审；\n> 3，若当地有平安分支机构，可视频面签，如无则需要线下面签。"
        },
        {
          "from": 1055,
          "to": 1058,
          "chapter": "§十二",
          "text": "> 1，客户在小鹏APP上提交成功后，平安客户经理联系客户办理，系统状态需银行调整（客户提交后系统仍显示等待客户提交资料，只有银行客户经理介入后才会调整状态）；\n> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需平安重审；\n> 3，若当地有平安分支机构，可视频面签，如无则需要线下面签。\n### 招商"
        },
        {
          "from": 1058,
          "to": 1061,
          "chapter": "§十二",
          "text": "> 2，若通过后改价，首次变动价格不超过开票价的5%且首付比例不低于15%，可无需重审；如果首次变动超过上述条件，或进行了二次价格变动等，需平安重审；\n> 3，若当地有平安分支机构，可视频面签，如无则需要线下面签。\n### 招商\n> 20260427，年龄要求更新。"
        },
        {
          "from": 1060,
          "to": 1068,
          "chapter": "§十二",
          "text": "> 3，若当地有平安分支机构，可视频面签，如无则需要线下面签。\n### 招商\n> 20260427，年龄要求更新。\n> 💡 **提示**\n>\n> **年龄要求：**\n> 年满18周岁，最高年龄不超过70周岁。支持70+5，即客户在70周岁前最高也可做5年的分期。\n> **资质要求：**\n> 有稳定的收入/社保公积金/个税/房产/大额存单等。"
        },
        {
          "from": 1067,
          "to": 1074,
          "chapter": "§十二",
          "text": "> 年满18周岁，最高年龄不超过70周岁。支持70+5，即客户在70周岁前最高也可做5年的分期。\n> **资质要求：**\n> 有稳定的收入/社保公积金/个税/房产/大额存单等。\n> **特别说明：**\n> **1，需要客户本人付首付款且不能刷招商信用卡** ；\n> 2，支持指贷分离（线下），需贷款人本人驾驶证；\n> 3，初审通过后，客户经理联系客户进行线下面签。支持上门面签，面签后提交终审；若客户为招行旧户，可支持线上面签；\n> 4、线下放款需要发票+首付款凭证。"
        },
        {
          "from": 1073,
          "to": 1076,
          "chapter": "§十二",
          "text": "> 2，支持指贷分离（线下），需贷款人本人驾驶证；\n> 3，初审通过后，客户经理联系客户进行线下面签。支持上门面签，面签后提交终审；若客户为招行旧户，可支持线上面签；\n> 4、线下放款需要发票+首付款凭证。\n### 交通"
        },
        {
          "from": 1076,
          "to": 1079,
          "chapter": "§十二",
          "text": "> 3，初审通过后，客户经理联系客户进行线下面签。支持上门面签，面签后提交终审；若客户为招行旧户，可支持线上面签；\n> 4、线下放款需要发票+首付款凭证。\n### 交通\n> 20260427，年龄要求更新。"
        },
        {
          "from": 1078,
          "to": 1086,
          "chapter": "§十二",
          "text": "> 4、线下放款需要发票+首付款凭证。\n### 交通\n> 20260427，年龄要求更新。\n> 💡 **提示**\n>\n> **年龄要求：**\n> 年龄满20周岁，最高年龄+贷款期限不超过至65周岁（如：客户已过60周岁生日，最高分期年限4年）。\n> **资质要求：**\n> 1，征信大数据良好，有稳定的收入。"
        },
        {
          "from": 1085,
          "to": 1093,
          "chapter": "§十二",
          "text": "> 年龄满20周岁，最高年龄+贷款期限不超过至65周岁（如：客户已过60周岁生日，最高分期年限4年）。\n> **资质要求：**\n> 1，征信大数据良好，有稳定的收入。\n> 2，对于社保、公积金、营业执照、代发流水没有绝对要求，视客户资质补件。\n> 3，可允许一定程度的逾期（视情况）。\n> **特别说明：**\n> 1，目前有**零贷+信用卡审批**两种模式；\n> 2，**零贷审批：**无需人工亲见线上审批的客户；**信用卡审批：**需线下人工面见（如30w以上、需要补充材增信提额、抵押等）的客户；\n> 3，申请时无需驾驶证，但是若触发系统风险须**补充驾驶证。**"
        },
        {
          "from": 1091,
          "to": 1095,
          "chapter": "§十二",
          "text": "> 1，目前有**零贷+信用卡审批**两种模式；\n> 2，**零贷审批：**无需人工亲见线上审批的客户；**信用卡审批：**需线下人工面见（如30w以上、需要补充材增信提额、抵押等）的客户；\n> 3，申请时无需驾驶证，但是若触发系统风险须**补充驾驶证。**\n> 4、**零贷：**审批通过订单，如有车价有变更，只要贷款金额不变，并且贷款金额不高于车价，就无需重审 (但需通过客户经理发送的链接确认贷款方案）；已签约客户需重新签约。\n> 5、**信用卡：**a.交付中心变更需重审；b.上牌城市调整如果是抵押类的需要客户经理确认是否重审（能否异地协调抵押办理）c.车价比进件的之后降低超过30%要重审 注：目前信用卡重审需二次线下面见，因此进件后需确认以上条件不触发，再进行线下面见，方可避免客户二次线下面见。"
        },
        {
          "from": 1094,
          "to": 1097,
          "chapter": "§十二",
          "text": "> 3，申请时无需驾驶证，但是若触发系统风险须**补充驾驶证。**\n> 4、**零贷：**审批通过订单，如有车价有变更，只要贷款金额不变，并且贷款金额不高于车价，就无需重审 (但需通过客户经理发送的链接确认贷款方案）；已签约客户需重新签约。\n> 5、**信用卡：**a.交付中心变更需重审；b.上牌城市调整如果是抵押类的需要客户经理确认是否重审（能否异地协调抵押办理）c.车价比进件的之后降低超过30%要重审 注：目前信用卡重审需二次线下面见，因此进件后需确认以上条件不触发，再进行线下面见，方可避免客户二次线下面见。\n## 十三，常见问题解答"
        },
        {
          "from": 1097,
          "to": 1102,
          "chapter": "§十二",
          "text": "> 4、**零贷：**审批通过订单，如有车价有变更，只要贷款金额不变，并且贷款金额不高于车价，就无需重审 (但需通过客户经理发送的链接确认贷款方案）；已签约客户需重新签约。\n> 5、**信用卡：**a.交付中心变更需重审；b.上牌城市调整如果是抵押类的需要客户经理确认是否重审（能否异地协调抵押办理）c.车价比进件的之后降低超过30%要重审 注：目前信用卡重审需二次线下面见，因此进件后需确认以上条件不触发，再进行线下面见，方可避免客户二次线下面见。\n## 十三，常见问题解答\n> 📌 **提示**\n>\n> **问：客户登录APP为什么没有填写资料入口？**"
        },
        {
          "from": 1102,
          "to": 1105,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：客户登录APP为什么没有填写资料入口？**\n- 骁龙补全后5分钟内可生成链接。超过时间未生成，先确认骁龙“锁单信息”的**上牌联系人**手机号是否正确，再确认客户登录的手机号与骁龙“锁单信息”的**上牌联系人**是否一致。"
        },
        {
          "from": 1105,
          "to": 1110,
          "chapter": "§十三",
          "text": ">\n> **问：客户登录APP为什么没有填写资料入口？**\n- 骁龙补全后5分钟内可生成链接。超过时间未生成，先确认骁龙“锁单信息”的**上牌联系人**手机号是否正确，再确认客户登录的手机号与骁龙“锁单信息”的**上牌联系人**是否一致。\n> 📌 **提示**\n>\n> **问：为什么”审核通过“变成”等待提交申请资料“？**"
        },
        {
          "from": 1110,
          "to": 1114,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：为什么”审核通过“变成”等待提交申请资料“？**\n- 骁龙改动车价/交付门店/配置信息等，会导致状态重置。【小鹏融租/上海银行】订单在审批中或者已通过，涉及发票变动（如置换改价），两次价格变动幅度在 **5%** 以内，系统将按原批复方案自动提交，**保持原首付比例不变，首付金额和融资金额会同时变更**。若要保持原分期金额不变或者价格变动幅度超过 5% ，联系金融客服同学手动提交同步状态。\n- 合作银行如若需重签，看具体情况，如若无需重签，但多次改价，需要同步系统。"
        },
        {
          "from": 1114,
          "to": 1119,
          "chapter": "§十三",
          "text": "> **问：为什么”审核通过“变成”等待提交申请资料“？**\n- 骁龙改动车价/交付门店/配置信息等，会导致状态重置。【小鹏融租/上海银行】订单在审批中或者已通过，涉及发票变动（如置换改价），两次价格变动幅度在 **5%** 以内，系统将按原批复方案自动提交，**保持原首付比例不变，首付金额和融资金额会同时变更**。若要保持原分期金额不变或者价格变动幅度超过 5% ，联系金融客服同学手动提交同步状态。\n- 合作银行如若需重签，看具体情况，如若无需重签，但多次改价，需要同步系统。\n> 📌 **提示**\n>\n> **问：发票目前还没审批到最终价格，能先做金融吗？**"
        },
        {
          "from": 1119,
          "to": 1122,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：发票目前还没审批到最终价格，能先做金融吗？**\n- 可以，小鹏融租只要通过了审核，可以进行修改，更改后可以找金服同学提交后同步状态。银行端在客户提交资料前告知金融同学最终发票价即可。"
        },
        {
          "from": 1122,
          "to": 1127,
          "chapter": "§十三",
          "text": ">\n> **问：发票目前还没审批到最终价格，能先做金融吗？**\n- 可以，小鹏融租只要通过了审核，可以进行修改，更改后可以找金服同学提交后同步状态。银行端在客户提交资料前告知金融同学最终发票价即可。\n> 📌 **提示**\n>\n> **问：抵押客户可以自己上牌吗？**"
        },
        {
          "from": 1127,
          "to": 1130,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：抵押客户可以自己上牌吗？**\n- 不允许。如审批同意，(必须**由销售同学发起邮件**，依次由**区域FI-区域金融负责人-信审运营负责人**完成审批。）必须由销售或指定第三方陪同客户上牌并及时完成抵押办理，才可推进交付流程；如审批不同意，需与客户沟通全款购车或退车。"
        },
        {
          "from": 1130,
          "to": 1135,
          "chapter": "§十三",
          "text": ">\n> **问：抵押客户可以自己上牌吗？**\n- 不允许。如审批同意，(必须**由销售同学发起邮件**，依次由**区域FI-区域金融负责人-信审运营负责人**完成审批。）必须由销售或指定第三方陪同客户上牌并及时完成抵押办理，才可推进交付流程；如审批不同意，需与客户沟通全款购车或退车。\n> 📌 **提示**\n>\n> **问：还款方式是等额本息吗？客户要提前还款，哪个银行能做等本等息？**"
        },
        {
          "from": 1135,
          "to": 1138,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：还款方式是等额本息吗？客户要提前还款，哪个银行能做等本等息？**\n- 小鹏官方金融的还款方式为等额本息。目前也有还款方式为等本等息的产品，准入门槛相对较高，对客户资质有要求。比如中行、建行、招商。"
        },
        {
          "from": 1138,
          "to": 1143,
          "chapter": "§十三",
          "text": ">\n> **问：还款方式是等额本息吗？客户要提前还款，哪个银行能做等本等息？**\n- 小鹏官方金融的还款方式为等额本息。目前也有还款方式为等本等息的产品，准入门槛相对较高，对客户资质有要求。比如中行、建行、招商。\n> 📌 **提示**\n>\n> **问：小鹏官方金融等额本息还款方式每年大概还多少利息？**"
        },
        {
          "from": 1143,
          "to": 1147,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：小鹏官方金融等额本息还款方式每年大概还多少利息？**\n- 按照5年期测算，第一年大概会还总利息的35%左右，第二年累计大概会还总利息的62%左右，第三年累计大概会还总利息的82%左右，第四年累计大概会还总利息的95%左右。\n- 按照3年期测算，第一年大概会还总利息的54%左右，第二年累计大概会还总利息的87%左右。"
        },
        {
          "from": 1147,
          "to": 1152,
          "chapter": "§十三",
          "text": "> **问：小鹏官方金融等额本息还款方式每年大概还多少利息？**\n- 按照5年期测算，第一年大概会还总利息的35%左右，第二年累计大概会还总利息的62%左右，第三年累计大概会还总利息的82%左右，第四年累计大概会还总利息的95%左右。\n- 按照3年期测算，第一年大概会还总利息的54%左右，第二年累计大概会还总利息的87%左右。\n> 📌 **提示**\n>\n> **问：老车主要提前还款，怎么处理？**"
        },
        {
          "from": 1152,
          "to": 1155,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：老车主要提前还款，怎么处理？**\n- 小鹏融租客户可在“小鹏APP-服务-金融服务-我的分期”查询并打款结清，或拨打**400-783-6688**厂家热线；银行客户优先联系银行客户经理，解决不了的可联系金融同学。"
        },
        {
          "from": 1155,
          "to": 1160,
          "chapter": "§十三",
          "text": ">\n> **问：老车主要提前还款，怎么处理？**\n- 小鹏融租客户可在“小鹏APP-服务-金融服务-我的分期”查询并打款结清，或拨打**400-783-6688**厂家热线；银行客户优先联系银行客户经理，解决不了的可联系金融同学。\n> 📌 **提示**\n>\n> **问：客户需借阅绿本备案改色，怎么处理？**"
        },
        {
          "from": 1160,
          "to": 1163,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：客户需借阅绿本备案改色，怎么处理？**\n- 小鹏融租客户在“小鹏APP-服务-金融服务-我的分期”内申请，或者拨打**400-783-6688**厂家热线；银行客户联系客户经理，解决不了的可联系金融同学。"
        },
        {
          "from": 1163,
          "to": 1168,
          "chapter": "§十三",
          "text": ">\n> **问：客户需借阅绿本备案改色，怎么处理？**\n- 小鹏融租客户在“小鹏APP-服务-金融服务-我的分期”内申请，或者拨打**400-783-6688**厂家热线；银行客户联系客户经理，解决不了的可联系金融同学。\n> 📌 **提示**\n>\n> **问：员工内购，产品选哪个，是免抵押吗？**"
        },
        {
          "from": 1168,
          "to": 1172,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：员工内购，产品选哪个，是免抵押吗？**\n- 常规金融产品请选择**【231218】员工限时2.49%；**\n如果车主非员工本人，必须员工做共申，员工需在职。要素符合的情况下，批复为免抵押。"
        },
        {
          "from": 1172,
          "to": 1177,
          "chapter": "§十三",
          "text": "> **问：员工内购，产品选哪个，是免抵押吗？**\n- 常规金融产品请选择**【231218】员工限时2.49%；**\n如果车主非员工本人，必须员工做共申，员工需在职。要素符合的情况下，批复为免抵押。\n> 📌 **提示**\n>\n> **问：2.79%是年费率还是年利率，费率和利率有什么区别？**"
        },
        {
          "from": 1177,
          "to": 1182,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：2.79%是年费率还是年利率，费率和利率有什么区别？**\n- 小鹏融租均衡计划**2.79%**是**年费率**。\n- 费率是可以用贷款金额×年限×费率，可以直接计算出贷款利息，而利率则需要用专业的公式才可以计算出。\n- 年费率×1.83≈年利率"
        },
        {
          "from": 1182,
          "to": 1187,
          "chapter": "§十三",
          "text": "- 小鹏融租均衡计划**2.79%**是**年费率**。\n- 费率是可以用贷款金额×年限×费率，可以直接计算出贷款利息，而利率则需要用专业的公式才可以计算出。\n- 年费率×1.83≈年利率\n> 📌 **提示**\n>\n> **问：客户想要100%免抵押，是否有机构可以100%免抵押？**"
        },
        {
          "from": 1187,
          "to": 1190,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：客户想要100%免抵押，是否有机构可以100%免抵押？**\n- 没有100%审批免抵押的机构，审批是否免抵押以机构根据客户资质审核为准。"
        },
        {
          "from": 1190,
          "to": 1195,
          "chapter": "§十三",
          "text": ">\n> **问：客户想要100%免抵押，是否有机构可以100%免抵押？**\n- 没有100%审批免抵押的机构，审批是否免抵押以机构根据客户资质审核为准。\n> 📌 **提示**\n>\n> **问：等额本息的还款结构中，本金和利息是怎样的占比？**"
        },
        {
          "from": 1195,
          "to": 1198,
          "chapter": "§十三",
          "text": "> 📌 **提示**\n>\n> **问：等额本息的还款结构中，本金和利息是怎样的占比？**\n**以分期金额：10万元为例**"
        },
        {
          "from": 1198,
          "to": 1201,
          "chapter": "§十三",
          "text": ">\n> **问：等额本息的还款结构中，本金和利息是怎样的占比？**\n**以分期金额：10万元为例**\n### 等额本息还款结构示例（10 万元 / 60 期）"
        },
        {
          "from": 1203,
          "to": 1206,
          "chapter": "§十三",
          "text": "> **问：等额本息的还款结构中，本金和利息是怎样的占比？**\n**以分期金额：10万元为例**\n### 等额本息还款结构示例（10 万元 / 60 期）\n> 月还款额固定，但每月还款额中的本金比重逐月递增、利息比重逐月递减。"
        },
        {
          "from": 1205,
          "to": 1213,
          "chapter": "§十三",
          "text": "**以分期金额：10万元为例**\n### 等额本息还款结构示例（10 万元 / 60 期）\n> 月还款额固定，但每月还款额中的本金比重逐月递增、利息比重逐月递减。\n| 期数 | 月还款 | 本金 | 利息 |\n| --- | --- | --- | --- |\n| 1 | 8,565.83 | 8,139.92 | 425.91 |\n| 2 | 8,565.83 | 8,174.24 | 391.59 |\n| 3 | 8,565.83 | 8,208.56 | 357.27 |\n| 4 | 8,565.83 | 8,242.88 | 322.95 |"
        },
        {
          "from": 1211,
          "to": 1219,
          "chapter": "§十三",
          "text": "| 2 | 8,565.83 | 8,174.24 | 391.59 |\n| 3 | 8,565.83 | 8,208.56 | 357.27 |\n| 4 | 8,565.83 | 8,242.88 | 322.95 |\n| 5 | 8,565.83 | 8,277.20 | 288.63 |\n| 6 | 8,565.83 | 8,311.52 | 254.31 |\n| 7 | 8,565.83 | 8,345.84 | 219.99 |\n| 8 | 8,565.83 | 8,380.16 | 185.67 |\n| 9 | 8,565.83 | 8,414.48 | 151.35 |\n| 10 | 8,565.83 | 8,448.80 | 117.03 |"
        },
        {
          "from": 1217,
          "to": 1222,
          "chapter": "§十三",
          "text": "| 8 | 8,565.83 | 8,380.16 | 185.67 |\n| 9 | 8,565.83 | 8,414.48 | 151.35 |\n| 10 | 8,565.83 | 8,448.80 | 117.03 |\n| 11 | 8,565.83 | 8,483.12 | 82.71 |\n| 12 | 8,565.83 | 8,517.51 | 48.32 |\n| 13~60 | 8,565.83 | 逐月递增 | 逐月递减 |"
        },
        {
          "from": 1221,
          "to": 1224,
          "chapter": "§十三",
          "text": "| 11 | 8,565.83 | 8,483.12 | 82.71 |\n| 12 | 8,565.83 | 8,517.51 | 48.32 |\n| 13~60 | 8,565.83 | 逐月递增 | 逐月递减 |\n**说明：**"
        },
        {
          "from": 1223,
          "to": 1230,
          "chapter": "§十三",
          "text": "| 12 | 8,565.83 | 8,517.51 | 48.32 |\n| 13~60 | 8,565.83 | 逐月递增 | 逐月递减 |\n**说明：**\n- 等额本息：月供由\"本金+利息\"组成，每个月的还款额固定；本金逐月递增、利息逐月递减\n- 第 1 期本金 8,139.92 元，利息 425.91 元；第 12 期本金增至 8,517.51 元，利息降至 48.32 元\n- 5 年期测算：第 1 年累计还总利息 ~35%，第 2 年累计 ~62%，第 3 年累计 ~82%，第 4 年累计 ~95%\n- 3 年期测算：第 1 年累计还总利息 ~54%，第 2 年累计 ~87%\n- 简单换算：年费率 × 1.83 ≈ 年利率"
        },
        {
          "from": 1229,
          "to": 1232,
          "chapter": "§十三",
          "text": "- 5 年期测算：第 1 年累计还总利息 ~35%，第 2 年累计 ~62%，第 3 年累计 ~82%，第 4 年累计 ~95%\n- 3 年期测算：第 1 年累计还总利息 ~54%，第 2 年累计 ~87%\n- 简单换算：年费率 × 1.83 ≈ 年利率\n（原始还款结构示例图链接：<https://feishu.cn/file/Pcc3bHo1Lo0OjWxrVxrcQXFvnoh>）"
        },
        {
          "from": 1231,
          "to": 1234,
          "chapter": "§十三",
          "text": "- 3 年期测算：第 1 年累计还总利息 ~54%，第 2 年累计 ~87%\n- 简单换算：年费率 × 1.83 ≈ 年利率\n（原始还款结构示例图链接：<https://feishu.cn/file/Pcc3bHo1Lo0OjWxrVxrcQXFvnoh>）\n等额本息：月供由本金+利息组成，每个月的还款额是固定的，但每月还款额中的本金比重逐月递增、利息比重逐月递减。"
        },
        {
          "from": 1237,
          "to": 1239,
          "chapter": "§十三",
          "text": "- 简单换算：年费率 × 1.83 ≈ 年利率\n（原始还款结构示例图链接：<https://feishu.cn/file/Pcc3bHo1Lo0OjWxrVxrcQXFvnoh>）\n等额本息：月供由本金+利息组成，每个月的还款额是固定的，但每月还款额中的本金比重逐月递增、利息比重逐月递减。"
        }
      ]
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
