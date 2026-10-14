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

  function cell(inner, { fill, width, color, b } = {}) {
    return `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${fill ? `<w:shd w:val="clear" w:color="auto" w:fill="${fill}"/>` : ''}<w:tcMar><w:top w:w="100" w:type="dxa"/><w:bottom w:w="100" w:type="dxa"/><w:left w:w="140" w:type="dxa"/><w:right w:w="140" w:type="dxa"/></w:tcMar></w:tcPr>${para(runs(inner, { color, b }), { after: 0 })}</w:tc>`;
  }

  function table(rows) {
    const line = `w:val="single" w:sz="4" w:space="0" w:color="D5DCE6"`;
    const head = `<w:tr><w:trPr><w:tblHeader/></w:trPr>${cell('時期', { fill: NAVY, width: 2600, color: 'FFFFFF', b: true })}${cell('実施する内容', { fill: NAVY, width: 6800, color: 'FFFFFF', b: true })}</w:tr>`;
    const body = rows.map((r, i) => `<w:tr>${cell(r.period, { width: 2600, b: true, fill: i % 2 ? 'F7F9FC' : 'FFFFFF' })}${cell(r.task, { width: 6800, fill: i % 2 ? 'F7F9FC' : 'FFFFFF' })}</w:tr>`).join('');
    return `<w:tbl><w:tblPr><w:tblW w:w="9400" w:type="dxa"/><w:tblBorders><w:top ${line}/><w:bottom ${line}/><w:insideH ${line}/><w:left ${line}/><w:right ${line}/><w:insideV ${line}/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid><w:gridCol w:w="2600"/><w:gridCol w:w="6800"/></w:tblGrid>${head}${body}</w:tbl>`;
  }

  function box(inner, { fill, pad, left }) {
    const none = 'w:val="nil"';
    const l = left ? `w:val="single" w:sz="36" w:space="0" w:color="${left}"` : none;
    return `<w:tbl><w:tblPr><w:tblW w:w="9400" w:type="dxa"/><w:tblBorders><w:top ${none}/><w:bottom ${none}/><w:left ${l}/><w:right ${none}/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid><w:gridCol w:w="9400"/></w:tblGrid><w:tr><w:tc><w:tcPr><w:tcW w:w="9400" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="${fill}"/><w:tcMar><w:top w:w="${pad}" w:type="dxa"/><w:bottom w:w="${pad}" w:type="dxa"/><w:left w:w="${pad}" w:type="dxa"/><w:right w:w="${pad}" w:type="dxa"/></w:tcMar></w:tcPr>${inner}</w:tc></w:tr></w:tbl>`;
  }

  function documentXml(plan, dateText) {
    const out = [];
    // 表紙の帯と要点は、余白を取れるよう1マスの表にする
    out.push(box([
      para(run('BUSINESS PLAN DRAFT', { b: true, color: '9DB8E0', size: 17 }), { after: 60 }),
      para(run('事業計画書（下書き）', { b: true, color: 'FFFFFF', size: 44 }), { after: 80 }),
      para(run(plan.subsidy, { color: 'DCE6F5', size: 22 }), { after: 40 }),
      para(run(`作成日：${dateText}`, { color: 'DCE6F5', size: 18 }), { after: 0 }),
    ].join(''), { fill: NAVY, pad: 360 }));
    out.push(para('', { after: 120 }));
    out.push(box([
      para(run('この計画の要点', { b: true, color: BLUE, size: 20 }), { after: 60 }),
      para(runs(plan.summary, { size: 22 }), { after: 0 }),
    ].join(''), { fill: PALE, pad: 240, left: BLUE }));
    out.push(para('', { after: 60 }));
    out.push(para(run('※ AIが作成した下書きのたたき台です。そのまま提出せず、ご自身の言葉で書き直し、事実と数字を確かめてください。【　】の部分は、ご自身で書き入れてください。', { color: MUTE, size: 17 }), { after: 120 }));
    let no = 1;
    for (const s of plan.sections) {
      out.push(heading(no++, s.heading));
      out.push(bodyParas(s.body));
    }
    if (plan.schedule && plan.schedule.length) {
      out.push(heading(no++, '実施スケジュールの例'));
      out.push(table(plan.schedule));
      out.push(para('', { after: 120 }));
    }
    if (plan.questions && plan.questions.length) {
      out.push(heading(no++, '仕上げる前に、自分で確かめて書き足すこと'));
      for (const q of plan.questions) out.push(para(run('☐  ', { color: BLUE, size: 22 }) + runs(q), { ind: 360, after: 100, shade: 'FFF8EC' }));
    }
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
  if (typeof module !== 'undefined') module.exports = { planToDocxBytes };
})(typeof window !== 'undefined' ? window : globalThis);
