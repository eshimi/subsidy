import { buildIcs, googleCalendarUrl, toJstDate } from './calendar.js';

const $ = (sel) => document.querySelector(sel);
const form = $('#search-form');
const zipInput = $('#zip');
const addressHint = $('#address');
const cityField = $('.city-field');
const errorBox = $('#form-error');
const submitBtn = $('#submit');

const LEVEL_LABELS = { national: '国', prefecture: '都道府県', municipality: '市区町村', live: '募集中' };
const TYPE_ORDER = ['補助金', '助成金', '給付金', '融資', '税制・優遇', '専門家支援'];
const SAVED_KEY = 'subsidy-finder:saved';

let lastResult = null;
let activeType = 'すべて';
const itemsById = new Map();

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function normalizeZip(v) {
  return v.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/[^0-9]/g, '');
}

function toast(message) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), 2400);
}

// ── 保存（このブラウザの localStorage） ──
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) ?? {};
  } catch {
    return {};
  }
}
function writeSaved(saved) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    return true;
  } catch {
    toast('このブラウザでは保存できませんでした');
    return false;
  }
}
function toggleSaved(item) {
  const saved = loadSaved();
  if (saved[item.id]) delete saved[item.id];
  else {
    saved[item.id] = {
      id: item.id, name: item.name, url: item.url, provider: item.provider,
      amount: item.amount, deadline: item.deadline ?? null, period: item.period ?? null, savedAt: Date.now(),
    };
  }
  if (writeSaved(saved)) {
    renderSaved();
    document.querySelectorAll(`[data-action="save"][data-id="${CSS.escape(item.id)}"]`).forEach((b) => updateSaveButton(b, !!saved[item.id]));
  }
}
function updateSaveButton(btn, on) {
  btn.setAttribute('aria-pressed', String(on));
  btn.textContent = on ? '★ 保存済み' : '☆ 保存';
}

function isUpcoming(deadline) {
  const d = toJstDate(deadline);
  if (!d) return false;
  const today = toJstDate(new Date().toISOString());
  return d >= today;
}

function formatDate(value) {
  const d = toJstDate(value);
  return d ? `${d.slice(0, 4)}年${Number(d.slice(4, 6))}月${Number(d.slice(6, 8))}日` : null;
}

