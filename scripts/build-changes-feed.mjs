// マイページ用の public/grants/changes.json を作る（build:grants の中、build-grant-pages のあと）。データがなければ、空で書く
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildChangesFeed } from './lib/changes-feed.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, 'utf-8')) : null);
const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
const items = buildChangesFeed({ history: read(join(ROOT, 'data', 'program-history.json')), sourceState: read(join(ROOT, 'data', 'program-source-state.json')) }, today);
mkdirSync(join(ROOT, 'public', 'grants'), { recursive: true });
writeFileSync(join(ROOT, 'public', 'grants', 'changes.json'), JSON.stringify({ generatedAt: new Date().toISOString(), items }));
console.log(`変更の印：${Object.keys(items).length}件`);
