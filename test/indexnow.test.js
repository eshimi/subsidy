import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { urlsFromSitemap, fileOf, hashPages, diffPages, chunk, findKey, submit } from '../scripts/indexnow.mjs';

test('urlsFromSitemap: <loc> を取り出す', () => {
  const xml = '<urlset><url><loc>https://hojyokin.net/</loc></url><url><loc> https://hojyokin.net/a.html?x=1&amp;y=2 </loc></url></urlset>';
  assert.deepEqual(urlsFromSitemap(xml), ['https://hojyokin.net/', 'https://hojyokin.net/a.html?x=1&y=2']);
});

test('fileOf: トップと「/」で終わる URL は index.html', () => {
  assert.equal(fileOf('/p', 'https://hojyokin.net/'), '/p/index.html');
  assert.equal(fileOf('/p', 'https://hojyokin.net/area/'), '/p/area/index.html');
  assert.equal(fileOf('/p', 'https://hojyokin.net/area/adachi.html'), '/p/area/adachi.html');
});

test('hashPages / diffPages: 新しい・変わった・なくなったページを分ける', () => {
  const dir = mkdtempSync(join(tmpdir(), 'inow-'));
  mkdirSync(join(dir, 'area'));
  writeFileSync(join(dir, 'index.html'), 'top');
  writeFileSync(join(dir, 'area', 'a.html'), 'A');
  const urls = ['https://hojyokin.net/', 'https://hojyokin.net/area/a.html', 'https://hojyokin.net/missing.html'];
  const first = hashPages(dir, urls);
  assert.deepEqual(Object.keys(first), ['https://hojyokin.net/', 'https://hojyokin.net/area/a.html']);
  assert.deepEqual(diffPages({}, first), { changed: Object.keys(first), removed: [] });
  writeFileSync(join(dir, 'area', 'a.html'), 'A2');
  const second = hashPages(dir, ['https://hojyokin.net/area/a.html']);
  assert.deepEqual(diffPages(first, second), { changed: ['https://hojyokin.net/area/a.html'], removed: ['https://hojyokin.net/'] });
  assert.deepEqual(diffPages(second, second), { changed: [], removed: [] });
});

test('chunk: 上限ごとに分ける', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test('findKey: 中身がファイル名と同じ .txt をキーとして見つける', () => {
  const dir = mkdtempSync(join(tmpdir(), 'inow-'));
  writeFileSync(join(dir, 'robots.txt'), 'User-agent: *');
  writeFileSync(join(dir, 'abcdef0123456789.txt'), 'abcdef0123456789\n');
  assert.equal(findKey(dir), 'abcdef0123456789');
});

test('submit: ホスト・キー・キーの場所つきで送り、200/202 以外は失敗にする', async () => {
  const calls = [];
  const ok = async (url, init) => { calls.push({ url, body: JSON.parse(init.body) }); return { status: 202, text: async () => '' }; };
  await submit(['https://hojyokin.net/a.html'], 'k1234567890', ok);
  assert.equal(calls[0].url, 'https://api.indexnow.org/IndexNow');
  assert.deepEqual(calls[0].body, { host: 'hojyokin.net', key: 'k1234567890', keyLocation: 'https://hojyokin.net/k1234567890.txt', urlList: ['https://hojyokin.net/a.html'] });
  await assert.rejects(submit(['https://hojyokin.net/a.html'], 'k1234567890', async () => ({ status: 403, text: async () => 'forbidden' })), /403/);
});
