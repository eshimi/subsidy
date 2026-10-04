// （任意）Claude で事業内容を解析し、業種・属性タグ・検索キーワードを抽出する。
// ANTHROPIC_API_KEY などの認証情報がない場合や失敗時は null を返し、キーワード判定のみで動作する。
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { INDUSTRIES, TAGS } from './data/taxonomy.js';

const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-5-5';

const industryKeys = Object.keys(INDUSTRIES);
const tagKeys = Object.keys(TAGS).filter((k) => !['woman', 'young', 'senior'].includes(k));

const AnalysisSchema = z.object({
  industries: z.array(z.enum(industryKeys)),
  tags: z.array(z.enum(tagKeys)),
  searchKeywords: z.array(z.string()),
  summary: z.string(),
});

let client;
function getClient() {
  if (process.env.SUBSIDY_AI === 'off') return null;
  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) return null;
  client ??= new Anthropic();
  return client;
}

export function aiEnabled() {
  return getClient() !== null;
}

const SYSTEM = `あなたは日本の中小企業支援制度に詳しい創業アドバイザーです。
ユーザーが考えている新規事業の説明を読み、補助金・助成金を探すための分類を行います。

- industries: 該当する業種キー（複数可、該当なしなら空配列）
${industryKeys.map((k) => `  - ${k}: ${INDUSTRIES[k].label}`).join('\n')}
- tags: 事業内容から読み取れる取り組み（明示または強く示唆されるもののみ）
${tagKeys.map((k) => `  - ${k}: ${TAGS[k].label}`).join('\n')}
- searchKeywords: 補助金ポータル（jGrants）で検索するための短い日本語キーワードを2〜4個（例: 「飲食店」「省力化」「観光」）
- summary: 事業内容の要約を1文で`;

export async function analyzeWithClaude(description) {
  const anthropic = getClient();
  if (!anthropic) return null;
  try {
    const response = await anthropic.messages.parse(
      {
        model: MODEL,
        max_tokens: 2000,
        output_config: { effort: 'low', format: zodOutputFormat(AnalysisSchema) },
        system: SYSTEM,
        messages: [{ role: 'user', content: `新規事業の説明:\n${description}` }],
      },
      { timeout: 30_000 },
    );
    if (response.stop_reason === 'refusal' || !response.parsed_output) return null;
    return response.parsed_output;
  } catch (e) {
    console.warn('[ai] Claude による解析に失敗しました。キーワード判定のみで続行します:', e.message);
    return null;
  }
}
