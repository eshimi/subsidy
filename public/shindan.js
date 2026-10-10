// 補助金診断：回答から、検索の条件と読んでおきたい解説を案内する
(function () {
  const form = document.getElementById('d-form');
  const out = document.getElementById('d-result');
  if (!form || !out) return;
  const biz = document.getElementById('d-purpose-biz');
  const per = document.getElementById('d-purpose-personal');
  const ind = document.getElementById('d-industry');
  const GUIDES = {
    sales: [['feature/jizokuka.html', '小規模事業者持続化補助金とは？']],
    digital: [['feature/digital-subsidy.html', 'デジタル補助金（デジタル化・AI導入補助金）とは？']],
    equipment: [['feature/monodukuri.html', '新事業進出・ものづくり商業サービス補助金とは？'], ['feature/growth.html', '中小企業成長加速化補助金とは？']],
    hiring: [['feature/shoryokuka.html', '中小企業省力化投資補助金とは？'], ['feature/employment.html', '雇用関係の助成金とは？']],
    green: [['grants/purposes.html', '目的別の補助金（省エネ・脱炭素）']],
    succession: [['feature/succession.html', '事業承継・M&A補助金とは？']],
    startup: [['who/startup.html', '創業・副業を始める方の補助金と支援'], ['roadmap.html', '創業のステップ']],
  };
  const WHO = { sme: ['who/sme.html', '中小企業が使える補助金・助成金'], sole: ['who/sole-proprietor.html', '個人事業主でも補助金の対象になるって、ほんと？'], startup: ['who/startup.html', '創業・副業を始める方の補助金と支援'] };
  const PERSONAL = { housing: '住まいの省エネ・リフォームの補助金', ev: '電気自動車（EV）と充電設備の補助金', kids: '子育て世帯が使える支援・給付', learning: '学び直しに使える教育訓練給付', relocation: '地方への移住で使える支援金' };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const link = ([h, t]) => `<li><a href="${h}">${esc(t)}</a></li>`;

  function toggle() {
    const personal = form.who.value === 'personal';
    biz.hidden = personal;
    ind.hidden = personal;
    per.hidden = !personal;
  }
  form.addEventListener('change', toggle);
  toggle();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const who = f.get('who');
    const pref = f.get('pref') || '';
    let html = '<h2>診断の結果</h2>';
    if (who === 'personal') {
      const k = f.get('ppurpose');
      html += `<p>個人の方向けの支援は、国のほか、お住まいの自治体の制度も多くあります。まず、次の解説を読んでください。</p><ul>${link([`personal/${k}.html`, PERSONAL[k]])}${link(['personal/index.html', '個人が使える補助金・支援の一覧'])}</ul>`;
      if (pref) html += `<p>${esc(pref)}の市区町村の制度も確認しましょう：<a href="area/index.html">市区町村別の補助金</a></p>`;
    } else {
      const purpose = f.get('purpose');
      const industry = f.get('industry') || '';
      const q = new URLSearchParams();
      if (pref) q.set('pref', pref);
      if (purpose) q.set('purpose', purpose);
      if (industry) q.set('industry', industry);
      html += `<p><strong>1. 募集中の補助金を見る</strong></p><p><a class="d-go" href="search.html?${q}">条件に合う募集中の補助金を探す →</a></p>`;
      html += `<p><strong>2. 読んでおきたい解説</strong></p><ul>${(GUIDES[purpose] || []).map(link).join('')}${link(WHO[who])}${link(['basics/flow.html', '補助金の申請の流れ'])}</ul>`;
      html += `<p><strong>3. 文章で相談しながら探す</strong></p><p><a href="ai.html">AIに相談して探す</a>（やりたい事業と郵便番号から、国・都道府県・市区町村の制度を提案）</p>`;
    }
    out.innerHTML = html;
    out.hidden = false;
    out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
