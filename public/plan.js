// 事業計画書AI下書き（plan.html）。入力を /api/plan に送り、結果を「計画づくりシート」として表示する。
// /api/plan は進み具合を1行ずつの JSON（NDJSON）で返す: {stage} → … → {result} または {error}
// 結果はこのブラウザ（localStorage）にだけ保存し、再読み込みしても消えないようにする（お試しは1日1回のため）
(function () {
  const form = document.getElementById('pl-form');
  if (!form) return;
  const send = document.getElementById('pl-send');
  const status = document.getElementById('pl-status');
  const result = document.getElementById('pl-result');
  const STORE = 'hojyokin-plan-draft';
  const FIELDS = ['subsidy', 'industry', 'employees', 'prefecture', 'budget', 'business', 'issue', 'idea', 'goal', 'customers', 'strength', 'competitors', 'website'];
  let last = null;

  // ── 進み具合の表示 ──
  // サーバーから届く段階（調査→作成）に合わせて範囲を決め、その中は経過時間で少しずつ進める
  const progress = {
    box: document.getElementById('pl-progress'),
    fill: document.getElementById('pl-progress-fill'),
    pct: document.getElementById('pl-progress-pct'),
    step: document.getElementById('pl-progress-step'),
    sec: document.getElementById('pl-progress-sec'),
    steps: [...document.querySelectorAll('#pl-progress-steps li')],
    timer: null,
    start: 0,
    stageAt: 0,
    stage: 'start',
    value: 0,
  };
  // 段階ごとの [開始%, 上限%, 目安の秒数, 表示する文, 段階の番号]
  // 詳しい版（調査→分析）と簡易版（下書きのみ）で、段階の範囲と目安の時間を変える
  const STAGE_SETS = {
    detailed: {
      start: [0, 6, 6, '入力内容を確認しています', 0],
      research: [6, 40, 70, '市場データを調べています（Web検索）', 1],
      writing: [40, 97, 130, '分析して、計画の下書きを書いています', 2],
    },
    simple: {
      start: [0, 6, 4, '入力内容を確認しています', 0],
      writing: [6, 97, 60, '計画の構成を考えています', 1],
    },
  };
  let STAGES = STAGE_SETS.simple;

  function draw(p, label, idx) {
    const v = Math.round(p);
    progress.fill.style.width = `${v}%`;
    progress.pct.textContent = `${v}%`;
    progress.fill.parentElement.setAttribute('aria-valuenow', String(v));
    progress.step.textContent = label;
    progress.steps.forEach((li, i) => { li.className = i < idx ? 'done' : i === idx ? 'now' : ''; });
  }

  function tick() {
    const now = Date.now();
    progress.sec.textContent = String(Math.floor((now - progress.start) / 1000));
    const [from, to, secs, label, idx] = STAGES[progress.stage];
    const t = (now - progress.stageAt) / 1000;
    const p = from + (to - from) * (1 - Math.exp(-t / (secs / 2)));
    progress.value = Math.max(progress.value, p);
    // 作成の終盤は「仕上げ」として表示する
    const finishing = progress.stage === 'writing' && progress.value > 85;
    const drafting = STAGES === STAGE_SETS.simple && progress.stage === 'writing' && progress.value > 40;
    if (finishing) draw(progress.value, '仕上げています', 3);
    else if (drafting) draw(progress.value, '下書きを書いています', 2);
    else draw(progress.value, label, idx);
  }

  function setStage(stage) {
    if (!STAGES[stage] || stage === progress.stage) return;
    progress.stage = stage;
    progress.stageAt = Date.now();
    progress.value = Math.max(progress.value, STAGES[stage][0]);
    tick();
  }

  function startProgress() {
    progress.start = progress.stageAt = Date.now();
    progress.stage = 'start';
    progress.value = 0;
    progress.box.hidden = false;
    clearInterval(progress.timer);
    tick();
    progress.timer = setInterval(tick, 500);
  }

  function stopProgress(ok) {
    clearInterval(progress.timer);
    if (!ok) { progress.box.hidden = true; return; }
    draw(100, '完成しました', 4);
    setTimeout(() => { progress.box.hidden = true; }, 1200);
  }

  for (const c of form.querySelectorAll('.pl-count')) {
    const ta = form.elements[c.dataset.for];
    const update = () => { c.textContent = `${ta.value.length} / ${ta.maxLength}`; };
    ta.addEventListener('input', update);
    update();
  }

  // ── 表示 ──
  const el = (tag, text, cls) => {
    const e = document.createElement(tag);
    if (text != null) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };

  // 【　】の空欄を目立たせた段落
  function rich(tag, text, cls) {
    const e = el(tag, null, cls);
    String(text || '').split(/(【[^】]*】)/).filter(Boolean).forEach((part) => {
      e.append(/^【/.test(part) ? el('span', part, 'pl-blank') : document.createTextNode(part));
    });
    return e;
  }

  function list(items, tag = 'ul') {
    const ul = el(tag);
    for (const x of items || []) ul.append(rich('li', x));
    return ul;
  }

  function table(head, rows, cls = 'pl-tbl') {
    const t = el('table', null, cls);
    const thead = el('thead');
    const tr = el('tr');
    head.forEach((h) => tr.append(el('th', h)));
    thead.append(tr);
    const tb = el('tbody');
    for (const r of rows) {
      const row = el('tr');
      r.forEach((c) => row.append(c instanceof Node ? (() => { const td = el('td'); td.append(c); return td; })() : rich('td', c)));
      tb.append(row);
    }
    t.append(thead, tb);
    return t;
  }

  function tile(title, body, cls = '') {
    const d = el('div', null, `pl-tile ${cls}`);
    d.append(el('b', title));
    d.append(Array.isArray(body) ? list(body) : rich('p', body));
    return d;
  }

  // 表示する節の一覧（plan-docx.js と共通。画面・Word・テキストで同じ順番にする）
  const blocks = (plan) => window.planBlocks(plan);

  function blockBody(plan, blk) {
    const f = document.createDocumentFragment();
    switch (blk.kind) {
      case 'summary': f.append(rich('p', plan.summary, 'pl-summary-box')); break;
      case 'market': {
        if ((plan.marketData || []).length) {
          f.append(table(['データ', '出典'], plan.marketData.map((m) => {
            const a = el('a', m.source || '出典');
            a.href = m.url;
            a.target = '_blank';
            a.rel = 'noopener nofollow';
            return [m.fact, a];
          })));
        }
        if (plan.marketInsight) f.append(rich('p', `示唆：${plan.marketInsight}`, 'pl-insight'));
        break;
      }
      case '3c': {
        const g = el('div', null, 'pl-grid3');
        g.append(tile('Customer（顧客）', plan.threeC.customer), tile('Competitor（競合）', plan.threeC.competitor), tile('Company（自社）', plan.threeC.company));
        f.append(g);
        break;
      }
      case 'swot': {
        const g = el('div', null, 'pl-grid2');
        g.append(tile('Strengths（強み）', plan.swot.strengths, 'pl-swot-s'), tile('Weaknesses（弱み）', plan.swot.weaknesses, 'pl-swot-w'),
          tile('Opportunities（機会）', plan.swot.opportunities, 'pl-swot-o'), tile('Threats（脅威）', plan.swot.threats, 'pl-swot-t'));
        f.append(g);
        break;
      }
      case 'target': {
        const g = el('div', null, 'pl-grid2');
        g.append(tile('狙う顧客像', plan.target.persona), tile('顧客のニーズ', plan.target.needs));
        f.append(g);
        break;
      }
      case 'logic': f.append(table(['課題', '施策（補助事業の取組）', '効果'], plan.logic.map((x) => [x.issue, `→ ${x.action}`, `→ ${x.effect}`]), 'pl-tbl pl-logic')); break;
      case 'text': f.append(rich('p', blk.body)); break;
      case 'kpi': f.append(table(['指標', '現状', '目標', '時期'], plan.kpis.map((x) => [x.indicator, x.current, x.target, x.timing]))); break;
      case 'budget': f.append(table(['経費の項目', '使いみち', '金額の目安'], plan.budget.map((x) => [x.item, x.purpose, x.amount]))); break;
      case 'schedule': f.append(table(['時期', '実施する内容'], plan.schedule.map((x) => [x.period, x.task]))); break;
      case 'risks': f.append(table(['想定されるリスク', '対策'], plan.risks.map((x) => [x.risk, x.measure]))); break;
      case 'questions': f.append(list(plan.questions, 'ol')); break;
      default: break;
    }
    return f;
  }

  function render(plan) {
    last = plan;
    document.getElementById('pl-cover-sub').textContent = plan.subsidy;
    const title = document.getElementById('pl-result-h');
    if (title) title.textContent = plan.mode === 'detailed' ? '事業計画づくりシート（下書き）' : '事業計画書の下書き（たたき台）';
    const sheet = document.getElementById('pl-sheet');
    sheet.replaceChildren();
    blocks(plan).forEach((blk, i) => {
      const sec = el('section', null, `pl-sec${blk.kind === 'questions' ? ' pl-q' : ''}`);
      const h = el('h3');
      h.append(el('span', String(i + 1).padStart(2, '0'), 'no'), document.createTextNode(blk.title));
      sec.append(h);
      if (blk.sub) sec.append(el('p', blk.sub, 'pl-sub'));
      sec.append(blockBody(plan, blk));
      sheet.append(sec);
    });
    result.hidden = false;
  }

  const fileBase = (plan) => (plan.mode === 'detailed' ? '事業計画づくりシート_下書き' : '事業計画書_下書き');

  function asText(plan) {
    const L = [`【${plan.subsidy}】${plan.mode === 'detailed' ? '事業計画づくりシート（下書き）' : '事業計画書の下書き（たたき台）'}`, '※AIが作成した下書きです。そのまま提出せず、ご自身の言葉で書き直し、事実と数字を確かめてください。', ''];
    blocks(plan).forEach((blk, i) => {
      L.push(`■ ${String(i + 1).padStart(2, '0')} ${blk.title}`);
      switch (blk.kind) {
        case 'summary': L.push(plan.summary); break;
        case 'market': (plan.marketData || []).forEach((m) => L.push(`・${m.fact}（${m.source} ${m.url}）`)); if (plan.marketInsight) L.push(`示唆：${plan.marketInsight}`); break;
        case '3c': L.push(`顧客：${plan.threeC.customer}`, `競合：${plan.threeC.competitor}`, `自社：${plan.threeC.company}`); break;
        case 'swot': [['強み', 'strengths'], ['弱み', 'weaknesses'], ['機会', 'opportunities'], ['脅威', 'threats']].forEach(([n, k]) => L.push(`${n}：${(plan.swot[k] || []).join('／')}`)); break;
        case 'target': L.push(plan.target.persona, ...plan.target.needs.map((x) => `・${x}`)); break;
        case 'logic': plan.logic.forEach((x) => L.push(`・${x.issue} → ${x.action} → ${x.effect}`)); break;
        case 'text': L.push(blk.body); break;
        case 'kpi': plan.kpis.forEach((x) => L.push(`・${x.indicator}：現状 ${x.current} → 目標 ${x.target}（${x.timing}）`)); break;
        case 'budget': plan.budget.forEach((x) => L.push(`・${x.item}：${x.purpose}（${x.amount}）`)); break;
        case 'schedule': plan.schedule.forEach((x) => L.push(`・${x.period}：${x.task}`)); break;
        case 'risks': plan.risks.forEach((x) => L.push(`・${x.risk} → ${x.measure}`)); break;
        case 'questions': plan.questions.forEach((q, n) => L.push(`${n + 1}. ${q}`)); break;
        default: break;
      }
      L.push('');
    });
    L.push('作成：補助金ネット 事業計画書AI下書き（https://hojyokin.net/plan.html）');
    return L.join('\n');
  }

  // 前回作った下書きは、すぐには表示せず「開く」のリンクだけ出す（ページを開くたびに結果が並ばないように）
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || 'null');
    const bar = document.getElementById('pl-saved');
    if (saved && saved.plan && bar) {
      const d = new Date(saved.at || Date.now());
      bar.querySelector('[data-date]').textContent = `${d.getMonth() + 1}月${d.getDate()}日`;
      bar.hidden = false;
      bar.querySelector('button').addEventListener('click', () => {
        render(saved.plan);
        bar.hidden = true;
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  } catch { /* 保存できない環境では何もしない */ }


  function download(bytes, type, name) {
    const url = URL.createObjectURL(new Blob([bytes], { type }));
    const a = el('a');
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  document.getElementById('pl-word').addEventListener('click', () => {
    if (!last || typeof window.planToDocxBytes !== 'function') return;
    const d = new Date();
    download(window.planToDocxBytes(last, `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`),
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', `${fileBase(last)}.docx`);
    if (typeof gtag === 'function') gtag('event', 'plan_docx');
  });

  document.getElementById('pl-copy').addEventListener('click', async (e) => {
    if (!last) return;
    try {
      await navigator.clipboard.writeText(asText(last));
      e.target.textContent = 'コピーしました';
    } catch {
      e.target.textContent = 'コピーできませんでした';
    }
    setTimeout(() => { e.target.textContent = 'テキストをコピー'; }, 2000);
  });

  document.getElementById('pl-save').addEventListener('click', () => {
    if (last) download(asText(last), 'text/plain;charset=utf-8', `${fileBase(last)}.txt`);
  });

  // NDJSON を1行ずつ読み、段階の知らせで進み具合を動かし、最後の結果を返す
  async function readPlanStream(res) {
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    for (;;) {
      const { value, done } = await reader.read();
      buf += dec.decode(value || new Uint8Array(), { stream: !done });
      let nl;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, nl).trim();
        buf = buf.slice(nl + 1);
        if (!line) continue;
        const msg = JSON.parse(line);
        if (msg.mode && STAGE_SETS[msg.mode]) STAGES = STAGE_SETS[msg.mode];
        if (msg.stage) setStage(msg.stage);
        if (msg.error) throw new Error(msg.error);
        if (msg.result) return msg.result;
      }
      if (done) break;
    }
    throw new Error('下書きを受け取れませんでした。時間をおいて、もう一度お試しください。');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'pl-status';
    status.textContent = '';
    if (!form.elements.agree.checked) {
      status.className = 'pl-status err';
      status.textContent = '「ご利用の前に」への同意にチェックを入れてください。';
      return;
    }
    const body = {};
    for (const k of FIELDS) body[k] = form.elements[k].value;
    send.disabled = true;
    send.querySelector('span').textContent = '作成しています…';
    STAGES = STAGE_SETS.simple;
    startProgress();
    let ok = false;
    try {
      const res = await fetch('/api/plan', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || '下書きを作成できませんでした。時間をおいて、もう一度お試しください。');
      }
      const data = await readPlanStream(res);
      ok = true;
      stopProgress(true);
      render(data);
      try { localStorage.setItem(STORE, JSON.stringify({ plan: data, at: Date.now() })); } catch { /* 保存できなくても表示は続ける */ }
      status.textContent = '下書きができました。';
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof gtag === 'function') gtag('event', 'plan_draft', { subsidy: body.subsidy });
    } catch (err) {
      status.className = 'pl-status err';
      status.textContent = err.message;
    } finally {
      if (!ok) stopProgress(false);
      send.disabled = false;
      send.querySelector('span').textContent = '下書きを作る';
    }
  });
})();
