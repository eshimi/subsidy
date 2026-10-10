// 運営者情報・出典と更新方針・プライバシーポリシーのページ（public/policy/）を生成する。
// 内容を変えたら `node scripts/build-policy-pages.mjs` を実行し、生成されたファイルをコミットする。
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, shell } from './lib/site-shell.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'policy');
const UPDATED = '2026年10月10日';
const GITHUB = 'https://github.com/eshimi/subsidy';
const EMAIL = 'info@hojyokin.net';
const OPERATOR = '補助金ネット運営事務局';
const MAIL = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

const page = ({ file, title, heading, lead, sections }) => {
  const body = `    <nav class="area-crumb" aria-label="パンくず"><a href="../">補助金ネット</a> ＞ ${esc(heading)}</nav>

    <div style="margin-bottom: 2rem;">
      <h1 class="display" style="margin-bottom: 0.5rem;">${esc(heading)}</h1>
      <p class="lead" style="margin-bottom: 0;">${esc(lead)}</p>
    </div>

${sections.map(([h, html], i) => `    <section class="area-section" aria-labelledby="s${i}">
      <span class="area-num">${String(i + 1).padStart(2, '0')}</span>
      <h2 id="s${i}">${esc(h)}</h2>
      <div class="area-body">
${html}
      </div>
    </section>`).join('\n\n')}

    <p class="area-note">最終更新日：${UPDATED}</p>`;
  writeFileSync(join(OUT, file), shell({ title: `${title}｜補助金ネット`, description: lead, canonicalPath: `/policy/${file}`, body }));
};

mkdirSync(OUT, { recursive: true });

page({
  file: 'about.html', title: '運営者情報', heading: '運営者情報', lead: '補助金ネットの運営の目的と、情報の取り扱いについてご案内します。',
  sections: [
    ['サイトの概要', `        <ul>
          <li><strong>サイト名</strong>：補助金ネット</li>
          <li><strong>URL</strong>：https://hojyokin.net/</li>
          <li><strong>運営者</strong>：${OPERATOR}</li>
          <li><strong>運営の形</strong>：民間が運営する情報サイトです。国や自治体の公式サイトではありません。</li>
          <li><strong>お問い合わせ</strong>：${MAIL}</li>
        </ul>`],
    ['運営の目的', `        <p>個人の新規事業や創業を考える方が、使えそうな補助金・助成金・支援制度を、見つけやすくすることを目的としています。事業の内容と郵便番号から、国・都道府県・市区町村の制度を一覧できる検索機能と、制度を理解するためのコラム・ガイドを提供しています。</p>`],
    ['情報の取り扱いについて', `        <p>掲載している情報は、公開されている情報をもとにした参考情報です。制度の対象・金額・公募時期は、年度や公募回によって変わります。申請の前には、必ず各制度の公式サイトで、最新の内容を確認してください。情報の出典と更新の方針は、<a href="sources.html">出典・更新方針</a>をご覧ください。</p>`],
    ['広告・アフィリエイトについて', `        <p>当サイトには、広告（Google AdSense など）が表示される場合があります。また、アフィリエイトプログラム（A8.net）を利用して、サービスを紹介する場合があります。広告やアフィリエイトを含むページには、広告であることが分かる表示を付けます。広告の掲載が、制度の検索結果や、情報の内容に影響することはありません。</p>`],
    ['お問い合わせ', `        <p>ご意見、情報の誤りのご指摘、不具合のご報告は、${MAIL}、または<a href="contact.html">お問い合わせのページ</a>からお寄せください。内容を確認し、必要に応じて、修正します。</p>`],
  ],
});

page({
  file: 'contact.html', title: 'お問い合わせ', heading: 'お問い合わせ', lead: 'ご意見、情報の誤りのご指摘、不具合のご報告は、こちらからお寄せください。',
  sections: [
    ['お問い合わせフォーム', `        <form id="contact-form" class="contact-form" novalidate>
          <label>お名前（任意）<input type="text" name="name" maxlength="100" autocomplete="name"></label>
          <label>返信先のメールアドレス<input type="email" name="email" maxlength="200" autocomplete="email" required></label>
          <label>お問い合わせの種類<select name="category" required>
            <option value="ご意見・ご要望">ご意見・ご要望</option>
            <option value="情報の誤りのご指摘">情報の誤りのご指摘</option>
            <option value="不具合のご報告">不具合のご報告</option>
            <option value="広告・提携について">広告・提携について</option>
            <option value="その他">その他</option>
          </select></label>
          <label>お問い合わせの内容<textarea name="message" maxlength="2000" required></textarea></label>
          <div class="hp" aria-hidden="true"><label>この欄は空のままにしてください<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          <p class="hint">送信いただいた内容は、お返事のためにのみ使います。個人を特定できる情報や、機密にあたる情報は書かないでください。</p>
          <button type="submit" class="primary"><span>送信する</span><span class="arrow" aria-hidden="true">→</span></button>
          <p id="contact-status" class="contact-status" role="status" aria-live="polite"></p>
        </form>
        <script src="../contact-form.js" defer></script>`],
    ['メールでのお問い合わせ', `        <p>${MAIL}</p>
        <p>お返事には、お時間をいただく場合があります。内容によっては、お返事できないことがあります。あらかじめ、ご了承ください。</p>`],
    ['GitHub での不具合のご報告', `        <p>不具合や、改善のご提案は、<a href="${GITHUB}" target="_blank" rel="noopener">GitHub リポジトリ</a>の Issue からも、お寄せいただけます。</p>`],
    ['ご注意', `        <ul>
          <li>補助金の申請の代行や、個別の申請の相談は、行っていません。お近くの商工会議所、商工会、よろず支援拠点などの、公的な相談窓口をご利用ください。</li>
          <li>個人を特定できる情報（氏名、住所、電話番号など）や、機密にあたる情報は、メールに書かないでください。</li>
          <li>広告や営業のご提案には、お返事できない場合があります。</li>
        </ul>`],
  ],
});

