// 「制度の背景ガイド」のコーナー（public/background/）を生成する。
//  ・index.html：14制度（事業者向け7・個人向け7）の「背景と目的」の入口。各制度ページの背景の節（#bg）へ案内する
//  ・labor.html：テーマ別の読み物「人手不足・賃上げ」から見た補助金（事業者向け6制度を、国の政策の流れとして読む）
// 事実は scripts/data/*-background.mjs（公的資料で確認できたもの）から引く。つなぎ方の解釈は、「当サイトの見方」に分ける。
// 使い方：node scripts/build-background-pages.mjs（apply-background.mjs からも実行する）。何度実行しても同じ結果。
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BACKGROUND } from './data/feature-background.mjs';
import { PERSONAL_BACKGROUND } from './data/personal-background.mjs';
import { articleBody, writeArticle, TABLE } from './lib/article.mjs';
import { esc } from './lib/site-shell.mjs';

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const SECTION = ['index.html', '制度の背景ガイド'];
const BANNER = 'b05';

const BIZ_NAMES = {
  shoryokuka: '中小企業省力化投資補助金', jizokuka: '小規模事業者持続化補助金', 'digital-subsidy': 'デジタル化・AI導入補助金',
  monodukuri: '新事業進出・ものづくり商業サービス補助金', growth: '中小企業成長加速化補助金', succession: '事業承継・M&A補助金', employment: '雇用関係の助成金',
};
const PERSONAL_NAMES = {
  ev: '電気自動車（EV）・充電設備の補助', housing: '住宅の省エネ・リフォームの補助', kids: '子育て世帯への支援', learning: '学び直し・教育訓練給付',
  relocation: '移住支援金・起業支援金', seismic: '住宅の耐震改修・バリアフリー改修', solar: '太陽光発電・蓄電池・給湯器の補助',
};

// 資料の確認日のうち、いちばん新しいもの（ページの「最終更新日」）
function latestAsOf() {
  const all = [...Object.values(BACKGROUND), ...Object.values(PERSONAL_BACKGROUND)].map((d) => d.asOf);
  const key = (s) => { const [y, m, d] = s.match(/\d+/g).map(Number); return y * 10000 + m * 100 + d; };
  return all.sort((a, b) => key(b) - key(a))[0];
}

const card = (folder, slug, name, def) => `        <div class="bgc">
          <h3><a href="../${folder}/${slug}.html#bg">${esc(name)}</a></h3>
          <ul>
${def.summary.map((t) => `            <li>${t}</li>`).join('\n')}
          </ul>
          <p class="bgc-go"><a href="../${folder}/${slug}.html#bg">背景と目的をくわしく読む →</a></p>
        </div>`;

const THEMES = [
  ['labor.html', '「人手不足・賃上げ」から見た補助金', '省力化・持続化・デジタル化・ものづくり・成長加速化・雇用の助成金を、国の政策の流れとして読む。'],
];

function pageIndex() {
  const biz = Object.entries(BIZ_NAMES).map(([s, n]) => card('feature', s, n, BACKGROUND[s])).join('\n');
  const per = Object.entries(PERSONAL_NAMES).map(([s, n]) => card('personal', s, n, PERSONAL_BACKGROUND[s])).join('\n');
  const themes = `        <ul class="bg-rel">\n${THEMES.map(([f, t, d]) => `          <li><span class="bg-kind">読み物</span><a href="${f}">${esc(t)}</a><br><small>${esc(d)}</small></li>`).join('\n')}\n        </ul>`;
  return {
    file: 'index.html',
    title: '補助金はなぜできたのか｜制度の背景ガイド',
    description: '補助金・助成金が生まれた背景と目的を、国の公的資料で確認できた事実だけでまとめた入口。事業者向け7制度・個人向け7制度の要点と、テーマ別の読み物を案内します。',
    lead: '補助金は、国や自治体が「解決したい課題」を持って作る制度です。制度ごとの背景と目的を、公的な資料で確認できた事実だけで整理しました。制度の「目的」を知ると、申請書で何を書くべきかが見えてきます。',
    sections: [
      ['テーマ別の読み物', `        <p>制度ごとに分かれていた背景を、国の政策の流れとして、つなげて読めます。</p>\n${themes}`],
      ['事業者向けの制度', `        <p>各制度の「3つのポイント」です。年表や、出典は、リンク先の制度ページにあります。</p>\n${biz}`],
      ['個人向けの制度', `        <p>住まい・車・子育て・学び・移住などの、個人向けの制度です。</p>\n${per}`],
      ['このガイドの読み方', `        <ul>
          <li>事実は、国・自治体などの公的資料で確認できたものだけを書いています。確認できなかった予算額や統計の数字は、載せていません。</li>
          <li>民間の記事で確認した内容には、出典に「民間・参考」と付けています。</li>
          <li>当サイトの解釈は、「当サイトの見方」の枠に分けて書いています。</li>
          <li>制度の最新の内容は、必ず公式の公募要領・案内で確認してください。</li>
        </ul>`],
    ],
    related: [['../feature/index.html', '主な補助金の特集'], ['../personal/index.html', '個人向けの補助金・支援'], ['../research/index.html', '補助金データ（独自統計）'], ['../search.html', '条件に合う補助金を探す']],
  };
}

