import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const page = () => readFileSync(join(process.cwd(), 'public/feature/digital-subsidy.html'), 'utf-8');

test('特集「デジタル補助金」：新レイアウトの目印と、既存のアンカーが残っている', () => {
  const html = page();
  assert.match(html, /data-layout="feature-v2"/);
  for (const id of ['s0', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 'bg', 'fit']) assert.match(html, new RegExp(`id="${id}"`), id);
  assert.equal((html.match(/class="sec-divider"/g) || []).length, 3, '区切りのイラストは、PARTの切れ目の3か所だけ');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
});

test('特集「デジタル補助金」：最終更新日と出典の確認日がそろい、メタ・構造化データが残っている', () => {
  const html = page();
  assert.match(html, /最終更新日：2026年10月14日/);
  assert.match(html, /出典（9件・確認日 2026\/10\/14）/);
  assert.match(html, /article:modified_time" content="2026-10-14"/);
  assert.match(html, /article:published_time" content="2026-10-10"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /property="og:title"/);
});

test('特集「デジタル補助金」：FAQを<details>にしても、回答文はHTMLに残る。申請の流れは8ステップ', () => {
  const html = page();
  assert.equal((html.match(/<details open>\s*<summary><span class="fx-qa fx-qa--q">/g) || []).length, 1);
  assert.match(html, /個人で契約した一般の有料プランは、対象になりません。/);
  assert.match(html, /事業を行っていることを示す書類（確定申告の控えなど）を用意しておくと安心です。/);
  assert.equal((html.match(/class="fx-step-no/g) || []).length, 16, "ステップ名の一覧（8）と、開いたときの説明（8）");
  assert.match(html, /ここから契約・支払いOK/);
});
