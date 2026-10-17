// マイページ：保存した制度の締切・進み具合・カレンダー、最近見たページ、条件に合う制度を、このブラウザのデータから表示する
import { createStore, STATUSES, RESULTS } from './mypage-store.js';
import { buildIcs, toJstDate } from './calendar.js';

const store = createStore();
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const DAY = 24 * 60 * 60 * 1000;
const PREFS = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];
// scripts/build-grant-pages.mjs の PURPOSES / INDUSTRIES と合わせる
const PURPOSES = [['equipment', '設備投資'], ['digital', 'IT・デジタル導入'], ['sales', '販路開拓・販売促進'], ['hiring', '人材・雇用'], ['green', '省エネ・脱炭素'], ['research', '研究開発・技術'], ['succession', '事業承継・事業再構築'], ['startup', '創業・起業'], ['region', '地域・観光・農林水産']];
const INDUSTRIES = [['food', '飲食業'], ['retail', '小売業・商店街'], ['beauty', '美容・理容・サロン'], ['construction', '建設業・住宅'], ['manufacturing', '製造業'], ['it', 'IT・情報通信'], ['tourism', '宿泊・観光'], ['agriculture', '農林水産業'], ['care', '医療・介護・保育']];
const label = (list, key) => (list.find((x) => x[0] === key) || [])[1] || '';

const todayJst = () => toJstDate(new Date().toISOString());
const ymdToUtc = (ymd) => Date.UTC(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8));
function daysLeft(deadline) {
  const d = toJstDate(deadline);
  return d ? Math.round((ymdToUtc(d) - ymdToUtc(todayJst())) / DAY) : null;
}
const dateJa = (value) => {
  const d = toJstDate(value);
  return d ? `${d.slice(0, 4)}年${+d.slice(4, 6)}月${+d.slice(6, 8)}日` : '';
};
const daysBadge = (n) => {
  if (n === null) return '<span class="mp-days">—</span>';
  if (n < 0) return '<span class="mp-days">終了</span>';
  return `<span class="mp-days ${n <= 14 ? 's' : n <= 30 ? 'm' : ''}">あと${n}日</span>`;
};
const statusSelect = (it) => `<select data-status="${esc(it.id)}" aria-label="状態">${STATUSES.map((s) => `<option value="${s.key}"${s.key === it.status ? ' selected' : ''}>${s.label}</option>`).join('')}</select>`;
const resultSelect = (it) => `<select data-result="${esc(it.id)}" aria-label="結果">${RESULTS.map((s) => `<option value="${s.key}"${s.key === it.result ? ' selected' : ''}>${s.label}</option>`).join('')}</select>`;
const link = (it) => (it.url ? `<a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.name)}</a>` : esc(it.name));

let calMonth = null; // 'YYYYMM'
let candidates = null; // search.json から作る（取得できなかったら null）

function render() {
  const items = store.list();
  const hasItems = items.length > 0;
  const upcoming = items.filter((s) => { const n = daysLeft(s.deadline); return n !== null && n >= 0; });
  const soon30 = upcoming.filter((s) => daysLeft(s.deadline) <= 30).length;
  $('#mp-k-saved').textContent = items.length;
  $('#mp-k-soon').textContent = soon30;
  $('#mp-k-prog').textContent = items.filter((s) => s.status === 'prep' || s.status === 'applied').length;
  $('#mp-k-adopted').textContent = items.filter((s) => s.status === 'result' && s.result === 'adopted').length;

  // 締切が近い順
  const sorted = [...items].sort((a, b) => {
    const na = daysLeft(a.deadline), nb = daysLeft(b.deadline);
    const ra = na === null ? 2 : na < 0 ? 1 : 0, rb = nb === null ? 2 : nb < 0 ? 1 : 0;
    return ra - rb || (na ?? 0) - (nb ?? 0);
  });
  $('#mp-rows').innerHTML = sorted.map((it) => {
    const n = daysLeft(it.deadline);
    return `<tr><td>${link(it)}<br><input type="text" data-memo="${esc(it.id)}" value="${esc(it.memo)}" placeholder="メモ" maxlength="500" aria-label="メモ"></td>
      <td>${it.deadline ? esc(dateJa(it.deadline)) : esc(it.period || '—')}</td><td>${daysBadge(n)}</td>
      <td>${statusSelect(it)}</td><td><button type="button" class="mp-link" data-remove="${esc(it.id)}">削除</button></td></tr>`;
  }).join('');
  $('#mp-deadlines-empty').hidden = hasItems;
  $('#mp-deadlines-wrap').hidden = !hasItems;
  $('#mp-ics').hidden = upcoming.length === 0;

  // 進み具合のボード
  $('#mp-board').innerHTML = STATUSES.map((st) => {
    const col = items.filter((s) => s.status === st.key);
    return `<div class="mp-col"><h3>${st.label}<i>${col.length}</i></h3>${col.map((it) => `<div class="mp-k">${link(it)}<small>${it.deadline ? '締切 ' + esc(dateJa(it.deadline)) : esc(it.period || '')}</small>${st.key === 'result' ? resultSelect(it) : ''}${statusSelect(it)}</div>`).join('')}</div>`;
  }).join('');
  $('#mp-board-wrap').hidden = !hasItems;

  renderCalendar(items);
  renderHistory();
  renderPrefs();
  renderCandidates(items);
}

