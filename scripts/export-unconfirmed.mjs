// 金額が「要確認」の事業者向け制度を、調査用のJSONに分けて書き出す。使い方：node scripts/export-unconfirmed.mjs <出力フォルダ> [1チャンクの件数=15]
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { LOCAL_PROGRAMS_EXTRA } from '../src/data/local-programs-extra.js';

const out = process.argv[2];
const size = Number(process.argv[3] || 15);
mkdirSync(out, { recursive: true });
// 金額が「要確認」だけのものを先に、一部だけ要確認（注記つき）のものを後に
const todo = LOCAL_PROGRAMS_EXTRA.filter((p) => /要確認/.test(p.amount));
todo.sort((a, b) => (a.amount === '要確認' ? 0 : 1) - (b.amount === '要確認' ? 0 : 1));
const slim = (p) => ({ id: p.id, name: p.name, provider: p.provider, city: (p.cities || [])[0] || p.prefectures[0], amount: p.amount, period: p.period, deadline: p.deadline, url: p.url });
let n = 0;
for (let i = 0; i < todo.length; i += size) {
  n++;
  writeFileSync(join(out, `todo-${String(n).padStart(2, '0')}.json`), JSON.stringify(todo.slice(i, i + size).map(slim), null, 1));
}
console.log(`対象 ${todo.length} 件を ${n} 個のファイルに分けました`);
