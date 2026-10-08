// エラー → { status, error } への変換。Express と Cloudflare Workers で同じ文面にそろえる。
export function errorPayload(err) {
  const status = err.status ?? err.statusCode ?? 500;
  if (status >= 500) return { status, error: err.expose === true ? err.message : 'サーバーでエラーが発生しました' };
  return { status, error: err.expose === false ? 'リクエストが不正です' : err.message };
}
