const $ = (sel) => document.querySelector(sel);
const form = $('#search-form');
const zipInput = $('#zip');
const addressHint = $('#address');
const cityField = $('.city-field');
const errorBox = $('#form-error');
const submitBtn = $('#submit');

const LEVEL_LABELS = { national: '国', prefecture: '都道府県', municipality: '市区町村', live: '募集中' };
const TYPE_ORDER = ['補助金', '助成金', '給付金', '融資', '税制・優遇', '専門家支援'];

let lastResult = null;
let activeType = 'すべて';

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function normalizeZip(v) {
  return v.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/[^0-9]/g, '');
}

// ── 入力例 ──
document.querySelectorAll('[data-example]').forEach((btn) => {
  btn.addEventListener('click', () => {
    $('#description').value = btn.dataset.example;
    $('#description').focus();
  });
});

// ── 郵便番号から住所を自動表示 ──
let zipTimer;
zipInput.addEventListener('input', () => {
  clearTimeout(zipTimer);
  const zip = normalizeZip(zipInput.value);
  if (zip.length !== 7) {
    addressHint.textContent = '事業を行う場所（予定）の郵便番号';
    addressHint.className = 'hint';
    return;
  }
  zipTimer = setTimeout(() => lookupZip(zip), 250);
});

async function lookupZip(zip) {
  addressHint.textContent = '住所を確認しています…';
  addressHint.className = 'hint';
  try {
    const res = await fetch(`/api/postal/${zip}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    if (data.city) {
      addressHint.textContent = `📍 ${data.prefecture}${data.city}${data.town ?? ''}`;
      addressHint.className = 'hint ok';
      cityField.hidden = true;
    } else {
      addressHint.textContent = `📍 ${data.prefecture}（推定）`;
      addressHint.className = 'hint warn';
      cityField.hidden = false;
    }
  } catch (e) {
    addressHint.textContent = e.message || '住所を確認できませんでした';
    addressHint.className = 'hint warn';
  }
}

// ── 検索 ──
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  errorBox.hidden = true;
  const fd = new FormData(form);
  const payload = {
    description: fd.get('description'),
    zip: normalizeZip(String(fd.get('zip') ?? '')),
    stage: fd.get('stage') || undefined,
    city: fd.get('city') || undefined,
    attributes: fd.getAll('attributes'),
  };
  if (String(payload.description).trim().length < 5) return showError('事業内容をもう少し詳しく入力してください。');
  if (payload.zip.length !== 7) return showError('郵便番号を7桁で入力してください。');

  submitBtn.disabled = true;
  submitBtn.textContent = '探しています…';
  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    lastResult = data;
    activeType = 'すべて';
    render();
    $('#results').hidden = false;
    $('#results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) {
    showError(e.message || '検索に失敗しました。時間をおいて再度お試しください。');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '支援制度を探す';
  }
});

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.hidden = false;
}

// ── 描画 ──
function render() {
  const { address, analysis, programs, live } = lastResult;
  const place = `${address.prefecture}${address.city ?? ''}`;
  const tags = [...analysis.industries, ...analysis.tags];

  $('#summary').innerHTML = `
    <h2>${esc(place)}で使えそうな支援制度 ${programs.length}件</h2>
    ${analysis.summary ? `<p>${esc(analysis.summary)}</p>` : ''}
    <div class="tags">
      ${analysis.stage ? `<span class="tag">${esc(analysis.stage.label)}</span>` : ''}
      ${tags.map((t) => `<span class="tag">${esc(t.label)}</span>`).join('')}
    </div>
    ${analysis.industries.length === 0 ? '<p class="notice">業種を特定できなかったため、業種を問わない制度を中心に表示しています。「カフェ」「アプリ開発」など具体的に書くと精度が上がります。</p>' : ''}
    ${address.source === 'estimated' ? '<p class="notice">住所サービスに接続できなかったため、郵便番号から都道府県を推定しています。</p>' : ''}
    <p class="hint">判定方法：${analysis.mode === 'ai' ? 'AI（Claude）による事業内容の解析＋キーワード判定' : 'キーワード判定'}</p>
  `;

  const types = TYPE_ORDER.filter((t) => programs.some((p) => p.type === t));
  $('#type-filters').innerHTML = ['すべて', ...types]
    .map((t) => `<button type="button" class="chip" aria-pressed="${t === activeType}" data-type="${esc(t)}">${esc(t)}</button>`)
    .join('');
  $('#type-filters').querySelectorAll('button').forEach((b) =>
    b.addEventListener('click', () => {
      activeType = b.dataset.type;
      render();
    }),
  );

  const visible = activeType === 'すべて' ? programs : programs.filter((p) => p.type === activeType);
  $('#count').textContent = `${visible.length}件を表示（関連度順）`;
  const maxScore = Math.max(...programs.map((p) => p.score), 1);
  $('#program-list').innerHTML = visible.map((p) => programCard(p, maxScore)).join('') || '<p class="card empty">該当する制度がありません。</p>';

  if (!live.available) {
    $('#live-list').innerHTML = '<p class="card empty">現在 jGrants に接続できないため、募集中の補助金を取得できませんでした。<a href="https://www.jgrants-portal.go.jp/" target="_blank" rel="noopener">jGrants で直接探す</a></p>';
  } else if (live.items.length === 0) {
    $('#live-list').innerHTML = '<p class="card empty">条件に合う募集中の補助金は見つかりませんでした。</p>';
  } else {
    $('#live-list').innerHTML = live.items.map(liveCard).join('');
  }
}

function stars(score, max) {
  const n = Math.max(1, Math.round((score / max) * 5));
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function programCard(p, maxScore) {
  return `
  <article class="card program">
    <div class="program-head">
      <span class="badge ${esc(p.level)}">${esc(LEVEL_LABELS[p.level])}</span>
      <span class="badge type">${esc(p.type)}</span>
      <span class="match" title="関連度">関連度 <b>${stars(p.score, maxScore)}</b></span>
    </div>
    <h3><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a></h3>
    <p class="provider">${esc(p.provider)}</p>
    <p class="amount">${esc(p.amount)}</p>
    <p class="summary-text">${esc(p.summary)}</p>
    <details>
      <summary>主な要件と、表示された理由</summary>
      <ul>${p.eligibility.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
      <ul class="reasons">${p.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    </details>
    <div class="link-row">
      <a href="${esc(p.url)}" target="_blank" rel="noopener">${p.urlIsSearch ? '最新の公募情報を検索 ↗' : '公式ページを見る ↗'}</a>
    </div>
  </article>`;
}

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
}

function liveCard(item) {
  const deadline = formatDate(item.deadline);
  return `
  <article class="card program">
    <div class="program-head">
      <span class="badge live">${esc(LEVEL_LABELS.live)}</span>
      ${deadline ? `<span class="match">締切 ${esc(deadline)}</span>` : ''}
    </div>
    <h3><a href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.name)}</a></h3>
    <p class="provider">対象地域：${esc(item.area || '—')}${item.employees ? ` ／ 従業員数：${esc(item.employees)}` : ''}</p>
    <p class="amount">${esc(item.amount)}</p>
    <ul class="reasons">${item.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    <div class="link-row"><a href="${esc(item.url)}" target="_blank" rel="noopener">jGrants で詳細を見る ↗</a></div>
  </article>`;
}
