// AI補助金判定：3つのステップの質問 → 診断中の表示 → 候補の判定（ルール）＋AIのひと言 → 無料相談ページ（consult.html）へ
(function () {
  const start = document.getElementById('hj-start');
  const wizard = document.getElementById('hj-wizard');
  const stage = document.getElementById('hj-stage');
  const progress = document.getElementById('hj-progress');
  if (!start || !wizard) return;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  // 質問（選択肢はサーバーの検証 src/consult.js と同じ）
  const Q = {
    kind: { label: '事業の形態', big: true, options: [['法人', '（株式会社・合同会社など）', '🏢', '法人（株式会社・合同会社など）'], ['個人事業主', '（フリーランスを含む）', '🏪', '個人事業主（フリーランスを含む）'], ['これから創業予定', '', '💡', 'これから創業予定']] },
    employees: { label: '従業員数', hint: 'パート・アルバイトを含む、ご自身を除く目安', options: ['0人（自分だけ）', '1〜5人', '6〜20人', '21〜50人', '51〜100人', '101〜300人', '301人以上'] },
    industry: { label: '業種', options: [['製造業', '⚙️'], ['IT・情報通信', '💻'], ['建設業', '⛑️'], ['飲食業', '🍴'], ['小売業', '🛒'], ['医療・介護・保育', '❤️'], ['宿泊・観光', '🛏️'], ['農林水産業', '🌿'], ['美容・サロン', '💇'], ['その他', '⋯']] },
    topic: { label: 'どんなことに補助金を使いたいですか？', hint: 'いちばん近いもの', options: ['設備投資・機械の導入', 'IT・デジタル化', '販路開拓・集客', '人材の採用・育成・賃上げ', '正社員化・待遇の改善', '省力化・人手不足', '事業承継・M&A', '創業・新規事業', '海外展開・輸出', 'その他'] },
    koyou: { label: '雇用保険に加入していますか？', hint: '雇用関係の助成金の条件になります', options: ['加入している', '加入していない', 'わからない'] },
    shakai: { label: '社会保険（健康保険・厚生年金）に加入していますか？', options: ['加入している', '加入していない', 'わからない'] },
    timing: { label: '取り組みを始めたい時期', options: ['すぐに', '3か月以内', '半年以内', 'まだ決めていない'] },
  };
  const STEPS = [
    { say: 'まずは、事業の形態を教えてください。<br>どれに当てはまりますか？', keys: ['kind', 'employees'] },
    { say: 'ありがとうございます！<br>次に、主にどのような事業を行っていますか？当てはまるものを選んでください。', keys: ['industry', 'topic'] },
    { say: 'あと少しです！<br>雇用や保険の状況と、始めたい時期を教えてください。', keys: ['koyou', 'shakai', 'timing'] },
  ];

  // 候補の制度（金額・補助率は2026年10月時点の公募要領などをもとにした目安）
  const PROGRAMS = {
    jizokuka: { name: '小規模事業者持続化補助金', href: 'feature/jizokuka.html', img: 'images/hantei/photo-shop.webp', tags: ['販路開拓', 'Web・広告', '店舗改装'], desc: 'チラシ・ホームページ・店舗の改装など、販路開拓の取り組みを支援する、小規模な事業者向けの補助金です。', max: '250万円', maxNote: '通常枠は50万円。特例の上乗せを含む最大額', target: '小規模事業者', rate: '2/3（一部3/4）', period: '年に数回' },
    digital: { name: 'デジタル化・AI導入補助金', href: 'feature/digital-subsidy.html', img: 'images/hantei/photo-laptop.webp', tags: ['ITツール導入', '業務効率化'], desc: '会計・予約・POSレジなど、登録されたITツールの導入を支援する補助金です（旧IT導入補助金）。', max: '450万円', maxNote: '通常枠の最大額', target: '中小企業・小規模事業者', rate: '1/2〜4/5', period: '締切が年に複数回' },
    monodukuri: { name: '新事業進出・ものづくり商業サービス補助金', href: 'feature/monodukuri.html', img: 'images/hantei/photo-factory.webp', tags: ['新製品・新事業', '設備投資'], desc: '新しい製品・サービスの開発や新事業への進出、海外展開のための設備投資を支援する補助金です。', max: '9,000万円', maxNote: '枠・従業員数・特例で異なる', target: '中小企業・小規模事業者', rate: '1/2〜2/3', period: '年に数回' },
    shoryokuka: { name: '中小企業省力化投資補助金', icon: '🤖', href: 'feature/shoryokuka.html', tags: ['人手不足', '省力化設備'], desc: '人手不足を補う機械・ロボット・システムなどの導入を支援する補助金です。', max: '8,000万円', maxNote: '一般型・従業員101人以上の場合', target: '中小企業・小規模事業者', rate: '1/2〜2/3', period: '一般型は年に数回、カタログ注文型は随時' },
    succession: { name: '事業承継・M&A補助金', icon: '🤝', href: 'feature/succession.html', tags: ['事業承継', 'M&A'], desc: '事業の引き継ぎや、M&Aに伴う専門家の費用・設備投資などを支援する補助金です。', max: '2,000万円', maxNote: '枠・要件で異なる', target: '中小企業・小規模事業者', rate: '1/2〜2/3', period: '年に数回' },
    growth: { name: '中小企業成長加速化補助金', icon: '📈', href: 'feature/growth.html', tags: ['大規模投資', '賃上げ'], desc: '売上高100億円を目指す企業の、1億円以上の大規模な設備投資を支援する補助金です。', max: '5億円', maxNote: '', target: '売上高10億〜100億円の中小企業', rate: '1/2', period: '年に数回' },
    employment: { name: '雇用関係の助成金', icon: '👥', href: 'feature/employment.html', tags: ['正社員化', '人材育成', '賃上げ'], desc: 'キャリアアップ助成金・人材開発支援助成金・業務改善助成金など、正社員化や訓練、賃上げを支援します。', max: '制度で異なる', maxNote: '業務改善助成金は最大600万円', target: '雇用保険の適用事業所', rate: '制度で異なる', period: '制度ごとに受付' },
    startup: { name: '創業向けの支援', icon: '🌱', href: 'who/startup.html', tags: ['創業', '開業準備'], desc: '持続化補助金の創業型、自治体の創業補助金、創業融資など、これから事業を始める方向けの支援です。', max: '200万円', maxNote: '持続化補助金〈創業型〉の場合', target: '創業前後の方', rate: '2/3', period: '制度で異なる' },
  };

  const answers = {};
  let step = 0;

  const valueOf = (o) => (Array.isArray(o) ? (o[3] || o[0]) : o);

  function setProgress(n) {
    [...progress.children].forEach((li, i) => {
      li.className = i < n ? 'done' : i === n ? 'now' : '';
      if (i === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
  }

  function question(key) {
    const q = Q[key];
    const opts = q.options.map((o) => {
      const v = valueOf(o);
      const pressed = answers[key] === v ? 'true' : 'false';
      if (q.big) return `<button type="button" class="hj-opt" data-k="${key}" data-v="${esc(v)}" aria-pressed="${pressed}"><i aria-hidden="true">${o[2]}</i><span>${esc(o[0])}${o[1] ? `<br><small>${esc(o[1])}</small>` : ''}</span></button>`;
      if (Array.isArray(o)) return `<button type="button" class="hj-opt" data-k="${key}" data-v="${esc(v)}" aria-pressed="${pressed}"><i aria-hidden="true">${o[1]}</i><span>${esc(o[0])}</span></button>`;
      return `<button type="button" class="hj-opt" data-k="${key}" data-v="${esc(v)}" aria-pressed="${pressed}"><span>${esc(o)}</span></button>`;
    }).join('');
    return `<fieldset class="hj-q"><legend>${esc(q.label)}${q.hint ? `<small>（${esc(q.hint)}）</small>` : ''}</legend><div class="hj-opts${q.big ? ' big' : ''}">${opts}</div></fieldset>`;
  }

  function showStep() {
    const s = STEPS[step];
    setProgress(step);
    stage.innerHTML = `<div class="hj-ask"><img src="images/hantei/robot-ask.webp" alt="" width="163" height="142"><div class="hj-bubble">${s.say}</div></div>
      ${s.keys.map(question).join('')}
      <div class="hj-nav"><button type="button" class="hj-ghost" id="hj-back">← 戻る</button><button type="button" class="hj-primary" id="hj-next">${step === STEPS.length - 1 ? '診断する' : '次へ進む'} <span aria-hidden="true">→</span></button></div>`;
    updateNext();
  }

  function updateNext() {
    const next = document.getElementById('hj-next');
    if (next) next.disabled = !STEPS[step].keys.every((k) => answers[k]);
  }

  stage.addEventListener('click', (e) => {
    const opt = e.target.closest('.hj-opt');
    if (opt) {
      answers[opt.dataset.k] = opt.dataset.v;
      opt.closest('.hj-opts').querySelectorAll('.hj-opt').forEach((b) => b.setAttribute('aria-pressed', String(b === opt)));
      updateNext();
      return;
    }
    if (e.target.closest('#hj-back')) {
      if (step === 0) { wizard.hidden = true; start.hidden = false; start.scrollIntoView({ block: 'start' }); return; }
      step--; showStep(); wizard.scrollIntoView({ block: 'start' });
      return;
    }
    if (e.target.closest('#hj-next')) {
      if (!STEPS[step].keys.every((k) => answers[k])) return;
      step++;
      if (step < STEPS.length) { showStep(); wizard.scrollIntoView({ block: 'start' }); } else judge();
      return;
    }
    if (e.target.closest('#hj-again')) {
      for (const k of Object.keys(answers)) delete answers[k];
      step = 0; showStep(); wizard.scrollIntoView({ block: 'start' });
    }
  });

  document.getElementById('hj-begin').addEventListener('click', () => {
    start.hidden = true; wizard.hidden = false; step = 0; showStep(); wizard.scrollIntoView({ block: 'start' });
  });

  // ルールによる候補の判定（AIの前に、根拠のはっきりした候補を選ぶ）
  function candidatesOf(a) {
    const small = ['0人（自分だけ）', '1〜5人', '6〜20人'].includes(a.employees);
    const map = {
      '設備投資・機械の導入': ['monodukuri', 'shoryokuka'],
      'IT・デジタル化': ['digital'],
      '販路開拓・集客': small ? ['jizokuka', 'digital'] : ['monodukuri', 'digital'],
      '人材の採用・育成・賃上げ': ['employment', 'shoryokuka'],
      '正社員化・待遇の改善': ['employment'],
      '省力化・人手不足': ['shoryokuka', 'digital'],
      '事業承継・M&A': ['succession'],
      '創業・新規事業': small ? ['startup', 'jizokuka', 'monodukuri'] : ['monodukuri'],
      '海外展開・輸出': ['monodukuri'],
      'その他': small ? ['jizokuka', 'digital'] : ['monodukuri', 'shoryokuka'],
    };
    const list = [...(map[a.topic] || [])];
    if (a.kind === 'これから創業予定' && !list.includes('startup')) list.unshift('startup');
    if (a.koyou === '加入している' && !list.includes('employment') && a.employees !== '0人（自分だけ）') list.push('employment');
    if (['51〜100人', '101〜300人'].includes(a.employees) && a.topic === '設備投資・機械の導入') list.push('growth');
    if (small && a.kind !== 'これから創業予定' && list.length < 3 && !list.includes('jizokuka')) list.push('jizokuka');
    if (list.length < 3 && !list.includes('digital')) list.push('digital');
    return [...new Set(list)].slice(0, 4);
  }

  function notesOf(a, list) {
    const n = [];
    if (list.includes('employment') && a.koyou !== '加入している') n.push('雇用関係の助成金は、雇用保険の適用事業所であることが条件です。加入の状況を確認してください。');
    if (a.topic === '正社員化・待遇の改善' && a.shakai !== '加入している') n.push('正社員化の助成金では、社会保険の加入が関係することがあります。');
    if (a.employees === '301人以上') n.push('従業員が多い場合、業種によっては中小企業の範囲を超え、対象外になる制度があります。');
    if (a.kind === 'これから創業予定') n.push('創業前は、開業してから申請できる補助金もあります。開業の時期と公募の時期を確認してください。');
    if (a.timing === 'すぐに') n.push('多くの補助金は、交付決定の前に発注・契約した費用が対象外になります。発注の前に申請の時期を確認してください。');
    return n;
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function judge() {
    setProgress(3);
    stage.innerHTML = `<div class="hj-loading">
        <img src="images/hantei/robot-search.webp" alt="" width="390" height="205">
        <h2>あなたの回答をもとに<br>補助金を診断しています…</h2>
        <ol class="hj-steps-list"><li>回答を各制度の条件と照らし合わせ中</li><li>候補の補助金を絞り込み中</li><li>AIがひと言アドバイスを作成中</li></ol>
        <div class="hj-bar"><span></span></div>
      </div>`;
    wizard.scrollIntoView({ block: 'start' });
    const keys = candidatesOf(answers);
    const names = keys.map((k) => PROGRAMS[k].name);
    const ai = fetch('/api/judge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...answers, candidates: names }) })
      .then((r) => r.json().then((j) => (r.ok && j.comment ? j.comment : '')))
      .catch(() => '');
    requestAnimationFrame(() => { const bar = stage.querySelector('.hj-bar span'); if (bar) bar.style.width = '100%'; });
    const items = [...stage.querySelectorAll('.hj-steps-list li')];
    for (const li of items) { await wait(650); li.classList.add('on'); }
    await wait(400);
    render(keys, names);
    const comment = await Promise.race([ai, wait(15000).then(() => '')]);
    const box = document.getElementById('hj-ai');
    if (!box) return;
    if (comment) box.querySelector('p').textContent = comment;
    else box.remove();
  }

  function card(k, i) {
    const p = PROGRAMS[k];
    const thumb = p.img ? `<img class="hj-thumb" src="${p.img}" alt="" width="150" height="112" loading="lazy">` : `<div class="hj-thumb icon" aria-hidden="true">${p.icon}</div>`;
    return `<li class="hj-r">
        ${i === 0 ? '<span class="hj-no1"><span><small>おすすめ度</small>No.1</span></span>' : ''}
        ${thumb}
        <div>
          <h3><a href="${p.href}">${esc(p.name)}</a></h3>
          <ul class="hj-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <p>${esc(p.desc)}</p>
          <dl class="hj-meta"><div><dt>対象</dt><dd>${esc(p.target)}</dd></div><div><dt>補助率</dt><dd>${esc(p.rate)}</dd></div><div><dt>公募</dt><dd>${esc(p.period)}</dd></div></dl>
        </div>
        <div class="hj-max"><small>最大補助額</small><b>${esc(p.max)}</b>${p.maxNote ? `<em>${esc(p.maxNote)}</em>` : ''}<a class="hj-more" href="${p.href}">詳しく見る ›</a></div>
      </li>`;
  }

  function render(keys, names) {
    const notes = notesOf(answers, keys);
    const ind = { '飲食業': 'food', '小売業': 'retail', '美容・サロン': 'beauty', '建設業': 'construction', '製造業': 'manufacturing', 'IT・情報通信': 'it', '宿泊・観光': 'tourism', '農林水産業': 'agriculture', '医療・介護・保育': 'care' }[answers.industry];
    const consult = `consult.html?${new URLSearchParams({ ...answers, c: names.join('|') })}`;
    stage.innerHTML = `<h2 class="hj-rhead">診断結果 <span aria-hidden="true">✨</span></h2>
      <p class="hj-rlead">あなたにおすすめの補助金を <b>${keys.length}</b> 件ご紹介します。気になる補助金をクリックして、詳細をチェックしてみてください。</p>
      <ol class="hj-rlist">${keys.map(card).join('')}</ol>
      <p class="hj-fine">金額・補助率は、2026年10月時点の公募要領などをもとにした目安です。公募回・枠・要件で変わるため、申請の前に必ず公式の公募要領で確認してください。</p>
      ${notes.length ? `<ul class="hj-notes">${notes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      <div class="hj-ai" id="hj-ai"><img src="images/hantei/robot-ask.webp" alt="" width="56" height="49"><div><b>AIのひと言</b><p style="margin:0;">回答をもとに、ひと言アドバイスを準備しています…</p></div></div>
      ${ind ? `<p><a href="search.html?${new URLSearchParams({ industry: ind })}">${esc(answers.industry)}に関係しそうな、募集中の補助金を見る →</a></p>` : ''}
      <p><a href="cases/index.html">補助金を使って課題を乗り越えた事業者の活用事例を読む →</a></p>
      <div class="hj-cta-wrap">
        <img src="images/hantei/robot-done.webp" alt="" width="195" height="183">
        <div class="hj-bubble">診断おつかれさまでした！<br>より詳しいご提案や、申請のご相談をご希望の方は、無料相談をご利用ください。</div>
        <div class="hj-cta">
          <span class="hj-free">相談は<br>完全無料</span>
          <h3>補助金に詳しい専門家が<br>あなたの事業に合う補助金をご提案します</h3>
          <ul class="hj-feats"><li><i aria-hidden="true">📋</i>合いそうな補助金を<br>個別にご提案</li><li><i aria-hidden="true">🗂️</i>申請の進め方を<br>ご案内</li><li><i aria-hidden="true">📞</i>お電話・メールで<br>気軽にご相談</li></ul>
          <a class="hj-orange" href="${consult}">無料で相談する <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div class="hj-restart"><button type="button" id="hj-again">最初からやり直す</button></div>`;
    wizard.scrollIntoView({ block: 'start' });
  }
})();