function downloadIcs(items, filename) {
  const blob = new Blob([buildIcs(items)], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function renderSaved() {
  const items = Object.values(loadSaved()).sort((a, b) => b.savedAt - a.savedAt);
  $('#saved').hidden = items.length === 0;
  $('#saved-title').textContent = `保存した制度（${items.length}件）`;
  $('#saved-list').innerHTML = items
    .map((s) => {
      const dl = s.deadline ? `締切 ${formatDate(s.deadline)}${isUpcoming(s.deadline) ? '' : '（終了）'}` : s.period ?? '';
      return `<li>
        <a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>
        <span class="meta">${esc(s.amount ?? '')}${dl ? ` ／ ${esc(dl)}` : ''}</span>
        <button type="button" class="link-button remove" data-remove="${esc(s.id)}">削除</button>
      </li>`;
    })
    .join('');
  $('#saved-ics').hidden = !items.some((s) => isUpcoming(s.deadline));
}

$('#saved-list').addEventListener('click', (ev) => {
  const id = ev.target.closest('[data-remove]')?.dataset.remove;
  if (!id) return;
  const saved = loadSaved();
  delete saved[id];
  if (writeSaved(saved)) {
    renderSaved();
    document.querySelectorAll(`[data-action="save"][data-id="${CSS.escape(id)}"]`).forEach((b) => updateSaveButton(b, false));
  }
});
$('#saved-ics').addEventListener('click', () => {
  const items = Object.values(loadSaved()).filter((s) => isUpcoming(s.deadline));
  downloadIcs(items, 'subsidy-deadlines.ics');
});

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

// ── 共有用URL（検索条件をクエリパラメータに入れる） ──
function payloadToParams(p) {
  const params = new URLSearchParams();
  params.set('q', p.description);
  params.set('zip', p.zip);
  if (p.stage) params.set('stage', p.stage);
  if (p.city) params.set('city', p.city);
  if (p.attributes.length) params.set('attr', p.attributes.join(','));
  return params;
}

function restoreFromUrl() {
  const params = new URLSearchParams(location.search);
  if (!params.get('q') || !params.get('zip')) return false;
  $('#description').value = params.get('q');
  zipInput.value = params.get('zip');
  if (normalizeZip(zipInput.value).length === 7) lookupZip(normalizeZip(zipInput.value));
  $('#stage').value = params.get('stage') ?? '';
  if (params.get('city')) {
    $('#city').value = params.get('city');
    cityField.hidden = false;
  }
  const attrs = (params.get('attr') ?? '').split(',');
  form.querySelectorAll('input[name="attributes"]').forEach((c) => (c.checked = attrs.includes(c.value)));
  return true;
}

async function copyShareUrl() {
  const url = location.href;
  try {
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      await navigator.share({ title: '補助金ファインダーの検索結果', url });
      return;
    }
    await navigator.clipboard.writeText(url);
    toast('共有用のリンクをコピーしました');
  } catch (e) {
    if (e?.name !== 'AbortError') window.prompt('このリンクをコピーしてください', url);
  }
}

// ── 検索 ──
form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  errorBox.hidden = true;
  const fd = new FormData(form);
  const payload = {
    description: String(fd.get('description') ?? ''),
    zip: normalizeZip(String(fd.get('zip') ?? '')),
    stage: fd.get('stage') || undefined,
    city: fd.get('city') || undefined,
    attributes: fd.getAll('attributes'),
  };
  if (payload.description.trim().length < 5) return showError('事業内容をもう少し詳しく入力してください。');
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
    history.replaceState(null, '', `?${payloadToParams(payload)}`);
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

// ── 結果カードのボタン（保存・カレンダー） ──
$('#results').addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-action]');
  if (!btn) return;
  const item = itemsById.get(btn.dataset.id);
  if (btn.dataset.action === 'share') return copyShareUrl();
  if (!item) return;
  if (btn.dataset.action === 'save') toggleSaved(item);
  if (btn.dataset.action === 'ics') downloadIcs([item], `${item.id}.ics`);
});

