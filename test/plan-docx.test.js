import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

function load() {
  const ctx = { TextEncoder, Uint8Array, Uint32Array, DataView, ArrayBuffer };
  ctx.globalThis = ctx;
  vm.runInNewContext(readFileSync(new URL('../public/plan-docx.js', import.meta.url), 'utf8'), ctx);
  return ctx.planToDocxBytes;
}

// 無圧縮 ZIP の中身を、ファイル名ごとに取り出す
function unzip(bytes) {
  const buf = Buffer.from(bytes);
  const files = {};
  let p = 0;
  while (buf.readUInt32LE(p) === 0x04034b50) {
    const size = buf.readUInt32LE(p + 18);
    const nameLen = buf.readUInt16LE(p + 26);
    const name = buf.subarray(p + 30, p + 30 + nameLen).toString('utf8');
    const start = p + 30 + nameLen;
    files[name] = buf.subarray(start, start + size).toString('utf8');
    p = start + size;
  }
  return files;
}

test('plan-docx: Word に必要なファイルがそろい、本文に見出し・表・空欄の強調が入り、記号はエスケープされる', () => {
  const bytes = load()({ subsidy: '小規模事業者持続化補助金', summary: '要点 <A&B>', sections: [{ heading: '企業の概要', body: '本文【売上】\n・箇条書き' }], schedule: [{ period: '1か月目', task: '発注' }], questions: ['確認すること'] }, '2026年10月14日');
  const files = unzip(bytes);
  for (const name of ['[Content_Types].xml', '_rels/.rels', 'word/document.xml', 'word/styles.xml', 'word/footer1.xml', 'word/_rels/document.xml.rels']) assert.ok(files[name], name);
  const doc = files['word/document.xml'];
  assert.match(doc, /事業計画書（下書き）/);
  assert.match(doc, /要点 &lt;A&amp;B&gt;/);
  assert.match(doc, /C2410C"\/>[^]*?【売上】/);
  assert.match(doc, /実施スケジュールの例/);
  assert.match(doc, /☐/);
  assert.ok(!/<A&B>/.test(doc));
});
