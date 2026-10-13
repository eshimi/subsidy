import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildAll, digestFor, prefRows, cityRows } from '../scripts/build-research-pages.mjs';

const NOW = Date.parse('2026-10-13T03:00:00Z');
const DAY = 86400000;
const iso = (d) => new Date(NOW + d * DAY).toISOString();

test('digestFor: 直近7日の新着と、14日以内の締切を数える（終了した公募は除く）', () => {
  const items = [
    { id: 'a', t: 'A', s: iso(-2), e: iso(30) },
    { id: 'b', t: 'B', s: iso(-30), e: iso(5), m: 100 },
    { id: 'c', t: 'C', s: iso(-60), e: iso(-1) },
    { id: 'd', t: 'D', s: iso(-3), e: iso(10), m: 500 },
  ];
  const d = digestFor(items, NOW);
  assert.equal(d.total, 3);
  assert.deepEqual(d.fresh.map((g) => g.id), ['a', 'd']);
  assert.deepEqual(d.closing.map((g) => g.id), ['b', 'd']);
  assert.equal(d.big[0].id, 'd');
});

test('prefRows・cityRows: 47都道府県と、市区町村ごとの件数', () => {
  const rows = prefRows();
  assert.equal(rows.length, 47);
  assert.ok(rows.every((r) => r.total === r.bizPref + r.bizMuni + r.resPref + r.resMuni));
  assert.ok(rows.find((r) => r.pref === '東京都').total > 100);
  assert.ok(cityRows().every((c) => c.startup <= c.total));
});

test('buildAll: 6ページを作り、すべてに「このデータについて」（出典・調査時点）が付く。ダイジェストは、データがないとnoindex', () => {
  const out = mkdtempSync(join(tmpdir(), 'rs-'));
  const files = buildAll({ out, now: NOW, items: [] });
  assert.equal(files.length, 6);
  assert.equal(readdirSync(out).length, 6);
  for (const f of files) {
    const html = readFileSync(join(out, f), 'utf-8');
    assert.match(html, /このデータについて/, f);
    assert.match(html, /調査時点/, f);
  }
  assert.match(readFileSync(join(out, 'digest.html'), 'utf-8'), /noindex/);
  assert.doesNotMatch(readFileSync(join(out, 'prefectures.html'), 'utf-8'), /name="robots" content="noindex/);
  const out2 = mkdtempSync(join(tmpdir(), 'rs-'));
  buildAll({ out: out2, now: NOW, items: [{ id: 'a', t: '新しい制度', a: '全国', s: iso(-1), e: iso(20) }] });
  const d = readFileSync(join(out2, 'digest.html'), 'utf-8');
  assert.match(d, /新しい制度/);
  assert.doesNotMatch(d, /name="robots" content="noindex/);
});

test('digestFor: 独自に補った制度・解説・自治体・個人向けは、jGrantsの公募に数えない', () => {
  const items = [
    { id: 'g1', t: 'jGrants', s: iso(-1), e: iso(10), au: 'b' },
    { id: 'x', t: '補った制度', e: iso(10), est: true, au: 'p' },
    { id: 'y', t: '解説', e: iso(10), guide: true },
    { id: 'z', t: '自治体', e: iso(10), local: true, au: 'b' },
  ];
  assert.equal(digestFor(items, NOW).total, 1);
});