function renderCalendar(items) {
  const today = todayJst();
  if (!calMonth) {
    const next = items.map((s) => toJstDate(s.deadline)).filter((d) => d && d >= today).sort()[0];
    calMonth = (next || today).slice(0, 6);
  }
  const y = +calMonth.slice(0, 4), m = +calMonth.slice(4, 6);
  $('#mp-cal-title').textContent = `${y}年${m}月`;
  const byDay = {};
  for (const s of items) {
    const d = toJstDate(s.deadline);
    if (d && d.startsWith(calMonth)) (byDay[d] ||= []).push(s);
  }
  const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const len = new Date(Date.UTC(y, m, 0)).getUTCDate();
  let html = '<tr>' + ['日', '月', '火', '水', '木', '金', '土'].map((w) => `<th scope="col">${w}</th>`).join('') + '</tr><tr>';
  for (let i = 0; i < first; i++) html += '<td class="dim"></td>';
  for (let d = 1; d <= len; d++) {
    const ymd = calMonth + String(d).padStart(2, '0');
    const cls = [byDay[ymd] ? 'has' : '', byDay[ymd] && ymd < today ? 'past' : '', ymd === today ? 'today' : ''].filter(Boolean).join(' ');
    html += `<td class="${cls}"${byDay[ymd] ? ` title="${esc(byDay[ymd].map((s) => s.name).join('、'))}"` : ''}><span>${d}</span></td>`;
    if ((first + d) % 7 === 0 && d < len) html += '</tr><tr>';
  }
  $('#mp-cal').innerHTML = html + '</tr>';
  const evts = Object.keys(byDay).sort().flatMap((d) => byDay[d].map((s) => `<li><span>${link(s)}</span><span>${+d.slice(4, 6)}月${+d.slice(6, 8)}日</span></li>`));
  $('#mp-evts').innerHTML = evts.join('') || '<li style="color:#5d6b82">この月に締切のある保存済みの制度はありません。</li>';
}

function renderHistory() {
  const h = store.history().slice(0, 10);
  $('#mp-hist').innerHTML = h.map((x) => `<li><a href="${esc(x.u)}">${esc(x.t)}</a><small>${esc(x.k)}｜${esc(dateJa(new Date(x.at).toISOString()))}に閲覧</small></li>`).join('');
  $('#mp-hist-empty').hidden = h.length > 0;
  $('#mp-hist-clear').hidden = h.length === 0;
}

function renderPrefs() {
  const p = store.prefs();
  const chips = [p.pref, ...p.purposes.map((k) => label(PURPOSES, k)), label(INDUSTRIES, p.industry)].filter(Boolean);
  $('#mp-chips').innerHTML = chips.length ? chips.map((c) => `<span>${esc(c)}</span>`).join('') : '<span>条件は未設定です</span>';
}

function matches(g, p, now) {
  const open = g.guide || (g.e && Date.parse(g.e) >= now);
  if (!open) return false;
  if (p.pref && g.a && g.a !== '全国' && !String(g.a).includes(p.pref)) return false;
  if (p.purposes.length && !(g.p || []).some((x) => p.purposes.includes(x))) return false;
  if (p.industry && (g.i || []).length && !g.i.includes(p.industry)) return false;
  return true;
}

