// トップページの「解説記事・ガイド ○本以上」を、実際の記事の数から更新する（10本単位で切り捨て）。
// 使い方：node scripts/update-stats.mjs（記事を追加したとき、またはデプロイ時に実行）
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const FOLDERS = ['feature', 'basics', 'who', 'personal', 'columns', 'guides', 'compare'];
const SINGLES = ['roadmap.html', 'beginner-guide.html', 'real-life.html'];

export function countArticles(root = ROOT) {
  let n = SINGLES.filter((f) => existsSync(join(root, f))).length;
  for (const d of FOLDERS) {
    const dir = join(root, d);
    if (!existsSync(dir)) continue;
    n += readdirSync(dir).filter((f) => f.endsWith('.html') && f !== 'index.html').length;
  }
  return n;
}

export function withArticleCount(html, n) {
  const shown = Math.max(10, Math.floor(n / 10) * 10);
  return html.replace(/(<dd id="r-articles">)\d+(<small>本以上<\/small><\/dd>)/, `$1${shown}$2`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = join(ROOT, 'index.html');
  const n = countArticles();
  writeFileSync(file, withArticleCount(readFileSync(file, 'utf-8'), n));
  console.log(`解説記事・ガイド：${n} 本`);
}