function pageLabor() {
  const B = BACKGROUND;
  const flow = [['課題', '人手不足\n物価高騰・賃上げ'], ['国の施策', '省力化・IT・設備・\n雇用の取り組みを補助'], ['狙い', '生産性の向上\n→ 賃上げ']];
  const flowHtml = flow.map(([k, v], i) => `${i ? '<span class="bg-arrow" aria-hidden="true">→</span>' : ''}<div class="bg-step"><em>${esc(k)}</em><b>${esc(v).replace(/\n/g, '<br>')}</b></div>`).join('');
  const tl = [
    ['2011年度', '業務改善助成金の前身「中小企業最低賃金引上げ支援対策費補助金」が実施されていた'],
    ['2013年度', 'キャリアアップ助成金が創設。小規模事業者持続化補助金も、この年度の補正予算で措置'],
    ['2017年1月', 'デジタル化・AI導入補助金の前身「サービス等生産性向上IT導入支援事業」（平成28年度第2次補正）の募集'],
    ['2023年11月', '「デフレ完全脱却のための総合経済対策」で人手不足への対応と賃上げの継続が柱に。補正予算で「中小企業省力化投資補助金」が新設'],
    ['2025年3月', '令和6年度補正の「中小企業成長加速化補助金」の第1次公募要領が公表'],
    ['2026年度', '「ものづくり補助金」と「新事業進出補助金」が一体化。IT導入補助金は「デジタル化・AI導入補助金」に名称変更'],
  ].map(([d, t]) => `          <li><time>${esc(d)}</time><span>${t}</span></li>`).join('\n');
  const L = (slug, name) => `<a href="../feature/${slug}.html#bg">${esc(name)}</a>`;
  const table = TABLE(['制度', '出発点の課題', '狙い', '始まり'], [
    [L('shoryokuka', '省力化投資補助金'), '人手不足、賃上げの継続', '生産性の向上 → 賃上げ', '2023年11月の補正予算'],
    [L('jizokuka', '小規模事業者持続化補助金'), '物価高騰・賃上げ・インボイス制度への対応（第20回通常枠）', '生産性の向上、持続的な発展', '2013年度補正'],
    [L('digital-subsidy', 'デジタル化・AI導入補助金'), 'ITの活用が進まない、労働生産性の向上', '業務効率化・DX、労働生産性の向上', '前身は2016年度第2次補正'],
    [L('monodukuri', '新事業進出・ものづくり商業サービス補助金'), '成長投資を促し、稼ぐ力を高める', '付加価値・生産性の向上 → 持続的な賃上げ', '2026年度に一体化して新設'],
    [L('growth', '成長加速化補助金'), '売上100億円を目指す成長のビジョン', '100億企業の創出。賃上げ・輸出・地域への波及', '令和6年度補正'],
    [L('employment', '雇用関係の助成金'), '非正規雇用の処遇改善、最低賃金の引き上げ', 'キャリアアップの促進、生産性の向上', '2011年度（業務改善）・2013年度（キャリアアップ）'],
  ]);
  const sumHtml = `        <div class="bg-sum">
          <p class="bg-sum-h">3つのポイント</p>
          <ul>
            <li><strong>共通する課題</strong>　人手不足と、物価高騰・賃上げへの対応。2023年11月の総合経済対策は、人手不足への対応と賃上げの継続を課題に挙げた。</li>
            <li><strong>共通する狙い</strong>　6制度のうち5制度で、「生産性の向上」と並んで「賃上げ」が、目的や狙いに入っている。</li>
            <li><strong>違いは入口</strong>　機械で補う、販路を広げる、ITを入れる、新事業に進む、大きく成長する、雇用を整える。どこから生産性を上げるかが、制度ごとに違う。</li>
          </ul>
        </div>
        <div class="bg-flow" role="img" aria-label="課題：人手不足・物価高騰・賃上げ → 国の施策：省力化・IT・設備・雇用の取り組みを補助 → 狙い：生産性の向上と賃上げ">${flowHtml}</div>`;
  const choose = `        <ul>
          <li>人が足りない現場を、機械で補いたい → ${L('shoryokuka', '省力化投資補助金')}</li>
          <li>販路を広げたい小規模事業者（商工会・商工会議所と一緒に計画を作る） → ${L('jizokuka', '小規模事業者持続化補助金')}</li>
          <li>会計・受発注などのITツールを入れたい → ${L('digital-subsidy', 'デジタル化・AI導入補助金')}</li>
          <li>新製品の開発や、新しい事業への進出に投資したい → ${L('monodukuri', '新事業進出・ものづくり商業サービス補助金')}</li>
          <li>売上100億円を目指す大きな投資 → ${L('growth', '成長加速化補助金')}</li>
          <li>正社員化や賃金の引き上げに取り組みたい → ${L('employment', '雇用関係の助成金')}</li>
        </ul>
        <p>あてはまる制度が複数あるときは、「何を変えたいのか（人の負担・売上・業務のやり方・事業の中身）」から決めると、迷いにくくなります。</p>`;
  const view = `        <div class="bg-view"><h3>当サイトの見方（解釈）</h3>
          <p>上の年表を並べると、はじめは「最低賃金」「雇用」「小規模事業者」「IT導入」と、<strong>テーマごとに別々に作られた制度</strong>が、2023年11月の総合経済対策以降は、<strong>「人手不足への対応」と「賃上げの継続」を前面に出した制度</strong>へ、軸が移っているように読めます。2026年度に、ものづくり補助金と新事業進出補助金が一体化されたことも、制度の目的が、「賃上げにつながる成長投資」に、まとまってきた流れの一つと考えられます。</p>
          <p>申請書では、制度ごとの「入口」は違っても、<strong>「課題 → 取り組み → 生産性の向上 → 賃上げ」</strong>の流れを、自社の数字で説明できるかが問われやすい、と考えられます。ただし、審査の基準は、公募回ごとの公募要領で、必ず確認してください。</p>
          <p>これは、公開資料をもとにした当サイトの整理で、国が公式に示した分類ではありません。</p>
        </div>`;
  const body = (h, html) => [h, html];
  return {
    file: 'labor.html',
    title: '「人手不足・賃上げ」から見た補助金｜制度の背景ガイド',
    description: '省力化・持続化・デジタル化・ものづくり・成長加速化・雇用の助成金。人手不足と賃上げという国の課題から、6つの制度の背景と目的を、一つの流れとして読み解きます。',
    kicker: '「人手不足・賃上げ」から見た補助金',
    lead: '制度ごとに読むと別々に見える補助金も、国の課題から並べると、同じ方向を向いていることが分かります。公的資料で確認できた事実と、当サイトの見方を分けて整理しました。',
    sections: [
      body('まず結論：6制度は同じ方向を向いている', sumHtml),
      body('6制度の「出発点」と「狙い」', `        <p>制度名のリンクから、各制度の年表・出典のあるページへ移動できます。</p>\n${table}`),
      body('制度のあゆみ（6制度を並べた年表）', `        <ol class="bg-tl">\n${tl}\n        </ol>\n        <p class="area-note">各制度の年表や出典は、各制度ページの「この制度ができた背景と目的」にあります（確認日は、各ページに記載）。</p>`),
      body('どの制度から見るか', choose),
      body('当サイトの見方', view),
    ],
    related: [['index.html', '制度の背景ガイドのトップ'], ['../feature/popular.html', '特に人気の5つの補助金'], ['../feature/index.html', '主な補助金の特集'], ['../search.html', '条件に合う補助金を探す']],
  };
}

export function buildAll({ out = join(PUBLIC, 'background') } = {}) {
  const asOf = latestAsOf();
  const pages = [pageIndex(), pageLabor()];
  for (const p of pages) {
    const body = articleBody({ section: SECTION, kicker: p.kicker, title: p.title.split('｜')[0], lead: p.lead, sections: p.sections, related: p.related, banner: BANNER, updated: asOf });
    writeArticle(out, 'background', p.file, { title: p.title.replace(/｜補助金ネット$/, ''), description: p.description, body });
  }
  return pages.map((p) => p.file);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(`制度の背景ガイドを生成：${buildAll().length} ページ`);
