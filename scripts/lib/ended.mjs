// 受付が終了した制度か：締切日が今日より前、または期間の文に「受付終了・募集終了」とあるもの
// （「予算に達し次第終了」「一部の枠は終了」などの条件つきの書き方は、終了とみなさない）
export const TODAY = new Date().toISOString().slice(0, 10);
export function isEnded(p) {
  if (p.deadline && p.deadline < TODAY) return true;
  const t = String(p.period || '');
  return /(受付|募集)(は)?終了|終了済/.test(t) && !/次第|場合|分は|枠は|募集中|受付中|ことがある|予定/.test(t);
}