function renderCandidates(items) {
  const box = $('#mp-cand'), empty = $('#mp-cand-empty');
  const p = store.prefs();
  const set = !!(p.pref || p.purposes.length || p.industry);
  $('#mp-k-new').textContent = '—';
  if (!set) { box.innerHTML = ''; empty.hidden = false; empty.textContent = '地域・目的・業種を決めると、条件に合う制度がここに出ます。'; return; }
  if (!candidates) { box.innerHTML = ''; empty.hidden = false; empty.textContent = '制度の一覧を読み込めませんでした。時間をおいて、もう一度開いてください。'; return; }
  const now = Date.now();
  const savedIds = new Set(items.map((s) => s.id));
  const list = candidates.filter((g) => matches(g, p, now) && !savedIds.has(g.id));
  const fresh = store.trackCandidates(list.map((g) => g.id));
  $('#mp-k-new').textContent = fresh.size;
  const top = [...list].sort((a, b) => (fresh.has(b.id) - fresh.has(a.id)) || ((a.e ? Date.parse(a.e) : Infinity) - (b.e ? Date.parse(b.e) : Infinity))).slice(0, 8);
  empty.hidden = top.length > 0;
  empty.textContent = '条件に合う制度が見つかりませんでした。条件をゆるめてみてください。';
  box.innerHTML = top.map((g) => `<li>${fresh.has(g.id) ? '<span class="mp-new">新着</span>' : ''}<a href="grants/${encodeURIComponent(g.id)}.html">${esc(g.t)}</a><small>${g.e ? '締切 ' + esc(dateJa(g.e)) : '随時・解説'}｜${esc(g.a || '全国')}</small></li>`).join('');
  $('#mp-cand-all').href = `search.html?${new URLSearchParams({ ...(p.pref ? { pref: p.pref } : {}) })}`;
}

// ── 操作 ──
document.addEventListener('change', (ev) => {
  const t = ev.target;
  if (t.dataset?.status) { store.setMeta(t.dataset.status, { status: t.value }); render(); }
  else if (t.dataset?.result !== undefined && t.dataset.result !== '') { store.setMeta(t.dataset.result, { result: t.value }); render(); }
  else if (t.dataset?.memo) { store.setMeta(t.dataset.memo, { memo: t.value }); }
});
document.addEventListener('click', (ev) => {
  const rm = ev.target.closest('[data-remove]');
  if (rm) {
    const it = store.list().find((s) => s.id === rm.dataset.remove);
    if (it && confirm(`「${it.name}」を保存から削除します。よろしいですか。`)) { store.remove(it.id); render(); }
  }
});
$('#mp-ics').addEventListener('click', () => {
  const items = store.list().filter((s) => { const n = daysLeft(s.deadline); return n !== null && n >= 0; });
  download(new Blob([buildIcs(items)], { type: 'text/calendar;charset=utf-8' }), 'subsidy-deadlines.ics');
});
$('#mp-prev').addEventListener('click', () => shiftMonth(-1));
$('#mp-next').addEventListener('click', () => shiftMonth(1));
function shiftMonth(d) {
  const t = new Date(Date.UTC(+calMonth.slice(0, 4), +calMonth.slice(4, 6) - 1 + d, 1));
  calMonth = `${t.getUTCFullYear()}${String(t.getUTCMonth() + 1).padStart(2, '0')}`;
  renderCalendar(store.list());
}
$('#mp-hist-clear').addEventListener('click', () => { store.clearHistory(); renderHistory(); });

// 条件フォーム
$('#mp-pref').innerHTML = '<option value="">指定しない</option>' + PREFS.map((x) => `<option>${x}</option>`).join('');
$('#mp-industry').innerHTML = '<option value="">指定しない</option>' + INDUSTRIES.map(([k, l]) => `<option value="${k}">${l}</option>`).join('');
$('#mp-purposes').innerHTML = PURPOSES.map(([k, l]) => `<label><input type="checkbox" value="${k}"> ${l}</label>`).join('');
function fillForm() {
  const p = store.prefs();
  $('#mp-pref').value = p.pref;
  $('#mp-industry').value = p.industry;
  document.querySelectorAll('#mp-purposes input').forEach((c) => { c.checked = p.purposes.includes(c.value); });
}
fillForm();
$('#mp-prefs-form').addEventListener('submit', (ev) => {
  ev.preventDefault();
  store.setPrefs({ pref: $('#mp-pref').value, industry: $('#mp-industry').value, purposes: [...document.querySelectorAll('#mp-purposes input:checked')].map((c) => c.value) });
  $('#mp-prefs-details').open = false;
  renderPrefs();
  renderCandidates(store.list());
});

// バックアップ
function download(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
$('#mp-export').addEventListener('click', () => {
  const day = todayJst();
  download(new Blob([JSON.stringify(store.exportAll(), null, 2)], { type: 'application/json' }), `hojyokin-mypage-${day}.json`);
});
$('#mp-import').addEventListener('change', async (ev) => {
  const f = ev.target.files[0];
  ev.target.value = '';
  if (!f) return;
  const msg = $('#mp-import-msg');
  try {
    const n = store.importAll(JSON.parse(await f.text()));
    msg.textContent = `読み込みました（新しく追加した制度：${n}件）。`;
    render();
  } catch (e) {
    msg.textContent = `読み込めませんでした。${e.message}`;
  }
});

render();
fetch('grants/search.json')
  .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
  .then((d) => { candidates = d.items || []; renderCandidates(store.list()); })
  .catch(() => renderCandidates(store.list()));
