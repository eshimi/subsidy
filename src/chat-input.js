// /api/chat の入力検証。Express（server.js）と Cloudflare Workers（worker.js）で共有する。
const CHAT_MAX_TURNS = 12;
const CHAT_MAX_CHARS = 1000;

export function parseChatMessages(input) {
  const bad = (message) => Object.assign(new Error(message), { status: 400, expose: true });
  if (!Array.isArray(input) || input.length === 0) throw bad('メッセージを入力してください');
  const recent = input.slice(-CHAT_MAX_TURNS);
  const messages = recent.map((m) => {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') {
      throw bad('メッセージの形式が正しくありません');
    }
    const content = m.content.trim();
    if (!content) throw bad('空のメッセージは送れません');
    if (content.length > CHAT_MAX_CHARS) throw bad(`メッセージは${CHAT_MAX_CHARS}字以内で入力してください`);
    return { role: m.role, content };
  });
  if (messages[messages.length - 1].role !== 'user') throw bad('最後のメッセージは利用者の発言である必要があります');
  return messages;
}

export function aiUnavailable() {
  return Object.assign(new Error('AI機能は現在利用できません'), { status: 503, expose: true });
}
