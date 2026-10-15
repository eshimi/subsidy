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

// 事業者向け（AI判定）／個人向け（住まい・車・子育てなどの案内）の切り替え。?for=personal または #personal で個人向けから開く
(function () {
  const biz = document.getElementById('hj-biz');
  const per = document.getElementById('hj-personal');
  const tabs = [...document.querySelectorAll('.hj-aud button')];
  if (!biz || !per || !tabs.length) return;
  const show = (aud, push) => {
    const personal = aud === 'p';
    biz.hidden = personal;
    per.hidden = !personal;
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.aud === aud)));
    if (push) {
      const u = new URL(location.href);
      if (personal) u.searchParams.set('for', 'personal'); else u.searchParams.delete('for');
      u.hash = '';
      history.replaceState(null, '', u);
    }
  };
  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.aud, true)));
  const q = new URLSearchParams(location.search).get('for');
  show(q === 'personal' || location.hash === '#personal' ? 'p' : 'b', false);
})();

// 個人向けのAI判定：2つの質問（住まい・世帯／使いたいこと）→ 診断中 → 分野ごとの案内（国の制度ページ＋お住まいの県の制度）＋AIのひと言
(function () {
  const start = document.getElementById('hp-start');
  const wizard = document.getElementById('hp-wizard');
  const stage = document.getElementById('hp-stage');
  const progress = document.getElementById('hp-progress');
  if (!start || !wizard) return;
  start.hidden = false;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const PREFS = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];

  // 選択肢はサーバーの検証 src/consult.js の PERSONAL_OPTIONS と同じ
  const HOME = [['持ち家（一戸建て）', '🏠'], ['持ち家（マンションなど）', '🏢'], ['賃貸', '🔑'], ['これから購入・新築する', '🏗️'], ['空き家を持っている', '🏚️']];
  const FAMILY = ['子育て中（18歳未満の子がいる）', '妊娠中・これから子どもを考えている', '高齢の家族と同居・介護している', 'ひとり暮らし', 'その他'];
  // 分野：国の制度の解説ページと、都道府県の制度を探すときの言葉
  const TOPICS = {
    '耐震・リフォーム': { icon: '🛠️', href: 'personal/seismic.html', word: '耐震', desc: '耐震診断・耐震改修（リフォーム）の費用の一部を支援する制度です。自治体ごとの制度が中心です。' },
    '省エネ住宅・断熱': { icon: '🏠', href: 'personal/housing.html', word: '省エネ', desc: '断熱窓・給湯器・省エネ住宅の新築など、住まいの省エネ化を支援する国の制度と、自治体の制度があります。' },
    '太陽光・蓄電池': { icon: '☀️', href: 'personal/solar.html', word: '太陽光', desc: '家庭用の太陽光発電・蓄電池の導入を支援する制度です。国より、自治体の補助が中心です。' },
    '電気自動車（EV）': { icon: '🚗', href: 'personal/ev.html', word: 'EV', desc: '電気自動車・プラグインハイブリッド車の購入や、充電設備・V2Hの導入を支援する制度です。' },
    'バリアフリー・介護': { icon: '♿', href: 'personal/seismic.html', word: 'バリアフリー', desc: '手すりの設置や段差の解消など、高齢の方の住まいの改修を支援する制度です。介護保険の住宅改修もあります。' },
    '空き家・ブロック塀': { icon: '🏚️', href: 'area/index.html', word: '空き家', desc: '空き家の改修・解体、危険なブロック塀の撤去などを支援する、自治体の制度です。' },
    '子育て': { icon: '👶', href: 'personal/kids.html', word: '子育て', desc: '児童手当、妊娠・出産・子育ての支援です。お住まいの自治体の独自の制度もあります。' },
    '学び直し': { icon: '📚', href: 'personal/learning.html', word: '', desc: '教育訓練給付など、講座の費用の一部を支援する国の制度です。' },
    '地方への移住': { icon: '🏡', href: 'personal/relocation.html', word: '移住', desc: '移住支援金など、地方へ移住するときや、移住して起業するときの支援です。' },
  };
  const STEPS = [
    { say: 'まずは、お住まいと世帯について教えてください。', keys: ['home', 'family', 'pref'] },
    { say: 'ありがとうございます！<br>使いたいことを選んでください（いくつでも選べます）。', keys: ['topics'] },
  ];
  const answers = { topics: [] };
  let step = 0;

  const setProgress = (n) => [...progress.children].forEach((li, i) => { li.className = i < n ? 'done' : i === n ? 'now' : ''; });
  const single = (key, label, opts, big) => `<fieldset class="hj-q"><legend>${esc(label)}</legend><div class="hj-opts${big ? ' big' : ''}">${opts.map((o) => {
    const [v, ic] = Array.isArray(o) ? o : [o, ''];
    return `<button type="button" class="hj-opt" data-k="${key}" data-v="${esc(v)}" aria-pressed="${answers[key] === v}">${ic ? `<i aria-hidden="true">${ic}</i>` : ''}<span>${esc(v)}</span></button>`;
  }).join('')}</div></fieldset>`;

  function showStep() {
    setProgress(step);
    const body = step === 0
      ? `${single('home', 'お住まいの形態', HOME, true)}${single('family', '世帯の状況（いちばん近いもの）', FAMILY)}
         <fieldset class="hj-q"><legend>お住まいの都道府県</legend><select id="hp-pref" style="font:inherit;padding:10px 12px;border:1px solid #c9d4e0;border-radius:10px;"><option value="">選んでください</option>${PREFS.map((p) => `<option${answers.pref === p ? ' selected' : ''}>${p}</option>`).join('')}</select></fieldset>`
      : `<fieldset class="hj-q"><legend>どんなことに補助金を使いたいですか？<small>（複数選べます）</small></legend><div class="hj-opts">${Object.entries(TOPICS).map(([k, t]) => `<button type="button" class="hj-opt" data-multi="${esc(k)}" aria-pressed="${answers.topics.includes(k)}"><i aria-hidden="true">${t.icon}</i><span>${esc(k)}</span></button>`).join('')}</div></fieldset>`;
    stage.innerHTML = `<div class="hj-ask"><img src="images/hantei/robot-ask.webp" alt="" width="163" height="142"><div class="hj-bubble">${STEPS[step].say}</div></div>${body}
      <div class="hj-nav"><button type="button" class="hj-ghost" id="hp-back">← 戻る</button><button type="button" class="hj-primary" id="hp-next">${step === 1 ? '診断する' : '次へ進む'} <span aria-hidden="true">→</span></button></div>`;
    updateNext();
  }
  const ready = () => (step === 0 ? answers.home && answers.family && answers.pref : answers.topics.length > 0);
  function updateNext() { const n = document.getElementById('hp-next'); if (n) n.disabled = !ready(); }
  const top = () => wizard.scrollIntoView({ block: 'start' });

  stage.addEventListener('change', (e) => { if (e.target.id === 'hp-pref') { answers.pref = e.target.value; updateNext(); } });
  stage.addEventListener('click', (e) => {
    const opt = e.target.closest('.hj-opt');
    if (opt && opt.dataset.k) {
      answers[opt.dataset.k] = opt.dataset.v;
      opt.closest('.hj-opts').querySelectorAll('.hj-opt').forEach((b) => b.setAttribute('aria-pressed', String(b === opt)));
      updateNext(); return;
    }
    if (opt && opt.dataset.multi) {
      const k = opt.dataset.multi;
      answers.topics = answers.topics.includes(k) ? answers.topics.filter((x) => x !== k) : [...answers.topics, k];
      opt.setAttribute('aria-pressed', String(answers.topics.includes(k)));
      updateNext(); return;
    }
    if (e.target.closest('#hp-back')) {
      if (step === 0) { wizard.hidden = true; start.hidden = false; start.scrollIntoView({ block: 'start' }); return; }
      step--; showStep(); top(); return;
    }
    if (e.target.closest('#hp-next')) {
      if (!ready()) return;
      step++;
      if (step < STEPS.length) { showStep(); top(); } else judge();
      return;
    }
    if (e.target.closest('#hp-again')) { answers.topics = []; delete answers.home; delete answers.family; delete answers.pref; step = 0; showStep(); top(); }
  });
  document.getElementById('hp-begin').addEventListener('click', () => { start.hidden = true; wizard.hidden = false; step = 0; showStep(); top(); });

  // 回答から、見落としやすい分野を足す（ルール）
  function topicsOf(a) {
    const list = [...a.topics];
    if (a.family.startsWith('子育て') || a.family.startsWith('妊娠')) { if (!list.includes('子育て')) list.push('子育て'); }
    if (a.family.startsWith('高齢') && !list.includes('バリアフリー・介護')) list.push('バリアフリー・介護');
    if (a.home === '空き家を持っている' && !list.includes('空き家・ブロック塀')) list.push('空き家・ブロック塀');
    return list;
  }
  function notesOf(a) {
    const n = ['多くの補助金は、契約・着工・購入の前に申請が必要です。先に工事や購入をすると、対象外になることがあります。'];
    if (a.home === '賃貸') n.push('賃貸の住まいは、工事や設備の設置に、大家さん・管理会社の承諾が必要です。対象にならない制度もあります。');
    if (a.home === '持ち家（マンションなど）') n.push('マンションは、窓や共用部分の工事に管理組合の決議が必要になることがあります。');
    if (a.home === 'これから購入・新築する') n.push('新築・購入では、住宅の性能（省エネ基準など）が条件になる制度があります。契約の前に確認してください。');
    n.push('国の制度と、自治体の制度は、併用できる場合も、できない場合もあります。それぞれの要綱で確認してください。');
    return n;
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function judge() {
    setProgress(2);
    stage.innerHTML = `<div class="hj-loading"><img src="images/hantei/robot-search.webp" alt="" width="390" height="205"><h2>あなたの回答をもとに<br>補助金を診断しています…</h2>
      <ol class="hj-steps-list"><li>回答をもとに、分野を絞り込み中</li><li>お住まいの地域の制度を確認中</li><li>AIがひと言アドバイスを作成中</li></ol><div class="hj-bar"><span></span></div></div>`;
    top();
    const keys = topicsOf(answers);
    const ai = fetch('/api/judge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ for: 'personal', home: answers.home, family: answers.family, pref: answers.pref, topics: keys }) })
      .then((r) => r.json().then((j) => (r.ok && j.comment ? j.comment : ''))).catch(() => '');
    requestAnimationFrame(() => { const bar = stage.querySelector('.hj-bar span'); if (bar) bar.style.width = '100%'; });
    for (const li of stage.querySelectorAll('.hj-steps-list li')) { await wait(600); li.classList.add('on'); }
    await wait(300);
    render(keys);
    const comment = await Promise.race([ai, wait(15000).then(() => '')]);
    const box = document.getElementById('hp-ai');
    if (!box) return;
    if (comment) box.querySelector('p').textContent = comment; else box.remove();
  }

  function card(k, i) {
    const t = TOPICS[k];
    const q = new URLSearchParams({ aud: 'p', pref: answers.pref, ...(t.word ? { q: t.word } : {}) });
    return `<li class="hj-r">
        ${i === 0 ? '<span class="hj-no1"><span><small>まず</small>No.1</span></span>' : ''}
        <div class="hj-thumb icon" aria-hidden="true">${t.icon}</div>
        <div><h3><a href="${t.href}">${esc(k)}の補助金</a></h3><p>${esc(t.desc)}</p></div>
        <div class="hj-max"><a class="hj-more" href="${t.href}">国の制度を見る ›</a><a class="hj-more" href="search.html?${q}">${esc(answers.pref)}の制度を探す ›</a></div>
      </li>`;
  }

  function render(keys) {
    stage.innerHTML = `<h2 class="hj-rhead">診断結果 <span aria-hidden="true">✨</span></h2>
      <p class="hj-rlead">あなたに合いそうな分野を <b>${keys.length}</b> 件ご紹介します。「国の制度」と、${esc(answers.pref)}の制度の両方を確認してみてください。</p>
      <ol class="hj-rlist">${keys.map(card).join('')}</ol>
      <ul class="hj-notes">${notesOf(answers).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="hj-ai" id="hp-ai"><img src="images/hantei/robot-ask.webp" alt="" width="56" height="49"><div><b>AIのひと言</b><p style="margin:0;">回答をもとに、ひと言アドバイスを準備しています…</p></div></div>
      <p><a href="${PREF_PAGE(answers.pref)}">${esc(answers.pref)}の補助金まとめページ（県・市区町村の制度を一覧で）を見る →</a></p>
      <p class="hj-fine">制度の内容・金額・受付期間は変わります。申請の前に、必ず公式の情報で確認してください。</p>
      <div class="hj-restart"><button type="button" id="hp-again">最初からやり直す</button></div>`;
    top();
  }
  const SLUGS = {"北海道":"hokkaido","青森県":"aomori","岩手県":"iwate","宮城県":"miyagi","秋田県":"akita","山形県":"yamagata","福島県":"fukushima","茨城県":"ibaraki","栃木県":"tochigi","群馬県":"gunma","埼玉県":"saitama","千葉県":"chiba","東京都":"tokyo","神奈川県":"kanagawa","新潟県":"niigata","富山県":"toyama","石川県":"ishikawa","福井県":"fukui","山梨県":"yamanashi","長野県":"nagano","岐阜県":"gifu","静岡県":"shizuoka","愛知県":"aichi","三重県":"mie","滋賀県":"shiga","京都府":"kyoto","大阪府":"osaka","兵庫県":"hyogo","奈良県":"nara","和歌山県":"wakayama","鳥取県":"tottori","島根県":"shimane","岡山県":"okayama","広島県":"hiroshima","山口県":"yamaguchi","徳島県":"tokushima","香川県":"kagawa","愛媛県":"ehime","高知県":"kochi","福岡県":"fukuoka","佐賀県":"saga","長崎県":"nagasaki","熊本県":"kumamoto","大分県":"oita","宮崎県":"miyazaki","鹿児島県":"kagoshima","沖縄県":"okinawa"};
  function PREF_PAGE(p) { return `area/pref-${SLUGS[p]}.html#resident-programs`; }
})();