page({
  file: 'sources.html', title: '出典・更新方針', heading: '出典・更新方針', lead: '掲載している情報の出どころと、更新の方法についてご案内します。',
  sections: [
    ['情報の出典', `        <ul>
          <li><strong>募集中の補助金</strong>：<a href="https://www.jgrants-portal.go.jp/" target="_blank" rel="noopener">jGrants（デジタル庁）</a>の公開データ。</li>
          <li><strong>郵便番号から住所を調べる機能</strong>：<a href="https://zipcloud.ibsnet.co.jp/" target="_blank" rel="noopener">zipcloud</a>。</li>
          <li><strong>市区町村や県の独自制度</strong>：各自治体などが公開している情報をもとに掲載しています。</li>
          <li><strong>コラム・ガイド</strong>：公式サイトの公開情報をもとに、当サイトで執筆しています。</li>
        </ul>`],
    ['更新の方法と頻度', `        <ul>
          <li>jGrants の募集中データは、毎日、自動で取り込み直しています。</li>
          <li>コラム、ガイド、比較記事は、必要に応じて、随時更新します。各記事の最終更新日は、ページの末尾に表示しています。</li>
        </ul>`],
    ['正確性について', `        <p>制度の内容は、年度や公募回によって変わります。当サイトの情報は、最新であることや、正確であることを保証するものではありません。申請の際は、必ず各制度の公式サイトと公募要領を確認してください。</p>`],
    ['誤りのご連絡', `        <p>情報の誤りや、古くなっている箇所にお気づきの場合は、${MAIL}、または<a href="contact.html">お問い合わせのページ</a>からお知らせください。確認のうえ、修正します。</p>`],
  ],
});

page({
  file: 'privacy.html', title: 'プライバシーポリシー', heading: 'プライバシーポリシー', lead: '当サイトでの、情報の取得と利用についてご案内します。',
  sections: [
    ['入力された内容の取り扱い', `        <ul>
          <li>検索で入力した事業の内容や郵便番号は、検索の処理のために、当サイトのサーバー（Cloudflare）に送信されます。郵便番号は、住所を調べるために、外部サービス（zipcloud）にも送信されます。</li>
          <li>事業内容の解析や、副業壁打ちAI の会話では、入力した文章が、AI の処理のために、Anthropic 社の API に送信される場合があります。</li>
          <li>当サイトの運営者が、検索や会話の内容を、蓄積したり、他の目的で利用したりすることはありません。ただし、ホスティングの機能により、アクセスの記録（日時など）が残る場合があります。</li>
          <li>氏名、住所、電話番号、勤務先など、個人を特定できる情報は、入力しないでください。</li>
        </ul>`],
    ['お問い合わせフォームの内容', `        <p>お問い合わせフォームに入力された、お名前（任意）、メールアドレス、お問い合わせの内容は、お返事と、サイトの改善のためにのみ使います。法令に基づく場合を除き、第三者には提供しません。メールは、メールの送信サービス（Cloudflare）を通じて、運営者に届きます。</p>`],
    ['ブラウザに保存される情報', `        <p>「保存した制度」は、お使いのブラウザの中（localStorage）に保存されます。当サイトのサーバーには、送信されません。ブラウザのデータを消すと、保存した内容も消えます。</p>`],
    ['アクセス解析', `        <p>当サイトでは、利用状況を把握するために、Google アナリティクスを使用しています。Google アナリティクスは、Cookie などを使って、アクセスの情報を収集します。この情報は、匿名で収集されていて、個人を特定するものではありません。収集を望まない場合は、<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google アナリティクス オプトアウト アドオン</a>を利用できます。</p>`],
    ['広告の配信', `        <p>当サイトでは、第三者配信の広告サービス（Google AdSense）を利用する場合があります。Google などの第三者配信事業者は、Cookie を使って、ユーザーの過去のアクセス情報に基づいた広告を表示することがあります。広告に使われる Cookie は、<a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google の広告設定</a>で、無効にできます。詳しくは、<a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener">Google のポリシー</a>をご覧ください。</p>`],
    ['アフィリエイトについて', `        <p>当サイトは、アフィリエイトプログラム（A8.net）に参加しています。提携先の広告リンクを経由したときに、成果の計測のために、Cookie が使われます。広告を含むページには、広告であることを表示します。</p>`],
    ['免責事項', `        <p>当サイトの情報は、参考情報です。利用によって生じた損害について、当サイトは責任を負いません。制度の申請は、必ず公式サイトの情報に基づいて、行ってください。詳しくは、<a href="about.html">運営者情報</a>と<a href="sources.html">出典・更新方針</a>をご覧ください。</p>`],
    ['改定', `        <p>この方針は、必要に応じて、見直しを行います。変更した場合は、このページの最終更新日を更新します。</p>`],
    ['お問い合わせ', `        <p>この方針に関するお問い合わせは、${MAIL}、または<a href="contact.html">お問い合わせのページ</a>からお寄せください。</p>`],
    ['運営者', `        <p>${OPERATOR}</p>`],
  ],
});
console.log('policy pages written');
