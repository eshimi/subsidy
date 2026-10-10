// AI補助金判定：選択式の質問 → 候補の判定（ルール）＋AIのひと言 → 無料相談ページ（consult.html）へ
(function () {
  const log = document.getElementById('hj-log');
  const choicesEl = document.getElementById('hj-choices');
  const result = document.getElementById('hj-result');
  if (!log) return;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  // 質問の順番（選択肢はサーバーの検証 src/consult.js と同じ）
  const QUESTIONS = [
    { key: 'industry', label: '業種', ask: 'こんにちは。補助金・助成金の判定をお手伝いします。まず、業種を教えてください。', options: ['飲食業', '小売業', '美容・サロン', '建設業', '製造業', 'IT・情報通信', '宿泊・観光', '農林水産業', '医療・介護・保育', 'その他'] },
    { key: 'employees', label: '従業員数', ask: '従業員数（パート・アルバイトを含む、ご自身を除く目安）を教えてください。', options: ['0人（自分だけ）', '1〜5人', '6〜20人', '21〜50人', '51〜100人', '101〜300人', '301人以上'] },
    { key: 'koyou', label: '雇用保険の加入', ask: '雇用保険には加入していますか？（雇用関係の助成金の条件になります）', options: ['加入している', '加入していない', 'わからない'] },
    { key: 'shakai', label: '社会保険の加入', ask: '社会保険（健康保険・厚生年金）には加入していますか？', options: ['加入している', '加入していない', 'わからない'] },
    { key: 'topic', label: 'ご相談内容', ask: 'どんなことに補助金を使いたいですか？いちばん近いものを選んでください。', options: ['設備投資・機械の導入', 'IT・デジタル化', '販路開拓・集客', '人材の採用・育成・賃上げ', '正社員化・待遇の改善', '省力化・人手不足', '事業承継・M&A', '創業・新規事業', '海外展開・輸出', 'その他'] },
    { key: 'timing', label: '時期', ask: '最後に、取り組みを始めたい時期を教えてください。', options: ['すぐに', '3か月以内', '半年以内', 'まだ決めていない'] },
  ];
  const PROGRAMS = {
    jizokuka: ['小規模事業者持続化補助金', 'feature/jizokuka.html', 'チラシ・ホームページ・店舗の改装など、販路開拓の取り組みに。小規模な事業者向けです。'],
    digital: ['デジタル化・AI導入補助金', 'feature/digital-subsidy.html', '会計・予約・POSレジなど、登録されたITツールの導入に。'],
    monodukuri: ['新事業進出・ものづくり商業サービス補助金', 'feature/monodukuri.html', '新しい製品・サービスや新事業、海外展開のための設備投資に。'],
    shoryokuka: ['中小企業省力化投資補助金', 'feature/shoryokuka.html', '人手不足を補う機械・ロボットなどの導入に。'],
    succession: ['事業承継・M&A補助金', 'feature/succession.html', '事業の引き継ぎや、M&Aに伴う専門家の費用・設備投資に。'],
    growth: ['中小企業成長加速化補助金', 'feature/growth.html', '大きな成長を目指す企業の、大規模な設備投資に。'],
    employment: ['雇用関係の助成金（キャリアアップ・人材開発支援・業務改善など）', 'feature/employment.html', '正社員化、職業訓練、賃上げと設備投資などに。雇用保険の適用事業所であることが条件です。'],
    startup: ['創業向けの支援（持続化補助金の創業型、自治体の創業補助金、創業融資）', 'who/startup.html', 'これから事業を始める方向けの支援です。'],
  };
  const answers = {};
  let step = 0;

  function say(text, who = 'bot') {
    const row = document.createElement('div');
    row.className = `hj-row ${who}`;
    row.innerHTML = who === 'bot'
      ? `<img class="hj-avatar" src="images/chat/bot3.webp" alt="" width="52" height="65"><div class="hj-msg">${esc(text)}</div>`
      : `<div class="hj-msg">${esc(text)}</div>`;
    log.appendChild(row);
    row.scrollIntoView({ block: 'nearest' });
  }

  function ask() {
    const q = QUESTIONS[step];
    say(q.ask);
    choicesEl.innerHTML = q.options.map((o) => `<button type="button" class="pill" data-v="${esc(o)}">${esc(o)}</button>`).join('');
  }

  choicesEl.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-v]');
    if (!b) return;
    const q = QUESTIONS[step];
    answers[q.key] = b.dataset.v;
    say(b.dataset.v, 'user');
    choicesEl.innerHTML = '';
    step++;
    if (step < QUESTIONS.length) setTimeout(ask, 250);
    else setTimeout(judge, 250);
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
    if (a.koyou === '加入している' && !list.includes('employment') && a.employees !== '0人（自分だけ）') list.push('employment');
    if (['51〜100人', '101〜300人'].includes(a.employees) && a.topic === '設備投資・機械の導入') list.push('growth');
    return [...new Set(list)].slice(0, 4);
  }

  function notesOf(a, list) {
    const n = [];
    if (list.includes('employment') && a.koyou !== '加入している') n.push('雇用関係の助成金は、雇用保険の適用事業所であることが条件です。加入の状況を確認してください。');
    if (a.topic === '正社員化・待遇の改善' && a.shakai !== '加入している') n.push('正社員化の助成金では、社会保険の加入が関係することがあります。');
    if (a.employees === '301人以上') n.push('従業員が多い場合、業種によっては中小企業の範囲を超え、対象外になる制度があります。');
    if (a.timing === 'すぐに') n.push('多くの補助金は、交付決定の前に発注・契約した費用が対象外になります。発注の前に申請の時期を確認してください。');
    return n;
  }

  async function judge() {
    const keys = candidatesOf(answers);
    const names = keys.map((k) => PROGRAMS[k][0]);
    say('ありがとうございます。回答をもとに判定しています…');
    const notes = notesOf(answers, keys);
    const industryLink = `search.html?${new URLSearchParams({ industry: { '飲食業': 'food', '小売業': 'retail', '美容・サロン': 'beauty', '建設業': 'construction', '製造業': 'manufacturing', 'IT・情報通信': 'it', '宿泊・観光': 'tourism', '農林水産業': 'agriculture', '医療・介護・保育': 'care' }[answers.industry] || '' })}`;
    result.hidden = false;
    result.innerHTML = `<h2>判定の結果</h2>
      <p>次の制度が、検討の候補になりそうです。</p>
      <ul class="hj-cands">${keys.map((k) => `<li><b><a href="${PROGRAMS[k][1]}">${esc(PROGRAMS[k][0])}</a></b><span>${esc(PROGRAMS[k][2])}</span></li>`).join('')}</ul>
      ${notes.length ? `<ul class="hj-notes">${notes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      <div class="hj-ai" id="hj-ai">AIのひと言を準備しています…</div>
      <p><a href="${industryLink}">${esc(answers.industry)}に関係しそうな、募集中の補助金を見る →</a></p>
      <p><a class="hj-cta" href="consult.html?${new URLSearchParams({ ...answers, c: names.join('|') })}">専門家に無料で相談する →</a></p>`;
    say('判定が終わりました。下に結果を表示しています。詳しく知りたい場合は、専門家への無料相談もご利用ください。');
    try {
      const res = await fetch('/api/judge', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...answers, candidates: names }) });
      const json = await res.json();
      const box = document.getElementById('hj-ai');
      if (res.ok && json.comment) box.textContent = `AIのひと言：${json.comment}`;
      else box.remove();
    } catch {
      document.getElementById('hj-ai')?.remove();
    }
  }

  ask();
})();