// ── 描画 ──
function render() {
  const { address, analysis, programs, live } = lastResult;
  const place = `${address.prefecture}${address.city ?? ''}`;
  const tags = [...analysis.industries, ...analysis.tags];
  itemsById.clear();
  [...programs, ...live.items].forEach((p) => itemsById.set(p.id, p));

  $('#summary').innerHTML = `
    <h2>${esc(place)}で使えそうな支援制度 ${programs.length}件</h2>
    ${analysis.summary ? `<p>${esc(analysis.summary)}</p>` : ''}
    <div class="tags">
      ${analysis.stage ? `<span class="tag">${esc(analysis.stage.label)}</span>` : ''}
      ${tags.map((t) => `<span class="tag">${esc(t.label)}</span>`).join('')}
    </div>
    ${analysis.industries.length === 0 ? '<p class="notice">業種を特定できなかったため、業種を問わない制度を中心に表示しています。「カフェ」「アプリ開発」など具体的に書くと精度が上がります。</p>' : ''}
    ${address.source === 'estimated' ? '<p class="notice">住所サービスに接続できなかったため、郵便番号から都道府県を推定しています。</p>' : ''}
    <div class="share-row">
      <span class="hint">判定方法：${analysis.mode === 'ai' ? 'AI（Claude）による事業内容の解析＋キーワード判定' : 'キーワード判定'}</span>
      <button type="button" class="chip" data-action="share">🔗 この検索結果を共有</button>
    </div>
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

  const saved = loadSaved();
  const visible = activeType === 'すべて' ? programs : programs.filter((p) => p.type === activeType);
  $('#count').textContent = `${visible.length}件を表示（関連度順）`;
  const maxScore = Math.max(...programs.map((p) => p.score), 1);
  $('#program-list').innerHTML = visible.map((p) => programCard(p, maxScore, !!saved[p.id])).join('') || '<p class="card empty">該当する制度がありません。</p>';

  if (!live.available) {
    $('#live-list').innerHTML = '<p class="card empty">現在 jGrants に接続できないため、募集中の補助金を取得できませんでした。<a href="https://www.jgrants-portal.go.jp/" target="_blank" rel="noopener">jGrants で直接探す</a></p>';
  } else if (live.items.length === 0) {
    $('#live-list').innerHTML = '<p class="card empty">条件に合う募集中の補助金は見つかりませんでした。</p>';
  } else {
    $('#live-list').innerHTML = live.items.map((i) => liveCard(i, !!saved[i.id])).join('');
  }
}

function stars(score, max) {
  const n = Math.max(1, Math.min(5, Math.round((score / max) * 5)));
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function statusBadge(p) {
  if (p.status === 'closed') return '<span class="badge closed">今年度は受付終了</span>';
  if (p.status === 'closing') return `<span class="badge closing">締切間近・あと${esc(p.daysLeft)}日</span>`;
  if (p.status === 'open') return `<span class="badge open">締切 ${esc(formatDate(p.deadline))}</span>`;
  return '';
}

function actions(item, isSaved) {
  const reminder = item.deadline && isUpcoming(item.deadline)
    ? `<a href="${esc(googleCalendarUrl(item))}" target="_blank" rel="noopener">📅 Googleカレンダーに締切を追加</a>
       <button type="button" class="link-button" data-action="ics" data-id="${esc(item.id)}">📥 .ics をダウンロード</button>`
    : '';
  return `
    <button type="button" class="chip save-btn" data-action="save" data-id="${esc(item.id)}" aria-pressed="${isSaved}">${isSaved ? '★ 保存済み' : '☆ 保存'}</button>
    ${reminder}`;
}

function programCard(p, maxScore, isSaved) {
  return `
  <article class="card program">
    <div class="program-head">
      <span class="badge ${esc(p.level)}">${esc(LEVEL_LABELS[p.level])}</span>
      <span class="badge type">${esc(p.type)}</span>
      ${statusBadge(p)}
      <span class="match" title="関連度">関連度 <b>${stars(p.score, maxScore)}</b></span>
    </div>
    <h3><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a></h3>
    <p class="provider">${esc(p.provider)}</p>
    <p class="amount">${esc(p.amount)}</p>
    ${p.period ? `<p class="period">🗓 ${esc(p.period)}</p>` : ''}
    <p class="summary-text">${esc(p.summary)}</p>
    <details>
      <summary>主な要件と、表示された理由</summary>
      <ul>${p.eligibility.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
      <ul class="reasons">${p.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    </details>
    <div class="link-row">
      <a href="${esc(p.url)}" target="_blank" rel="noopener">${p.urlIsSearch ? '最新の公募情報を検索 ↗' : '公式ページを見る ↗'}</a>
      ${actions(p, isSaved)}
    </div>
  </article>`;
}

function liveCard(item, isSaved) {
  const deadline = formatDate(item.deadline);
  return `
  <article class="card program">
    <div class="program-head">
      <span class="badge live">${esc(LEVEL_LABELS.live)}</span>
      ${deadline ? `<span class="badge open">締切 ${esc(deadline)}</span>` : ''}
    </div>
    <h3><a href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.name)}</a></h3>
    <p class="provider">対象地域：${esc(item.area || '—')}${item.employees ? ` ／ 従業員数：${esc(item.employees)}` : ''}</p>
    <p class="amount">${esc(item.amount)}</p>
    <ul class="reasons">${item.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    <div class="link-row">
      <a href="${esc(item.url)}" target="_blank" rel="noopener">jGrants で詳細を見る ↗</a>
      ${actions(item, isSaved)}
    </div>
  </article>`;
}

// ── 初期化 ──
renderSaved();
if (restoreFromUrl()) form.requestSubmit();
