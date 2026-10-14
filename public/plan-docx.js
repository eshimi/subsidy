// 事業計画書AI下書きの結果を、Word（.docx）ファイルにする。外部ライブラリを使わず、ブラウザ内で作る。
// docx は XML ファイルを ZIP にまとめたもの。ここでは無圧縮（STORE）の ZIP を自前で組み立てる。
(function (root) {
  const NAVY = '0A2352';
  const BLUE = '2B65B1';
  const PALE = 'EEF3FA';
  const MUTE = '56667F';
  const FONT = '<w:rFonts w:ascii="Yu Gothic" w:hAnsi="Yu Gothic" w:eastAsia="游ゴシック" w:cs="Yu Gothic"/>';

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
    // XML で使えない制御文字は取り除く
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');

  function run(text, { b, color, size, italic } = {}) {
    const pr = [FONT, b ? '<w:b/>' : '', italic ? '<w:i/>' : '', color ? `<w:color w:val="${color}"/>` : '', size ? `<w:sz w:val="${size}"/><w:szCs w:val="${size}"/>` : ''].join('');
    return `<w:r><w:rPr>${pr}</w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
  }

  // 【　】の空欄は、目立つよう色を付ける
  function runs(text, opts = {}) {
    return String(text).split(/(【[^】]*】)/).filter(Boolean)
      .map((part) => (/^【/.test(part) ? run(part, { ...opts, b: true, color: 'C2410C' }) : run(part, opts))).join('');
  }

  function para(inner, { style, align, before, after, ind, shade, border, keepNext } = {}) {
    const pr = [
      style ? `<w:pStyle w:val="${style}"/>` : '',
      keepNext ? '<w:keepNext/>' : '',
      border || '',
      shade ? `<w:shd w:val="clear" w:color="auto" w:fill="${shade}"/>` : '',
      before != null || after != null ? `<w:spacing w:before="${before ?? 0}" w:after="${after ?? 120}"/>` : '',
      ind ? `<w:ind w:left="${ind}" w:hanging="${ind > 200 ? 240 : 0}"/>` : '',
      align ? `<w:jc w:val="${align}"/>` : '',
    ].join('');
    return `<w:p><w:pPr>${pr}</w:pPr>${inner}</w:p>`;
  }

  function heading(no, text) {
    const border = `<w:pBdr><w:bottom w:val="single" w:sz="12" w:space="4" w:color="${BLUE}"/></w:pBdr>`;
    return para(run(`${String(no).padStart(2, '0')}  `, { b: true, color: BLUE, size: 26 }) + run(text, { b: true, color: NAVY, size: 26 }), { before: 360, after: 160, border, keepNext: true });
  }

  function bodyParas(text) {
    return String(text).split(/\n+/).map((l) => l.trim()).filter(Boolean).map((line) => (/^[・•\-]/.test(line)
      ? para(run('●  ', { color: BLUE, size: 16 }) + runs(line.replace(/^[・•\-]\s*/, '')), { ind: 360, after: 80 })
      : para(runs(line), { after: 140 }))).join('');
  }

  function cellXml(content, { fill, width, color, b, rich = true, keep = false } = {}) {
    const items = Array.isArray(content) ? content : [content];
    const paras = Array.isArray(content)
      ? items.map((x) => para(run('・', { color: BLUE }) + runs(x, { color, b, size: 19 }), { after: 40 })).join('') || para('', { after: 0 })
      : para(rich ? runs(content, { color, b, size: 19 }) : run(content, { color, b, size: 19 }), { after: 0, keepNext: keep });
    return `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${fill ? `<w:shd w:val="clear" w:color="auto" w:fill="${fill}"/>` : ''}<w:tcMar><w:top w:w="100" w:type="dxa"/><w:bottom w:w="100" w:type="dxa"/><w:left w:w="140" w:type="dxa"/><w:right w:w="140" w:type="dxa"/></w:tcMar></w:tcPr>${paras}</w:tc>`;
  }

  // 見出し行（紺）つきの表。widths の合計は 9400
  function table(head, rows, widths) {
    const line = 'w:val="single" w:sz="4" w:space="0" w:color="D5DCE6"';
    const grid = widths.map((w) => `<w:gridCol w:w="${w}"/>`).join('');
    const hr = `<w:tr><w:trPr><w:tblHeader/><w:cantSplit/></w:trPr>${head.map((h, i) => cellXml(h, { fill: NAVY, width: widths[i], color: 'FFFFFF', b: true, keep: true })).join('')}</w:tr>`;
    const body = rows.map((r, n) => `<w:tr><w:trPr><w:cantSplit/></w:trPr>${r.map((c, i) => cellXml(c, { width: widths[i], b: i === 0, fill: n % 2 ? 'F7F9FC' : 'FFFFFF' })).join('')}</w:tr>`).join('');
    return `<w:tbl><w:tblPr><w:tblW w:w="9400" w:type="dxa"/><w:tblBorders><w:top ${line}/><w:bottom ${line}/><w:insideH ${line}/><w:left ${line}/><w:right ${line}/><w:insideV ${line}/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>${grid}</w:tblGrid>${hr}${body}</w:tbl>${para('', { after: 60 })}`;
  }

  // 色付きのタイルを並べる（3C・SWOT など）。tiles: [{ title, body, fill, color }]、cols 列ずつ
  function tiles(list, cols) {
    const w = Math.floor(9400 / cols);
    const white = 'w:val="single" w:sz="18" w:space="0" w:color="FFFFFF"';
    const rows = [];
    for (let i = 0; i < list.length; i += cols) {
      const cells = list.slice(i, i + cols).map((t) => {
        const head = para(run(t.title, { b: true, color: t.color, size: 20 }), { after: 60 });
        const body = Array.isArray(t.body)
          ? t.body.map((x) => para(run('・', { color: t.color }) + runs(x, { size: 19 }), { after: 40 })).join('')
          : para(runs(t.body, { size: 19 }), { after: 0 });
        return `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="${t.fill}"/><w:tcMar><w:top w:w="140" w:type="dxa"/><w:bottom w:w="140" w:type="dxa"/><w:left w:w="160" w:type="dxa"/><w:right w:w="160" w:type="dxa"/></w:tcMar></w:tcPr>${head}${body || para('', { after: 0 })}</w:tc>`;
      });
      rows.push(`<w:tr><w:trPr><w:cantSplit/></w:trPr>${cells.join('')}</w:tr>`);
    }
    return `<w:tbl><w:tblPr><w:tblW w:w="9400" w:type="dxa"/><w:tblBorders><w:top ${white}/><w:bottom ${white}/><w:insideH ${white}/><w:left ${white}/><w:right ${white}/><w:insideV ${white}/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>${Array(cols).fill(`<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>${rows.join('')}</w:tbl>${para('', { after: 60 })}`;
  }

  function box(inner, { fill, pad, left }) {
    const none = 'w:val="nil"';
    const l = left ? `w:val="single" w:sz="36" w:space="0" w:color="${left}"` : none;
    return `<w:tbl><w:tblPr><w:tblW w:w="9400" w:type="dxa"/><w:tblBorders><w:top ${none}/><w:bottom ${none}/><w:left ${l}/><w:right ${none}/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid><w:gridCol w:w="9400"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="9400" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="${fill}"/><w:tcMar><w:top w:w="${pad}" w:type="dxa"/><w:bottom w:w="${pad}" w:type="dxa"/><w:left w:w="${pad}" w:type="dxa"/><w:right w:w="${pad}" w:type="dxa"/></w:tcMar></w:tcPr>${inner}</w:tc></w:tr></w:tbl>`;
  }

  // 表示する節の一覧（画面・Word・テキストで同じ順番にする）
  function planBlocks(plan) {
    const b = [];
    const has = (a) => Array.isArray(a) && a.length > 0;
    b.push({ title: 'エグゼクティブサマリー', kind: 'summary' });
    if (has(plan.marketData) || plan.marketInsight) b.push({ title: '市場データと示唆', sub: 'Web検索で見つけた公表資料（出典つき）', kind: 'market' });
    if (plan.threeC) b.push({ title: '3C分析（顧客・競合・自社）', kind: '3c' });
    if (plan.swot) b.push({ title: 'SWOT分析', kind: 'swot' });
    if (plan.target && plan.target.persona) b.push({ title: 'ターゲット顧客', kind: 'target' });
    if (has(plan.logic)) b.push({ title: '課題 → 施策 → 効果', sub: '補助事業の取組が、どの課題をどう解決するか', kind: 'logic' });
    for (const s of plan.sections || []) b.push({ title: s.heading, kind: 'text', body: s.body, sub: '計画書の本文の下書き' });
    if (has(plan.kpis)) b.push({ title: '成果指標（KPI）', kind: 'kpi' });
    if (has(plan.budget)) b.push({ title: '経費の内訳案', sub: '金額は見積もりで確かめてください', kind: 'budget' });
    if (has(plan.schedule)) b.push({ title: '実施スケジュールの例', kind: 'schedule' });
    if (has(plan.risks)) b.push({ title: 'リスクと対策', kind: 'risks' });
    if (has(plan.questions)) b.push({ title: '仕上げる前に、自分で確かめて書き足すこと', kind: 'questions' });
    return b;
  }

  function blockXml(plan, blk) {
    switch (blk.kind) {
      case 'summary': return box(para(runs(plan.summary, { size: 22 }), { after: 0 }), { fill: PALE, pad: 220, left: BLUE }) + para('', { after: 60 });
      case 'market': return ((plan.marketData || []).length ? table(['データ', '出典'], plan.marketData.map((m) => [m.fact, `${m.source}（${m.url}）`]), [6000, 3400]) : '')
        + (plan.marketInsight ? box(para(run('示唆　', { b: true, color: 'C2410C' }) + runs(plan.marketInsight), { after: 0 }), { fill: 'FFF8EC', pad: 160 }) + para('', { after: 60 }) : '');
      case '3c': return tiles([
        { title: 'Customer（顧客）', body: plan.threeC.customer, fill: 'EEF3FA', color: BLUE },
        { title: 'Competitor（競合）', body: plan.threeC.competitor, fill: 'F3F4F6', color: NAVY },
        { title: 'Company（自社）', body: plan.threeC.company, fill: 'EEF7F1', color: '2E7E4B' }], 3);
      case 'swot': return tiles([
        { title: 'Strengths（強み）', body: plan.swot.strengths || [], fill: 'EEF7F1', color: '2E7E4B' },
        { title: 'Weaknesses（弱み）', body: plan.swot.weaknesses || [], fill: 'FDF1F1', color: 'D23A3A' },
        { title: 'Opportunities（機会）', body: plan.swot.opportunities || [], fill: 'EEF3FA', color: BLUE },
        { title: 'Threats（脅威）', body: plan.swot.threats || [], fill: 'FFF6EC', color: 'C2410C' }], 2);
      case 'target': return tiles([
        { title: '狙う顧客像', body: plan.target.persona, fill: 'EEF3FA', color: BLUE },
        { title: '顧客のニーズ', body: plan.target.needs || [], fill: 'F7F9FC', color: NAVY }], 2);
      case 'logic': return table(['課題', '施策（補助事業の取組）', '効果'], plan.logic.map((x) => [x.issue, `→ ${x.action}`, `→ ${x.effect}`]), [3000, 3400, 3000]);
      case 'text': return bodyParas(blk.body);
      case 'kpi': return table(['指標', '現状', '目標', '時期'], plan.kpis.map((x) => [x.indicator, x.current, x.target, x.timing]), [3400, 2000, 2200, 1800]);
      case 'budget': return table(['経費の項目', '使いみち', '金額の目安'], plan.budget.map((x) => [x.item, x.purpose, x.amount]), [2600, 4600, 2200]);
      case 'schedule': return table(['時期', '実施する内容'], plan.schedule.map((x) => [x.period, x.task]), [2600, 6800]);
      case 'risks': return table(['想定されるリスク', '対策'], plan.risks.map((x) => [x.risk, x.measure]), [4200, 5200]);
      case 'questions': return plan.questions.map((q) => para(run('☐  ', { color: BLUE, size: 22 }) + runs(q), { ind: 360, after: 100, shade: 'FFF8EC' })).join('');
      default: return '';
    }
  }

  function documentXml(plan, dateText) {
    const out = [];
    // 表紙の帯は、余白を取れるよう1マスの表にする
    out.push(box([
      para(run('BUSINESS PLAN DRAFT', { b: true, color: '9DB8E0', size: 17 }), { after: 60 }),
      para(run(plan.mode === 'detailed' ? '事業計画づくりシート（下書き）' : '事業計画書の下書き（たたき台）', { b: true, color: 'FFFFFF', size: 40 }), { after: 80 }),
      para(run(plan.subsidy, { color: 'DCE6F5', size: 22 }), { after: 40 }),
      para(run(`作成日：${dateText}`, { color: 'DCE6F5', size: 18 }), { after: 0 }),
    ].join(''), { fill: NAVY, pad: 360 }));
    out.push(para(run('※ AIが作成した下書きのたたき台です。そのまま提出せず、ご自身の言葉で書き直し、事実と数字を確かめてください。【　】の部分は、ご自身で書き入れてください。市場データの数値は、必ず出典で確かめてください。', { color: MUTE, size: 17 }), { before: 120, after: 60 }));
    planBlocks(plan).forEach((blk, i) => {
      out.push(heading(i + 1, blk.title));
      if (blk.sub) out.push(para(run(blk.sub, { color: MUTE, size: 17 }), { after: 100, keepNext: true }));
      out.push(blockXml(plan, blk));
    });
    const sect = '<w:sectPr><w:footerReference w:type="default" r:id="rIdFooter"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1247" w:bottom="1134" w:left="1247" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr>';
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${out.join('')}${sect}</w:body></w:document>`;
  }

  const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr>${FONT}<w:color w:val="1F2937"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:lang w:val="en-US" w:eastAsia="ja-JP"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="320" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>`;

  const FOOTER = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="6" w:color="D5DCE6"/></w:pBdr><w:tabs><w:tab w:val="right" w:pos="9400"/></w:tabs></w:pPr>${run('補助金ネット　事業計画書AI下書き（下書き・要書き直し）', { color: MUTE, size: 16 })}<w:r><w:rPr><w:color w:val="${MUTE}"/><w:sz w:val="16"/></w:rPr><w:tab/></w:r><w:r><w:rPr><w:color w:val="${MUTE}"/><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:color w:val="${MUTE}"/><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:color w:val="${MUTE}"/><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:color w:val="${MUTE}"/><w:sz w:val="16"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:color w:val="${MUTE}"/><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`;

  const CONTENT_TYPES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>';
  const RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
  const DOC_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>';

  // ── 無圧縮 ZIP ──
  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(bytes) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  function zip(files) {
    const enc = new TextEncoder();
    const chunks = [];
    const central = [];
    let offset = 0;
    for (const [name, text] of files) {
      const nameBytes = enc.encode(name);
      const data = enc.encode(text);
      const crc = crc32(data);
      const local = new DataView(new ArrayBuffer(30));
      local.setUint32(0, 0x04034b50, true);
      local.setUint16(4, 20, true);
      local.setUint16(6, 0x0800, true);
      local.setUint16(8, 0, true);
      local.setUint16(10, 0, true);
      local.setUint16(12, 0x21, true);
      local.setUint32(14, crc, true);
      local.setUint32(18, data.length, true);
      local.setUint32(22, data.length, true);
      local.setUint16(26, nameBytes.length, true);
      local.setUint16(28, 0, true);
      chunks.push(new Uint8Array(local.buffer), nameBytes, data);
      const cd = new DataView(new ArrayBuffer(46));
      cd.setUint32(0, 0x02014b50, true);
      cd.setUint16(4, 20, true);
      cd.setUint16(6, 20, true);
      cd.setUint16(8, 0x0800, true);
      cd.setUint16(10, 0, true);
      cd.setUint16(12, 0, true);
      cd.setUint16(14, 0x21, true);
      cd.setUint32(16, crc, true);
      cd.setUint32(20, data.length, true);
      cd.setUint32(24, data.length, true);
      cd.setUint16(28, nameBytes.length, true);
      cd.setUint32(42, offset, true);
      central.push(new Uint8Array(cd.buffer), nameBytes);
      offset += 30 + nameBytes.length + data.length;
    }
    const cdSize = central.reduce((n, c) => n + c.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true);
    end.setUint16(8, files.length, true);
    end.setUint16(10, files.length, true);
    end.setUint32(12, cdSize, true);
    end.setUint32(16, offset, true);
    const all = [...chunks, ...central, new Uint8Array(end.buffer)];
    const out = new Uint8Array(all.reduce((n, c) => n + c.length, 0));
    let p = 0;
    for (const c of all) { out.set(c, p); p += c.length; }
    return out;
  }

  function planToDocxBytes(plan, dateText) {
    return zip([
      ['[Content_Types].xml', CONTENT_TYPES],
      ['_rels/.rels', RELS],
      ['word/document.xml', documentXml(plan, dateText)],
      ['word/styles.xml', STYLES],
      ['word/footer1.xml', FOOTER],
      ['word/_rels/document.xml.rels', DOC_RELS],
    ]);
  }

  root.planToDocxBytes = planToDocxBytes;
  root.planBlocks = planBlocks;
  if (typeof module !== 'undefined') module.exports = { planToDocxBytes, planBlocks };
})(typeof window !== 'undefined' ? window : globalThis);
