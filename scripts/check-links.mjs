// サイト内リンクの点検：リンク切れ、被リンクのないページ、サイトマップとの食い違いを調べる。
// 使い方：node scripts/check-links.mjs（public/ の静的ページが対象。public/grants/ は デプロイ時に作るので、リンク先としては「あるもの」とみなす）
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SITE = 'https://hojyokin.net';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

export function redirectsOf(root = ROOT) {
  const f = join(root, '_redirects');
  const map = new Map();
  if (!existsSync(f)) return map;
  for (const line of readFileSync(f, 'utf-8').split('\n')) {
    const m = line.match(/^(\/\S+)\s+(\S+)\s+30\d/);
    if (m) map.set(m[1], m[2]);
  }
  return map;
}

// ページの href を、public/ からのパス（例：area/tokyo.html）にする。外部・mailto・# だけ・api は null
export function resolveHref(href, fromRel) {
  if (!href || /^(https?:|mailto:|tel:|javascript:|data:|#)/.test(href)) {
    if (/^https:\/\/hojyokin\.net/.test(href || '')) return resolveHref(href.replace(SITE, '') || '/', fromRel);
    return null;
  }
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return null;
  let path = clean.startsWith('/') ? clean.slice(1) : posix.join(posix.dirname(fromRel), clean);
  path = posix.normalize(path).replace(/^\.\//, '').replace(/^\.$/, '');
  if (clean.endsWith('/') || path === '' || path.endsWith('/')) path = `${path.replace(/\/$/, '')}${path && path !== '' ? '/' : ''}index.html`;
  return path;
}

export function audit(root = ROOT) {
  const files = walk(root);
  const pages = files.filter((f) => f.endsWith('.html')).map((f) => relative(root, f).split('\\').join('/'));
  const exists = new Set(files.map((f) => relative(root, f).split('\\').join('/')));
  const redirects = redirectsOf(root);
  const redirected = (p) => redirects.has(`/${p}`) || redirects.has(`/${p.replace(/index\.html$/, '')}`);
  const broken = [];
  const inbound = new Map(pages.map((p) => [p, new Set()]));
  for (const rel of pages) {
    const html = readFileSync(join(root, rel), 'utf-8');
    for (const m of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
      const t = resolveHref(m[1].replace(/&amp;/g, '&'), rel);
      if (t === null) continue;
      if (t.startsWith('api/')) continue;
      if (t.startsWith('grants/') && !exists.has(t) && !redirected(t)) {
        // デプロイ時に作る制度ページ（grants/<id>.html など）は、ここでは確認できない
        continue;
      }
      if (redirected(t)) { inbound.get(t)?.add(rel); continue; }
      if (exists.has(t)) { if (inbound.has(t)) inbound.get(t).add(rel); continue; }
      broken.push([rel, m[1]]);
    }
  }
  // サイトマップ（XML）
  const sm = existsSync(join(root, 'sitemap.xml')) ? readFileSync(join(root, 'sitemap.xml'), 'utf-8') : '';
  const smPaths = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => resolveHref(m[1], 'sitemap.xml'));
  const smMissingFile = smPaths.filter((p) => p && !exists.has(p) && !p.startsWith('grants/'));
  const noindex = (rel) => /<meta[^>]+name="robots"[^>]+noindex/i.test(readFileSync(join(root, rel), 'utf-8'));
  const smSet = new Set(smPaths);
  const notInSitemap = pages.filter((p) => !smSet.has(p) && !p.startsWith('grants/') && !redirected(p) && !noindex(p) && !/^(googlea|google[0-9a-f]+|404)/.test(p));
  const orphans = pages.filter((p) => inbound.get(p).size === 0 && p !== 'index.html' && !p.startsWith('grants/') && !noindex(p) && !redirected(p));
  return { pages: pages.length, broken, smMissingFile, notInSitemap, orphans, inbound };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const r = audit();
  const show = (title, list) => console.log(`\n■ ${title}：${list.length} 件${list.length ? '\n' + list.slice(0, 60).map((x) => '  - ' + (Array.isArray(x) ? x.join('  →  ') : x)).join('\n') : ''}${list.length > 60 ? `\n  …ほか ${list.length - 60} 件` : ''}`);
  console.log(`ページ数：${r.pages}`);
  show('リンク切れ（リンク元 → リンク先）', r.broken);
  show('サイトマップに載っているが、ファイルがない', r.smMissingFile);
  show('サイトマップに載っていないページ', r.notInSitemap);
  show('被リンクがない（どのページからもリンクされていない）ページ', r.orphans);
  process.exitCode = r.broken.length || r.smMissingFile.length ? 1 : 0;
}
