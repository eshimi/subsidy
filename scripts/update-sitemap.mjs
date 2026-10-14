// sitemap.xml の一覧と更新日（lastmod）を、public/ の実際のページに合わせる。
// 中身が変わったページだけ更新日を進める。覚えておく場所は data/sitemap-lastmod.json。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { refreshSitemap } from './lib/sitemap.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const XML = join(PUBLIC, 'sitemap.xml');
const MAP = join(ROOT, 'data', 'sitemap-lastmod.json');

if (existsSync(XML)) {
  let prev = {};
  try { prev = JSON.parse(readFileSync(MAP, 'utf-8')); } catch { /* 初回 */ }
  const { xml, map } = refreshSitemap(readFileSync(XML, 'utf-8'), PUBLIC, prev);
  writeFileSync(XML, xml);
  writeFileSync(MAP, JSON.stringify(map, null, 1) + '\n');
  console.log(`sitemap.xml を更新：${Object.keys(map).length} ページ`);
}
