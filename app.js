/* =====================================================================
 * app.js —— SmartSelect 4.0 · FI 智能助手 控制台交互层
 *
 * 职责：
 *   1. 会话编排（输入 → 引擎 → 渲染）
 *   2. 结构化结果渲染（画像卡 / 机构卡 / 政策块 / 引用 / 降级）
 *   3. Motion 动效（scroll reveal · stagger · hover · modal · toast）
 *   4. shadcn 风格组件行为（Modal / Toast / Empty State）
 *
 * 依赖：vendor/motion.js（Motion One）、assets/kb.js、assets/engine.js
 * 约束：不发起任何网络请求，不采集、不上传用户输入。
 * ===================================================================== */
(function () {
  'use strict';

  var M = window.Motion || {};
  var E = window.FIEngine;
  var KB = window.KB || {};

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = [0.22, 1, 0.36, 1];

  /* ------------------------------------------------------------------
   * 工具
   * ------------------------------------------------------------------ */

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fromHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function pct(x) {
    return Math.round((x || 0) * 100) + '%';
  }

  /**
   * 播放结束后回调。Motion 不同版本返回的控制对象略有差异
   * （`.finished` Promise / thenable / 无 Promise），这里统一兜底，
   * 保证「关闭弹窗 / 移除 Toast」这类收尾动作一定发生。
   */
  function onFinish(controls, cb, fallbackMs) {
    var done = false;
    function once() {
      if (done) return;
      done = true;
      cb();
    }
    var p = controls && controls.finished;
    if (p && typeof p.then === 'function') {
      p.then(once).catch(once);
      setTimeout(once, (fallbackMs || 400) + 250); // 双保险，避免 Promise 不 settle 导致 UI 卡住
      return;
    }
    if (controls && typeof controls.then === 'function') {
      controls.then(once).catch(once);
      setTimeout(once, (fallbackMs || 400) + 250);
      return;
    }
    setTimeout(once, fallbackMs || 300);
  }

  function tierLabel(tier) {
    return tier === 1 ? '一类机构' : '二类承接';
  }

  function scoreTone(score) {
    if (score >= 0.85) return { cls: 'chip-accent', text: '高匹配' };
    if (score >= 0.7) return { cls: '', text: '中匹配' };
    return { cls: '', text: '待确认' };
  }

  /* ------------------------------------------------------------------
   * 示例场景（与后端 README 演示剧本一致）
   * ------------------------------------------------------------------ */

  var PRESETS = [
    { tag: '政策', text: '港澳台客户做安澜可以吗？' },
    { tag: '政策', text: '营运车网约车怎么做分期？' },
    { tag: '方案', text: '42岁港澳台客户，60期，首付25%，征信A，广州，哪家能做？' },
    { tag: '流程', text: '审批一般要多长时间？客户催审批进度怎么办？' },
    { tag: '方案', text: '客户40岁，36期，首付20%，指定安澜银行，拒绝岚山银行' },
    { tag: '方案', text: '客户想免抵押，广州，35岁，36期，征信B' },
    { tag: '政策', text: '2.79%是年费率还是年利率？' },
    { tag: '边界', text: '今天深圳天气怎么样' },
  ];

  /* ------------------------------------------------------------------
   * Toast
   * ------------------------------------------------------------------ */

  var toastHost = $('#toast-host');

  function toast(message, tone) {
    var node = fromHTML(
      '<div class="toast pointer-events-auto">' +
      '<span class="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full ' +
      (tone === 'warn' ? 'bg-amber-500' : 'bg-emerald-500') + '"></span>' +
      '<p class="leading-relaxed">' + esc(message) + '</p>' +
      '</div>'
    );
    toastHost.appendChild(node);
    if (M.animate && !REDUCED) {
      M.animate(node, { opacity: [0, 1], transform: ['translateY(10px) scale(0.97)', 'none'] },
        { duration: 0.3, ease: EASE });
    }
    setTimeout(function () {
      if (M.animate && !REDUCED) {
        var c = M.animate(node, { opacity: [1, 0], transform: ['none', 'translateY(6px) scale(0.98)'] },
          { duration: 0.24, ease: 'easeOut' });
        onFinish(c, function () { node.remove(); }, 260);
      } else {
        node.remove();
      }
    }, 2600);
  }

  /* ------------------------------------------------------------------
   * Modal
   * ------------------------------------------------------------------ */

  var modal = $('#modal');
  var modalPanel = $('#modal-panel');
  var modalBody = $('#modal-body');
  var modalTitle = $('#modal-title');
  var lastFocus = null;

  function openModal(title, html) {
    lastFocus = document.activeElement;
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modal.classList.remove('hidden');
    if (M.animate && !REDUCED) {
      M.animate($('#modal-backdrop'), { opacity: [0, 1] }, { duration: 0.2, ease: 'easeOut' });
      M.animate(modalPanel,
        { opacity: [0, 1], transform: ['translateY(10px) scale(0.985)', 'none'] },
        { duration: 0.3, ease: EASE });
    }
    $('#modal-close').focus();
  }

  function closeModal() {
    function done() {
      modal.classList.add('hidden');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    if (M.animate && !REDUCED) {
      M.animate(modalPanel,
        { opacity: [1, 0], transform: ['none', 'translateY(6px) scale(0.99)'] },
        { duration: 0.18, ease: 'easeIn' });
      var c = M.animate($('#modal-backdrop'), { opacity: [1, 0] }, { duration: 0.2, ease: 'easeIn' });
      onFinish(c, done, 220);
    } else {
      done();
    }
  }

  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  /**
   * 把原文片段清洗成一行可读文字。
   * 先走引擎的 cleanCitation（与后端 _clean_citation 同口径），
   * 再抹掉 markdown 表格分隔行这类纯噪音，最后按字数截断。
   */
  function prettyPassage(text, max) {
    var s = E.cleanCitation(text || '');
    // 去表格分隔行残留（| --- | :---: 等）
    s = s.replace(/(?:·\s*)?-{2,}(?:\s*·)?/g, '·');
    // 表格竖线转分隔点后，换行分号常夹在两点之间："…15% ·；· 是否可以…"
    s = s.replace(/·\s*；\s*·/g, '；');
    s = s.replace(/；\s*(?:；\s*)+/g, '；');
    s = s.replace(/(?:·\s*){2,}/g, '· ');
    s = s.replace(/^\s*[·；]\s*|\s*[·；]\s*$/g, '').trim();
    if (s.length > (max || 300)) s = s.slice(0, max || 300) + '…';
    return s;
  }

  /**
   * 打开「原文来源」弹窗：结构化来源 + 真实《金融顾问手册》片段检索。
   *
   * 检索用多个查询：原始问题 + 命中的机构名。
   * 只用原问题时，2-gram 相关度常把「费率总表」这类泛化片段排到前面；
   * 补上机构名能更稳定地命中「§十二 机构详解」这类真正对口的内容。
   */
  window.__openSources = function (question, extraSources, instNames) {
    var html = '';
    if (extraSources && extraSources.length) {
      html += '<div><p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">规则来源</p>';
      html += '<ul class="space-y-1.5">' + extraSources.map(function (s) {
        return '<li class="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">' +
          '<span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"></span><span>' + esc(s) + '</span></li>';
      }).join('') + '</ul></div>';
    }

    var queries = [question].concat(instNames || []);
    var seenKey = {};
    var hits = [];
    queries.forEach(function (q) {
      if (!q) return;
      E.retrieve(q, 4).forEach(function (h) {
        var key = h.chunk.from + '-' + h.chunk.to;
        if (seenKey[key]) return;
        seenKey[key] = 1;
        hits.push(h);
      });
    });
    hits.sort(function (a, b) { return b.rel - a.rel; });
    hits = hits.slice(0, 4);

    if (hits.length) {
      html += '<div><p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">' +
        '《金融顾问手册》原文片段（相关度重排）</p><div class="space-y-2.5">';
      html += hits.map(function (h) {
        // 片段可能落在文档开头的封面区（尚无章节标题），此时只显示行号
        var where = (h.chunk.chapter ? h.chunk.chapter + ' ' : '') + 'L' + h.chunk.from + '-' + h.chunk.to;
        var text = prettyPassage(h.chunk.text, 300);
        if (!text) return '';
        return '<blockquote class="rounded-[10px] border border-line-soft bg-ink/[0.02] p-3">' +
          '<div class="mb-2 flex items-center gap-2">' +
          '<span class="chip !h-[20px] !text-[10px]">' + esc(where) + '</span>' +
          '<span class="num text-[10px] text-ink-faint">相关度 ' + h.rel.toFixed(2) + '</span>' +
          '</div>' +
          '<p class="text-[12px] leading-relaxed text-ink-soft">' + esc(text) + '</p>' +
          '</blockquote>';
      }).join('');
      html += '</div></div>';
    }

    if (!html) {
      html = '<div class="py-8 text-center"><p class="text-[13px] text-ink-soft">未检索到原文片段</p>' +
        '<p class="mt-1.5 text-[12px] text-ink-faint">该问题未命中知识库，建议咨询策略组确认。</p></div>';
    }

    openModal('来源与原文 · ' + question.slice(0, 22) + (question.length > 22 ? '…' : ''), html);
  };

  /* ------------------------------------------------------------------
   * 渲染：客户画像
   * ------------------------------------------------------------------ */

  function renderPortrait(portrait) {
    var chips = portrait.map(function (p) {
      var cls = 'chip !h-[26px] !text-[11.5px]';
      if (p.accent) cls += ' chip-accent';
      if (p.missing) cls += ' !border-dashed';
      return '<span class="' + cls + '">' + esc(p.label) + '　<span class="text-ink">' + esc(p.value) + '</span></span>';
    }).join('');
    return '<div class="rounded-[12px] border border-line-soft bg-ink/[0.02] p-3.5">' +
      '<p class="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">已理解的客户画像 · 请确认</p>' +
      '<div class="flex flex-wrap gap-1.5">' + chips + '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
   * 渲染：机构推荐卡
   * ------------------------------------------------------------------ */

  function renderInstCard(rec, rank) {
    var tone = scoreTone(rec.score);

    var metrics = [
      ['费率', rec.rate],
      ['最低首付', rec.down_payment],
      ['期限', rec.term],
      ['同贷书有效期', rec.approval_validity],
    ].filter(function (m) { return m[1]; }).map(function (m) {
      return '<div><p class="text-[10.5px] text-ink-faint">' + esc(m[0]) + '</p>' +
        '<p class="num mt-0.5 text-[12.5px] text-ink">' + esc(m[1]) + '</p></div>';
    }).join('');

    var reasons = (rec.reasons || []).map(function (r) {
      return '<li class="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">' +
        '<span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"></span><span>' + esc(r) + '</span></li>';
    }).join('');

    var ageTerm = (rec.age_term || []).map(function (r) {
      return '<li class="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">' +
        '<span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-faint"></span><span>' + esc(r) + '</span></li>';
    }).join('');

    var extras = (rec.extra_notes || []).map(function (r) {
      return '<li class="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">' +
        '<span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-emerald-500"></span><span>' + esc(r) + '</span></li>';
    }).join('');

    var needNotes = (rec.need_notes || []).map(function (r) {
      return '<li class="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">' +
        '<span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-emerald-500"></span><span>' + esc(r) + '</span></li>';
    }).join('');

    return '' +
      '<article class="overflow-hidden rounded-[12px] border border-line bg-ink/[0.02] transition-colors duration-300 hover:border-line-strong">' +
        '<div class="flex flex-wrap items-center gap-2 border-b border-line-soft px-4 py-3">' +
          '<span class="num grid h-5 w-5 place-items-center rounded-[6px] border border-line bg-ink/[0.04] text-[10.5px] text-ink-faint">' + rank + '</span>' +
          '<h4 class="text-[14px] font-semibold" data-inst-name="' + esc(rec.name) + '">' + esc(rec.name) + '</h4>' +
          '<span class="chip !h-[21px] !text-[10px]">' + tierLabel(rec.tier) + '</span>' +
          (rec.commercial ? '<span class="chip chip-accent !h-[21px] !text-[10px]">营运车口径</span>' : '') +
          '<span class="ml-auto flex items-center gap-1.5">' +
            '<span class="chip ' + tone.cls + ' !h-[21px] !text-[10.5px]">' + tone.text + '</span>' +
            '<span class="num rounded-[7px] border border-accent/30 bg-accent/[0.12] px-2 py-1 text-[11.5px] font-semibold text-accent-deep">' + pct(rec.score) + '</span>' +
          '</span>' +
        '</div>' +
        '<div class="px-4 py-3">' +
          '<div class="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">' + metrics + '</div>' +
          (reasons || ageTerm || extras || needNotes
            ? '<div class="mt-3 space-y-1.5 border-t border-line-soft pt-3">' + reasons + ageTerm + extras + needNotes + '</div>'
            : '') +
          (rec.source
            ? '<p class="mt-3 border-t border-line-soft pt-2.5 text-[10.5px] text-ink-faint" data-source-text="' + esc(rec.name + '：' + rec.source) + '">来源：' + esc(rec.source) + '</p>'
            : '') +
        '</div>' +
      '</article>';
  }

  /* ------------------------------------------------------------------
   * 渲染：方案咨询结果
   * ------------------------------------------------------------------ */

  function renderConsult(res, question) {
    var html = '';

    html += renderPortrait(res.portrait);

    if (res.credit_note) {
      html += '<p class="text-[12.5px] leading-relaxed text-ink-soft">' + esc(res.credit_note) + '</p>';
    }

    if (res.model_policy) {
      html += '<div class="rounded-[10px] border border-accent/25 bg-accent/[0.07] p-3">' +
        '<p class="text-[12.5px] leading-relaxed text-ink">' + esc(res.model_policy) + '</p></div>';
    }

    var lead = res.matched
      ? '按规则匹配，命中 <b class="text-ink">' + res.matched + '</b> 家可准入机构，以下按匹配度降序展示。'
      : '未发现同时满足当前资质与需求的机构。';
    html += '<p class="text-[13.5px] leading-relaxed text-ink-soft">' + lead + '</p>';

    if (res.recommendations.length) {
      html += '<div class="space-y-2.5">' + res.recommendations.map(function (r, i) {
        return renderInstCard(r, i + 1);
      }).join('') + '</div>';
    }

    if (!res.matched) {
      html += '<div class="rounded-[12px] border border-amber-500/30 bg-amber-500/[0.07] p-4 text-center">' +
        '<p class="text-[13px] font-medium text-amber-800">未发现同时满足当前资质与需求的机构</p>' +
        '<p class="mt-1.5 text-[12px] leading-relaxed text-ink-soft">可能原因：资质特殊（营运车 / 公牌 / 港澳台外籍）+ 需求约束冲突，建议咨询策略组确认。</p>' +
        '</div>';
    }

    if (res.other_institutions && res.other_institutions.length) {
      html += '<p class="text-[12px] text-ink-faint">其他可准入机构：' + esc(res.other_institutions.join('、')) + '</p>';
    }

    if (res.excluded_reasons && res.excluded_reasons.length) {
      html += '<div class="rounded-[10px] border border-line-soft bg-ink/[0.015] p-3">' +
        '<p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">已排除</p>' +
        '<ul class="space-y-1">' + res.excluded_reasons.map(function (x) {
          return '<li class="text-[12px] leading-relaxed text-ink-soft"><span class="text-ink-faint">' +
            esc(x.name) + '：</span>' + esc(x.reason) + '</li>';
        }).join('') + '</ul></div>';
    }

    if (res.missing_hint && res.missing_hint.length) {
      html += '<p class="text-[12px] leading-relaxed text-ink-faint">提示：补充 ' +
        esc(res.missing_hint.join('、')) + ' 可让推荐更精准。</p>';
    }

    // 操作区
    html += '<div class="flex flex-wrap items-center gap-2 border-t border-line-soft pt-3">' +
      '<button type="button" class="btn btn-sm" data-src="' + esc(question) + '">查看来源与原文</button>' +
      '<button type="button" class="btn btn-sm" data-copy="1">复制结论摘要</button>' +
      '</div>';

    html += '<p class="text-[10.5px] leading-relaxed text-ink-faint">免责：以上为规则匹配结果，非放款承诺；最终以机构审批与现场政策为准。</p>';

    return html;
  }

  /* ------------------------------------------------------------------
   * 渲染：政策问答 / 降级
   * ------------------------------------------------------------------ */

  function renderPolicy(res, question) {
    var html = '';

    // 置信度
    var conf = res.confidence || 0;
    var bar = Math.round(conf * 100);
    var toneCls = conf >= 0.8 ? 'bg-emerald-500' : conf >= 0.6 ? 'bg-accent' : 'bg-amber-500';
    html += '<div class="rounded-[10px] border border-line-soft bg-ink/[0.02] p-3">' +
      '<div class="flex items-center justify-between">' +
        '<span class="text-[11px] text-ink-faint">置信度</span>' +
        '<span class="num text-[12px] font-semibold">' + pct(conf) + '</span>' +
      '</div>' +
      '<div class="mt-2 h-1 overflow-hidden rounded-full bg-ink/[0.06]">' +
        '<div class="h-full rounded-full ' + toneCls + '" style="width:' + bar + '%"></div>' +
      '</div>' +
      '<p class="mt-2 text-[10.5px] leading-relaxed text-ink-faint">' +
        (res.degraded ? '未命中结构化规则与原文片段 → 已降级，交由策略组确认。'
                      : '结构化规则命中，结论可回溯至《金融顾问手册》对应章节。') +
      '</p>' +
      '</div>';

    if (res.degraded) {
      html += '<div class="rounded-[12px] border border-amber-500/30 bg-amber-500/[0.07] p-4">' +
        '<p class="text-[13px] font-medium text-amber-800">知识库未覆盖该问题</p>' +
        '<p class="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">' +
        '为避免误导，建议您咨询策略组确认。我可回答的范围：机构准入 / 港澳台外籍 / 营运车 / 刚需标签 / 8月金融政策 / 还款与提前结清 / APP 申请指引 / 常见 FAQ，来源为《金融顾问手册》。</p>' +
        '</div>';
    }

    (res.blocks || []).forEach(function (b) {
      html += '<div class="rounded-[12px] border border-line bg-ink/[0.02] p-4">';
      html += '<h4 class="text-[13.5px] font-semibold">' + esc(b.title) + '</h4>';
      if (b.body) {
        html += '<p class="mt-2 text-[12.5px] leading-relaxed text-ink-soft">' + esc(b.body) + '</p>';
      }
      if (b.bullets && b.bullets.length) {
        html += '<div class="mt-3 space-y-2">' + b.bullets.map(function (x) {
          return '<div class="rounded-[9px] border border-line-soft bg-ink/[0.015] px-3 py-2">' +
            '<p class="text-[11.5px] text-ink">' + esc(x.label) + '</p>' +
            '<p class="mt-0.5 text-[12px] leading-relaxed text-ink-soft">' + esc(x.text) + '</p></div>';
        }).join('') + '</div>';
      }
      if (b.notes && b.notes.length) {
        html += '<ul class="mt-3 space-y-1.5">' + b.notes.map(function (n) {
          return '<li class="flex gap-2 text-[12px] leading-relaxed text-ink-soft">' +
            '<span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-emerald-500"></span><span>' + esc(n) + '</span></li>';
        }).join('') + '</ul>';
      }
      html += '<p class="mt-3 border-t border-line-soft pt-2.5 text-[10.5px] text-ink-faint" data-source-text="' + esc(b.source) + '">来源：' + esc(b.source) + '</p>';
      html += '</div>';
    });

    if (res.citations && res.citations.length) {
      html += '<div class="rounded-[12px] border border-line-soft bg-ink/[0.015] p-3.5">' +
        '<p class="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">检索到的原文片段（供复核）</p>' +
        '<div class="space-y-2.5">' + res.citations.map(function (c) {
          var text = prettyPassage(c.text, 300);
          if (!text) return '';
          var where = (c.chapter ? c.chapter + ' ' : '') + c.lines;
          return '<blockquote class="border-l-2 border-accent/40 pl-3">' +
            '<p class="text-[12px] leading-relaxed text-ink-soft">' + esc(text) + '</p>' +
            '<p class="num mt-1.5 text-[10.5px] text-ink-faint">' + esc(where) +
            ' · 相关度 ' + c.rel.toFixed(2) + '</p></blockquote>';
        }).join('') + '</div></div>';
    }

    html += '<div class="flex flex-wrap items-center gap-2 border-t border-line-soft pt-3">' +
      '<button type="button" class="btn btn-sm" data-src="' + esc(question) + '">查看原文片段</button>' +
      '<button type="button" class="btn btn-sm" data-copy="1">复制结论摘要</button>' +
      '</div>';

    html += '<p class="text-[10.5px] leading-relaxed text-ink-faint">免责：以上来源《金融顾问手册》，具体准入以客户实际情况与机构审批为准。</p>';

    return html;
  }

  /* ------------------------------------------------------------------
   * 渲染：帮助卡
   * ------------------------------------------------------------------ */

  function renderHelp() {
    var items = [
      ['政策问答', '「港澳台客户做安澜可以吗？」「营运车怎么做分期？」「费率和利率的区别？」'],
      ['方案咨询', '直接描述客户情况，例如「42岁港澳台客户，60期，首付25%，征信A，哪家能做？」'],
      ['流程跟进', '「客户催审批进度怎么办？」「H5 填写中断？」— 给出口径 + 跟进路径 + 话术。'],
    ];
    return '<div class="rounded-[12px] border border-line bg-ink/[0.02] p-4">' +
      '<h4 class="text-[13.5px] font-semibold">我是 FI 智能助手 · 资深区域金融策略顾问</h4>' +
      '<p class="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">' +
      '服务对象：区域金融经理（FI）。核心使命：帮 FI 保证客户顺利分期，不让客户因流程卡住而流失。</p>' +
      '<div class="mt-3.5 space-y-2.5">' + items.map(function (it) {
        return '<div class="rounded-[9px] border border-line-soft bg-ink/[0.015] px-3 py-2.5">' +
          '<p class="text-[12px] font-medium text-ink">' + esc(it[0]) + '</p>' +
          '<p class="mt-1 text-[12px] leading-relaxed text-ink-soft">' + esc(it[1]) + '</p></div>';
      }).join('') + '</div>' +
      '<p class="mt-3.5 text-[11.5px] leading-relaxed text-ink-faint">' +
      '征信等级：A = 优质（无逾期、查询少）；B = 一般（含白户）；C = 有瑕疵（有逾期/污点）。<br />' +
      '红线：不编造机构政策、不预测市场、不替代 FI 决策、不联系客户。</p>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
   * 会话编排
   * ------------------------------------------------------------------ */

  var chatLog = $('#chat-log');
  var chatScroll = $('#chat-scroll');
  var chatEmpty = $('#chat-empty');
  var chatForm = $('#chat-form');
  var chatInput = $('#chat-input');
  var btnSend = $('#btn-send');
  var busy = false;

  function scrollToBottom() {
    chatScroll.scrollTo({ top: chatScroll.scrollHeight, behavior: REDUCED ? 'auto' : 'smooth' });
  }

  function addUserBubble(text) {
    var node = fromHTML(
      '<div class="flex justify-end">' +
      '<div class="max-w-[85%] rounded-[12px] rounded-br-[4px] border border-accent/25 bg-accent/10 px-3.5 py-2.5 text-[13px] leading-relaxed">' +
      esc(text) + '</div></div>'
    );
    chatLog.appendChild(node);
    if (M.animate && !REDUCED) {
      M.animate(node, { opacity: [0, 1], transform: ['translateY(6px)', 'none'] }, { duration: 0.3, ease: EASE });
    }
  }

  function addAssistantShell() {
    var wrap = fromHTML('<div class="space-y-3"></div>');
    var tag = fromHTML(
      '<div class="flex items-center gap-2">' +
      '<span class="chip chip-accent !h-[22px] !text-[10.5px]">规则引擎 · 知识库检索</span>' +
      '<span class="thinking-host h-[2px] w-24 overflow-hidden rounded-full bg-ink/[0.06]">' +
      '<span class="thinking-bar block h-full w-full"></span></span>' +
      '</div>'
    );
    var body = fromHTML('<div class="space-y-3"></div>');
    wrap.appendChild(tag);
    wrap.appendChild(body);
    chatLog.appendChild(wrap);
    return { wrap: wrap, tag: tag, body: body };
  }

  function finishAssistant(shell, html) {
    var host = shell.tag.querySelector('.thinking-host');
    if (host) {
      host.innerHTML = '<span class="block h-full w-full rounded-full bg-emerald-500/80"></span>';
    }
    var label = shell.tag.querySelector('.chip');
    if (label) label.textContent = 'AI 深度推理 · 依据知识库';

    shell.body.innerHTML = html;
    var kids = Array.prototype.slice.call(shell.body.children);
    if (M.animate && !REDUCED && kids.length) {
      M.animate(kids, { opacity: [0, 1], transform: ['translateY(8px)', 'none'] },
        { duration: 0.45, delay: M.stagger(0.055, { startDelay: 0.05 }), ease: EASE });
    }
    bindMessageActions(shell.body);
    scrollToBottom();
  }

  function bindMessageActions(root) {
    root.querySelectorAll('[data-src]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var q = btn.getAttribute('data-src');
        var extra = [];
        // 收集该条消息里已展示的规则来源
        root.querySelectorAll('[data-source-text]').forEach(function (n) {
          var t = n.getAttribute('data-source-text');
          if (t && extra.indexOf(t) < 0) extra.push(t);
        });
        // 收集命中的机构名，用于让原文检索更贴题
        var names = [];
        root.querySelectorAll('[data-inst-name]').forEach(function (n) {
          var v = n.getAttribute('data-inst-name');
          if (v && names.indexOf(v) < 0) names.push(v);
        });
        window.__openSources(q, extra, names);
      });
    });
    root.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = root.innerText.replace(/\n{2,}/g, '\n').trim();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text)
            .then(function () { toast('结论摘要已复制到剪贴板'); })
            .catch(function () { toast('复制失败，请手动选择文本', 'warn'); });
        } else {
          toast('当前环境不支持剪贴板', 'warn');
        }
      });
    });
  }

  function runTurn(text) {
    if (busy || !text.trim()) return;
    busy = true;
    btnSend.disabled = true;

    chatEmpty.style.display = 'none';
    addUserBubble(text);
    chatInput.value = '';
    scrollToBottom();

    var shell = addAssistantShell();
    scrollToBottom();

    // 让"思考中"状态可见一小会儿，模拟真实推理节奏（动效克制，不做夸张延迟）
    var delay = REDUCED ? 0 : 420;
    setTimeout(function () {
      var res;
      try {
        res = E.planTurn(text);
      } catch (err) {
        finishAssistant(shell,
          '<div class="rounded-[12px] border border-amber-500/30 bg-amber-500/[0.07] p-4">' +
          '<p class="text-[13px] font-medium text-amber-800">引擎执行异常</p>' +
          '<p class="mt-1.5 text-[12px] leading-relaxed text-ink-soft">' + esc(err.message) + '</p></div>');
        busy = false;
        btnSend.disabled = false;
        return;
      }

      var html;
      if (res.kind === 'consult') html = renderConsult(res, text);
      else if (res.kind === 'degrade') html = renderPolicy(res, text);
      else if (res.kind === 'policy') html = renderPolicy(res, text);
      else html = renderHelp();

      finishAssistant(shell, html);
      busy = false;
      btnSend.disabled = false;
    }, delay);
  }

  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    runTurn(chatInput.value);
  });

  /* ------------------------------------------------------------------
   * 示例场景
   * ------------------------------------------------------------------ */

  var presetList = $('#preset-list');
  presetList.innerHTML = PRESETS.map(function (p, i) {
    var tone = p.tag === '方案' ? 'chip-accent' : '';
    return '<button type="button" data-preset="' + i + '" ' +
      'class="group w-full rounded-[10px] border border-line-soft bg-ink/[0.02] px-3 py-2.5 text-left transition-colors duration-200 hover:border-accent/40 hover:bg-accent/[0.06]">' +
      '<span class="flex items-center gap-2">' +
      '<span class="chip ' + tone + ' !h-[19px] !px-2 !text-[9.5px]">' + esc(p.tag) + '</span>' +
      '</span>' +
      '<span class="mt-1.5 block text-[12px] leading-snug text-ink-soft group-hover:text-ink">' + esc(p.text) + '</span>' +
      '</button>';
  }).join('');

  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    var btn = e.target.closest('[data-preset]');
    if (!btn) return;
    var idx = parseInt(btn.getAttribute('data-preset'), 10);
    var p = PRESETS[idx];
    if (!p) return;
    chatInput.value = p.text;
    runTurn(p.text);
    document.getElementById('console').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { chatInput.focus(); }, 400);
  });

  $('#btn-clear').addEventListener('click', function () {
    chatLog.innerHTML = '';
    chatEmpty.style.display = '';
    toast('会话已清空');
  });

  /* ------------------------------------------------------------------
   * Hero 预览：用真实引擎渲染一份样例结果（非静态假图）
   * ------------------------------------------------------------------ */

  (function renderHeroPreview() {
    var host = $('#hero-preview-body');
    if (!host) return;
    var q = '42岁港澳台客户，60期，首付25%，征信A，广州';
    var res = E.planTurn(q);
    if (!res || res.kind !== 'consult') {
      host.innerHTML = '<p class="text-[12px] text-ink-faint">样例暂不可用</p>';
      return;
    }

    var chips = res.portrait.slice(0, 6).map(function (p) {
      return '<span class="chip !h-[22px] !text-[10.5px]' + (p.accent ? ' chip-accent' : '') + '">' +
        esc(p.label) + ' ' + esc(p.value) + '</span>';
    }).join('');

    var top = res.recommendations[0];
    var html = '<div class="rounded-[12px] border border-line bg-ink/[0.02] p-3.5">' +
      '<div class="flex items-center gap-2">' +
      '<span class="chip chip-accent !h-[21px] !text-[10px]">已理解画像</span>' +
      '<span class="num text-[10.5px] text-ink-faint">命中 ' + res.matched + ' 家</span>' +
      '</div>' +
      '<div class="mt-2.5 flex flex-wrap gap-1.5">' + chips + '</div>' +
      '</div>';

    if (top) {
      html += '<div class="rounded-[12px] border border-line bg-ink/[0.02] p-3.5">' +
        '<div class="flex items-center gap-2">' +
        '<h4 class="text-[13.5px] font-semibold">' + esc(top.name) + '</h4>' +
        '<span class="chip !h-[20px] !text-[10px]">' + tierLabel(top.tier) + '</span>' +
        '<span class="num ml-auto rounded-[7px] border border-accent/30 bg-accent/[0.12] px-2 py-0.5 text-[11px] font-semibold text-accent-deep">' +
        pct(top.score) + '</span>' +
        '</div>' +
        '<div class="num mt-2.5 grid grid-cols-3 gap-2 text-[11px]">' +
        '<div><p class="text-[10px] text-ink-faint">费率</p><p class="mt-0.5 text-ink">' + esc(top.rate) + '</p></div>' +
        '<div><p class="text-[10px] text-ink-faint">最低首付</p><p class="mt-0.5 text-ink">' + esc(top.down_payment) + '</p></div>' +
        '<div><p class="text-[10px] text-ink-faint">期限</p><p class="mt-0.5 text-ink">' + esc(top.term) + '</p></div>' +
        '</div>' +
        '<ul class="mt-2.5 space-y-1 border-t border-line-soft pt-2.5">' +
        (top.reasons || []).slice(0, 2).map(function (r) {
          return '<li class="flex gap-2 text-[11.5px] leading-relaxed text-ink-soft">' +
            '<span class="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-accent"></span><span>' + esc(r) + '</span></li>';
        }).join('') +
        (top.extra_notes || []).slice(0, 1).map(function (r) {
          return '<li class="flex gap-2 text-[11.5px] leading-relaxed text-ink-soft">' +
            '<span class="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-emerald-500"></span><span>' + esc(r) + '</span></li>';
        }).join('') +
        '</ul></div>';
    }

    if (res.matched > 1) {
      html += '<p class="text-[11px] text-ink-faint">其他可准入：' +
        esc(res.recommendations.slice(1, 4).map(function (r) { return r.name; }).join('、')) +
        (res.matched > 4 ? ' 等 ' + res.matched + ' 家' : '') + '</p>';
    }

    html += '<button type="button" class="btn btn-sm w-full" data-goto-console="1">在控制台里自己试 →</button>';

    host.innerHTML = html;

    host.querySelector('[data-goto-console]').addEventListener('click', function () {
      document.getElementById('console').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    });
  })();

  /* ------------------------------------------------------------------
   * Motion：scroll reveal / stagger
   * ------------------------------------------------------------------ */

  (function initReveal() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (REDUCED || !M.inView || !M.animate) {
      targets.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }

    var seen = new WeakSet();
    var groups = new Map();

    // 按父容器分组，组内做 stagger
    targets.forEach(function (el) {
      var key = el.parentElement;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(el);
    });

    groups.forEach(function (els) {
      els.forEach(function (el, i) {
        M.inView(el, function () {
          if (seen.has(el)) return;
          seen.add(el);
          M.animate(el,
            { opacity: [0, 1], transform: ['translateY(14px)', 'none'] },
            { duration: 0.62, delay: Math.min(i * 0.06, 0.4), ease: EASE }
          );
        }, { amount: 0.12 });
      });
    });
  })();

  /* ------------------------------------------------------------------
   * 导航滚动进度
   * ------------------------------------------------------------------ */

  (function initScrollProgress() {
    var bar = $('#nav-scroll');
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? h.scrollTop / max : 0;
      bar.style.width = (p * 100).toFixed(2) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  /* ------------------------------------------------------------------
   * 卡片微交互：指针位置驱动的柔光（克制，仅在细边框上体现）
   * ------------------------------------------------------------------ */

  (function initCardHover() {
    if (REDUCED) return;
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty('--mx', x.toFixed(1) + '%');
        card.style.setProperty('--my', y.toFixed(1) + '%');
      });
    });
  })();

  /* ------------------------------------------------------------------
   * 键盘快捷键：/ 聚焦输入
   * ------------------------------------------------------------------ */

  document.addEventListener('keydown', function (e) {
    if (e.key !== '/' || e.metaKey || e.ctrlKey) return;
    var modalOpen = !modal.classList.contains('hidden');
    if (modalOpen) return;
    var ae = document.activeElement;
    if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.isContentEditable)) return;
    e.preventDefault();
    document.getElementById('console').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    chatInput.focus();
  });

  /* ------------------------------------------------------------------
   * 引擎自检（控制台可见，便于面试现场核对）
   * ------------------------------------------------------------------ */

  console.log(
    '%cSmartSelect 4.0 %c· FI 智能助手',
    'background:#0B6FE8;color:#fff;padding:2px 6px;border-radius:4px;font-weight:600',
    'color:#6B7686'
  );
  console.log(
    '规则引擎已就绪：%d 家机构 / %d 类结构化规则 / 原文片段 %d 段（全部来自《金融顾问手册》）',
    E.allInstitutions().length,
    Object.keys(KB).filter(function (k) { return k !== 'doc'; }).length,
    (KB.doc && KB.doc.chunks ? KB.doc.chunks.length : 0)
  );
})();
