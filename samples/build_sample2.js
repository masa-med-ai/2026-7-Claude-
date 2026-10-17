// 学会スライド 王道デザイン — PowerPoint 版サンプル 2（ESD 後出血）
// スライドマスター（レイアウト）にスライド番号プレースホルダ・ロゴ・仕切り線を持たせる。
const pptxgen = require("pptxgenjs");
const path = require("path");
const { applyTheme } = require("/root/.claude/skills/synced/799db999-ab00-4cac-a372-9162854b4b30_135a17e0-994c-44ff-94f3-0d1372ca04aa/pptx/scripts/apply_theme.js");

const cm = (v) => v / 2.54;
const LOGO = path.join(__dirname, "..", "logo", "showa-logo.png");
const FONT = "BIZ UDPGothic";

const THEME = {
  name: "GakkaiSlide",
  headFontFace: FONT,
  bodyFontFace: FONT,
  colors: {
    dk1: "000000", lt1: "FFFFFF", dk2: "000000", lt2: "FFFFFF",
    accent1: "1F5AA6", accent2: "D7000F", accent3: "000000", accent4: "1F5AA6", accent5: "000000", accent6: "D7000F",
    hlink: "1F5AA6", folHlink: "1F5AA6",
  },
};
const BLUE = "1F5AA6", BLACK = "000000", WHITE = "FFFFFF";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in = 33.87 x 19.05 cm
pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
pres.author = "三澤将史";
pres.title = "学会発表サンプル 2：ESD 後出血のリスク因子";

// 共通座標（cm → in）
const X = cm(2.0), W = cm(30.8);
const TITLE_Y = cm(1.3), TITLE_H = cm(1.7);
const DIV_Y = cm(3.6), DIV_W = cm(29.9);
const CONTENT_Y = cm(4.6);
const FOOT_Y = cm(17.7);
const PAGE_NO = { x: cm(29.9), y: FOOT_Y, w: cm(1.97), h: cm(0.7), fontFace: FONT, fontSize: 12, color: BLACK, align: "right" };
const LOGO_OPTS = { path: LOGO, x: cm(0.3), y: cm(17.3), w: cm(8.9), h: cm(1.2) };
const divider = () => ({
  rect: { x: X, y: DIV_Y, w: DIV_W, h: 0.0, line: { color: BLACK, width: 1.5 },
    shadow: { type: "outer", color: "000000", opacity: 0.18, blur: 3, offset: 1.5, angle: 90 } },
});

// レイアウト 1: 表紙（番号なし）
pres.defineSlideMaster({ title: "COVER", background: { color: WHITE }, objects: [] });
// レイアウト 2: COI（タイトル + 仕切り線 + スライド番号、ロゴなし）
pres.defineSlideMaster({
  title: "TITLE_NO_LOGO", background: { color: WHITE },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: X, y: TITLE_Y, w: W, h: TITLE_H, fontFace: FONT, fontSize: 36, color: BLACK, align: "center", valign: "middle", margin: 0 }, text: "スライドタイトル" } },
    divider(),
  ],
  slideNumber: PAGE_NO,
});
// レイアウト 3: 本文（タイトル + 仕切り線 + ロゴ + スライド番号）
pres.defineSlideMaster({
  title: "TITLE_LOGO", background: { color: WHITE },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: X, y: TITLE_Y, w: W, h: TITLE_H, fontFace: FONT, fontSize: 36, color: BLACK, align: "center", valign: "middle", margin: 0 }, text: "スライドタイトル" } },
    divider(),
    { image: LOGO_OPTS },
  ],
  slideNumber: PAGE_NO,
});

const T = (slide, text, opts) => slide.addText(text, Object.assign({ fontFace: FONT, color: BLACK, margin: 0, isTextBox: true, valign: "top" }, opts));
const body = (slide, lines, opts) => T(slide, lines, Object.assign({ fontSize: 26, lineSpacingMultiple: 1.5, align: "left" }, opts));
const note = (slide, text, opts) => T(slide, text, Object.assign({ x: cm(10.0), y: FOOT_Y, w: cm(17.0), h: cm(0.8), fontSize: 14, align: "left" }, opts));
const message = (slide, text, y) => T(slide, text, { x: X, y, w: W, h: cm(1.3), fontSize: 24, align: "center" });
const cite = (slide, refs, y) => T(slide, refs.flatMap((r, i) => [
  { text: r.a + " ", options: { breakLine: false } },
  { text: r.j, options: { bold: true, italic: true, breakLine: false } },
  { text: " " + r.y, options: { breakLine: i < refs.length - 1 } },
]), { x: cm(12.0), y: y ?? cm(16.3), w: cm(19.9), h: cm(1.4), fontSize: 14, align: "right", lineSpacingMultiple: 1.3 });
const bullets = (items) => items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 6 } }));

// 三線表: 上・表頭下・下の黒 1pt だけ
function threeLineTable(slide, rows, colW, opts) {
  const n = rows.length;
  const data = rows.map((r, ri) => r.map((cell) => {
    const c = typeof cell === "string" ? { text: cell } : cell;
    const top = ri === 0 ? { type: "solid", pt: 1, color: BLACK } : { type: "none" };
    const bottom = (ri === 0 || ri === n - 1) ? { type: "solid", pt: 1, color: BLACK } : { type: "none" };
    return { text: c.text, options: Object.assign({ fontFace: FONT, fontSize: 18, color: BLACK, align: "center", valign: "middle", border: [top, { type: "none" }, bottom, { type: "none" }], margin: [4, 6, 4, 6] }, c.options || {}) };
  }));
  slide.addTable(data, Object.assign({ x: X, y: CONTENT_Y, w: W, colW, rowH: cm(1.36), fill: { color: WHITE } }, opts));
}

// ---------- 1 表紙 ----------
{
  const s = pres.addSlide({ masterName: "COVER" });
  T(s, "第 ○○ 回 △△学会学術集会　2026年○月○日\n場所・主題番号・テーマ", { x: cm(15.5), y: cm(1.3), w: cm(16.4), h: cm(1.6), fontSize: 15, align: "right", lineSpacingMultiple: 1.4 });
  T(s, "大腸 ESD 後出血のリスク因子の検討\n抗血栓薬内服例を中心とした\n多施設後方視的研究", { x: X, y: cm(4.8), w: W, h: cm(7.2), fontSize: 48, align: "center", valign: "middle", lineSpacingMultiple: 1.4 });
  T(s, "○三澤将史、[共同演者名]、[共同演者名]、[共同演者名]", { x: X, y: cm(13.6), w: W, h: cm(1.2), fontSize: 22, align: "center" });
  T(s, "昭和医科大学横浜市北部病院　消化器センター", { x: X, y: cm(15.1), w: W, h: cm(1.2), fontSize: 22, align: "center" });
  s.addNotes("演題名は抄録と同一。発表者に○印。改行は語句の切れ目で。数値はすべて架空のサンプル。");
}
// ---------- 2 COI ----------
{
  const s = pres.addSlide({ masterName: "TITLE_NO_LOGO" });
  s.addText("利益相反（COI）の開示", { placeholder: "title" });
  body(s, "筆頭演者：三澤将史", { x: X, y: cm(7.0), w: W, h: cm(1.4) });
  body(s, "演題発表に関連し、開示すべき COI 関係にある企業などはありません。", { x: X, y: cm(9.0), w: W, h: cm(1.4) });
  body(s, "倫理審査：昭和医科大学横浜市北部病院 倫理委員会　承認番号 [承認番号]", { x: X, y: cm(11.0), w: W, h: cm(1.4), fontSize: 22 });
  s.addNotes("学会指定の様式があればそれに置き換える。");
}
// ---------- 3 背景 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("背景", { placeholder: "title" });
  body(s, "大腸 ESD 後出血は 2〜5% に起こり、\n再入院と追加の内視鏡止血を要する主な偶発症である", { x: X, y: cm(5.2), w: W, h: cm(2.8) });
  body(s, "抗血栓薬の内服例では後出血が増えると報告されるが、\n薬剤の種類と休薬の有無で層別した国内データは少ない", { x: X, y: cm(8.6), w: W, h: cm(2.8) });
  body(s, "近年は抗血栓薬を休薬せずに ESD を行う施設が増え、\nリスクの再評価が必要になっている", { x: X, y: cm(12.0), w: W, h: cm(2.8) });
  cite(s, [{ a: "[First Author, et al.", j: "Journal", y: "Year]" }, { a: "[First Author, et al.", j: "Journal", y: "Year]" }]);
  s.addNotes("既知 2 点 + 未解決 1 点。引用は右下に 1 文献 1 行、雑誌名だけ太字イタリック。");
}
// ---------- 4 目的 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("目的", { placeholder: "title" });
  body(s, "大腸 ESD を受けた症例を対象に、", { x: X, y: cm(7.0), w: W, h: cm(1.4) });
  T(s, [
    { text: "抗血栓薬の種類と休薬の有無を含めた", options: { breakLine: true } },
    { text: "ESD 後出血のリスク因子", options: { color: BLUE, breakLine: false } },
    { text: "を明らかにする。" },
  ], { x: X, y: cm(9.4), w: W, h: cm(2.8), fontSize: 26, lineSpacingMultiple: 1.5, align: "left" });
  s.addNotes("目的は 1〜2 文。強調は青 1 か所。");
}
// ---------- 5 方法：デザインと対象 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("方法：研究デザインと対象", { placeholder: "title" });
  body(s, "2019 年 1 月〜2024 年 12 月、3 施設の後方視的コホート研究", { x: X, y: cm(4.7), w: W, h: cm(1.4) });
  T(s, "登録基準", { x: X, y: cm(7.0), w: cm(14.5), h: cm(1.2), fontSize: 24 });
  T(s, bullets(["20 歳以上、大腸腫瘍に対する ESD", "一括切除を試みた症例", "術後 30 日の経過が追跡できた症例"]), { x: X + cm(0.3), y: cm(8.6), w: cm(14.2), h: cm(5.0), fontSize: 22, lineSpacingMultiple: 1.4 });
  T(s, "除外基準", { x: cm(17.8), y: cm(7.0), w: cm(14.5), h: cm(1.2), fontSize: 24 });
  T(s, bullets(["術中穿孔で外科手術に移行した症例", "同日に複数病変を切除した症例", "抗血栓薬の内服状況が不明な症例"]), { x: cm(18.1), y: cm(8.6), w: cm(14.2), h: cm(5.0), fontSize: 22, lineSpacingMultiple: 1.4 });
  note(s, "倫理審査承認番号 [承認番号]。オプトアウト方式で同意を取得。");
  s.addNotes("上段にデザインと期間、下段を左「登録」右「除外」の 2 列。");
}
// ---------- 6 方法：患者フロー ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("方法：患者フロー", { placeholder: "title" });
  const bx = X, bw = cm(13.4), bh = cm(1.6);
  const boxOpts = (color) => ({ x: bx, w: bw, h: bh, fill: { color: WHITE }, line: { color, width: 1 }, fontFace: FONT, fontSize: 18, color, align: "center", valign: "middle", margin: 0 });
  s.addText("期間中の大腸 ESD　n = 1,284", Object.assign({ shape: pres.ShapeType.rect, y: cm(5.6) }, boxOpts(BLACK)));
  s.addShape(pres.ShapeType.downArrow, { x: bx + bw / 2 - cm(0.35), y: cm(7.4), w: cm(0.7), h: cm(1.3), fill: { color: BLACK }, line: { color: BLACK, width: 0 } });
  s.addText("解析対象　n = 1,196", Object.assign({ shape: pres.ShapeType.rect, y: cm(8.9) }, boxOpts(BLACK)));
  s.addShape(pres.ShapeType.downArrow, { x: bx + bw / 2 - cm(0.35), y: cm(10.7), w: cm(0.7), h: cm(1.3), fill: { color: BLACK }, line: { color: BLACK, width: 0 } });
  s.addText("抗血栓薬あり　n = 318", Object.assign({ shape: pres.ShapeType.rect, y: cm(12.2) }, boxOpts(BLUE), { x: bx, w: cm(6.5), h: cm(2.0), fontSize: 17 }));
  s.addText("抗血栓薬なし　n = 878", Object.assign({ shape: pres.ShapeType.rect, y: cm(12.2) }, boxOpts(BLACK), { x: bx + cm(6.9), w: cm(6.5), h: cm(2.0), fontSize: 17 }));
  T(s, "除外　n = 88", { x: cm(17.0), y: cm(7.4), w: cm(15.0), h: cm(1.2), fontSize: 28 });
  T(s, bullets(["外科手術へ移行　14", "同日複数病変　41", "内服状況が不明　19", "30 日の追跡不能　14"]), { x: cm(17.3), y: cm(9.0), w: cm(14.7), h: cm(5.0), fontSize: 24, lineSpacingMultiple: 1.4 });
  s.addNotes("箱と矢印は図形、文字は編集可能。除外の合計（88）が合うことを確認。");
}
// ---------- 7 方法：手技と抗血栓薬の管理 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("方法：手技と抗血栓薬の管理", { placeholder: "title" });
  s.addText("[ESD 後の潰瘍底と予防的凝固の写真]\n実際の内視鏡画像を貼る", { shape: pres.ShapeType.rect, x: X, y: cm(5.4), w: cm(13.4), h: cm(9.6), fill: { color: WHITE }, line: { color: BLACK, width: 1 }, fontFace: FONT, fontSize: 15, color: BLACK, align: "center", valign: "middle" });
  T(s, bullets(["ナイフ：[製品名]、高周波装置 [型番]", "切除後の露出血管は全例で予防的凝固", "抗血小板薬：単剤は継続、2 剤併用は\n1 剤を 5〜7 日休薬（ガイドライン準拠）", "抗凝固薬：DOAC は当日朝のみ休薬、\nワルファリンは継続（PT-INR 治療域）", "術者：ESD 経験 100 例以上の内視鏡医 6 名"]), { x: cm(16.6), y: cm(5.6), w: cm(15.7), h: cm(9.4), fontSize: 22, lineSpacingMultiple: 1.35 });
  cite(s, [{ a: "[Guideline Author, et al.", j: "Journal", y: "Year]" }], cm(16.9));
  s.addNotes("左に写真、右に条件。ガイドラインの出典は右下。");
}
// ---------- 8 方法：評価項目 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("方法：評価項目", { placeholder: "title" });
  T(s, [{ text: "主要評価項目　", options: { breakLine: false } }, { text: "ESD 後出血", options: { color: BLUE } }], { x: X, y: cm(5.2), w: W, h: cm(1.4), fontSize: 26 });
  body(s, "術後 30 日以内の顕性出血で、内視鏡止血・輸血・Hb 2 g/dL 以上の低下のいずれかを伴うもの。\n判定は手技に関与しない医師 2 名が診療録で実施", { x: X, y: cm(6.8), w: W, h: cm(2.6), fontSize: 22, lineSpacingMultiple: 1.4 });
  body(s, "副次評価項目", { x: X, y: cm(10.4), w: W, h: cm(1.4) });
  T(s, bullets(["後出血の発症時期（早期 0〜2 日 / 後期 3〜30 日）", "内視鏡止血の回数、輸血の有無、入院期間", "血栓塞栓症の発生（30 日以内）"]), { x: X + cm(0.3), y: cm(12.0), w: W, h: cm(4.0), fontSize: 22, lineSpacingMultiple: 1.4 });
  s.addNotes("主要評価項目 1 つを上段に大きく、定義・判定者を 1〜2 行で。");
}
// ---------- 9 方法：統計解析 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("方法：統計解析", { placeholder: "title" });
  T(s, bullets(["主解析：後出血の有無を目的変数とする多変量ロジスティック回帰", "共変量：年齢、性別、腫瘍径、部位、抗血栓薬の種類、休薬の有無、\n手技時間（単変量で P < 0.10 の因子を投入）", "結果はオッズ比（OR）と 95% 信頼区間で示す", "連続変数は中央値（四分位範囲）、Mann–Whitney U 検定", "欠測は主要評価項目になし。共変量の欠測は完全症例解析", "有意水準 両側 5%。解析ソフト：R 4.4.1"]), { x: X, y: cm(5.6), w: W, h: cm(10.5), fontSize: 22, lineSpacingMultiple: 1.5 });
  s.addNotes("主解析を 1 行目に。どの比較に何を使ったかを書く。");
}
// ---------- 10 結果：患者背景 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("結果：患者背景", { placeholder: "title" });
  threeLineTable(s, [
    ["項目", "抗血栓薬あり（n = 318）", "抗血栓薬なし（n = 878）", "P 値"],
    ["年齢（歳）、中央値（IQR）", "74（68–79）", "68（60–75）", "<0.001"],
    ["男性、n（%）", "221（69.5）", "512（58.3）", "<0.001"],
    ["腫瘍径（mm）、中央値（IQR）", "32（25–42）", "30（24–40）", "0.12"],
    ["直腸病変、n（%）", "98（30.8）", "246（28.0）", "0.35"],
    ["手技時間（分）、中央値（IQR）", "68（45–102）", "62（42–95）", "0.08"],
  ], [cm(11.1), cm(7.7), cm(7.7), cm(4.3)], { y: cm(5.0) });
  message(s, "抗血栓薬あり群は高齢・男性が多く、腫瘍径と部位に差はなかった", cm(14.3));
  note(s, "IQR：四分位範囲。架空データ。");
  s.addNotes("三線表：上・表頭下・下の黒 1pt の 3 本だけ。全セル中央揃え。メッセージは表の下。");
}
// ---------- 11 結果：主要評価項目 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("結果：主要評価項目", { placeholder: "title" });
  // 軸と棒（図形）
  const ax = cm(4.2), ay = cm(5.2), ah = cm(7.6), aw = cm(12.0);
  s.addShape(pres.ShapeType.line, { x: ax, y: ay, w: 0, h: ah, line: { color: BLACK, width: 1 } });
  s.addShape(pres.ShapeType.line, { x: ax, y: ay + ah, w: aw, h: 0, line: { color: BLACK, width: 1 } });
  const ticks = [8, 6, 4, 2, 0];
  ticks.forEach((v, i) => {
    const y = ay + (ah * i) / 4;
    s.addShape(pres.ShapeType.line, { x: ax - cm(0.2), y, w: cm(0.2), h: 0, line: { color: BLACK, width: 1 } });
    T(s, v === 0 ? "0（%）" : String(v), { x: ax - cm(3.0), y: y - cm(0.4), w: cm(2.7), h: cm(0.8), fontSize: 15, align: "right" });
  });
  const barW = cm(3.4);
  const bar = (xc, pct, fill, lineColor, label, denom, color) => {
    const h = (ah * pct) / 8;
    s.addShape(pres.ShapeType.rect, { x: xc - barW / 2, y: ay + ah - h, w: barW, h, fill: { color: fill }, line: { color: lineColor, width: 1.5 } });
    T(s, [{ text: pct.toFixed(1), options: { fontSize: 32, color, breakLine: false } }, { text: "%", options: { fontSize: 22, color } }], { x: xc - cm(2.5), y: ay + ah - h - cm(1.5), w: cm(5.0), h: cm(1.4), align: "center", valign: "bottom" });
    T(s, label + "\n" + denom, { x: xc - cm(2.5), y: ay + ah + cm(0.3), w: cm(5.0), h: cm(1.6), fontSize: 16, align: "center", lineSpacingMultiple: 1.2 });
  };
  bar(ax + cm(3.4), 7.2, BLUE, BLUE, "抗血栓薬あり", "23/318", BLUE);
  bar(ax + cm(8.6), 2.6, WHITE, BLACK, "抗血栓薬なし", "23/878", BLACK);
  // 右の説明：数字だけ 2 段大きく
  T(s, [{ text: "差 ", options: { fontSize: 22, breakLine: false } }, { text: "4.6", options: { fontSize: 32, color: BLUE, breakLine: false } }, { text: " ポイント", options: { fontSize: 22, color: BLUE } }], { x: cm(18.8), y: cm(6.0), w: cm(13.3), h: cm(1.5), valign: "bottom" });
  body(s, "95% CI 1.7–7.5、P = 0.001", { x: cm(18.8), y: cm(8.0), w: cm(13.3), h: cm(1.3), fontSize: 22 });
  body(s, "全体の後出血率 3.8%（46/1,196）", { x: cm(18.8), y: cm(9.6), w: cm(13.3), h: cm(1.3), fontSize: 22 });
  message(s, "ESD 後出血は抗血栓薬あり群で 4.6 ポイント高かった", cm(14.6));
  note(s, "後出血：術後 30 日以内の顕性出血で内視鏡止血・輸血・Hb 低下のいずれかを伴うもの。架空データ。");
  s.addNotes("数字（7.2、2.6、4.6）は単位より 2 段大きい 32pt、% とポイントは 22pt。介入群は青塗り、対照群は白塗り黒枠。棒・軸は図形、ラベルは文字。");
}
// ---------- 12 結果：多変量解析 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("結果：多変量解析", { placeholder: "title" });
  const b = (t) => ({ text: t, options: { color: BLUE } });
  threeLineTable(s, [
    ["因子", "調整 OR", "95% CI", "P 値"],
    [b("抗凝固薬の継続（DOAC・ワルファリン）"), b("3.42"), "1.71–6.84", "<0.001"],
    ["抗血小板薬 2 剤併用", "2.15", "1.02–4.53", "0.04"],
    ["抗血小板薬 単剤（継続）", "1.38", "0.71–2.68", "0.34"],
    ["腫瘍径 40 mm 以上", "1.94", "1.06–3.55", "0.03"],
    ["直腸病変", "1.62", "0.88–2.98", "0.12"],
    ["手技時間 90 分以上", "1.21", "0.64–2.29", "0.56"],
  ], [cm(14.2), cm(6.2), cm(6.2), cm(4.2)], { y: cm(4.8), rowH: cm(1.25) });
  message(s, "抗凝固薬の継続と腫瘍径 40 mm 以上が独立したリスク因子だった", cm(14.3));
  note(s, "年齢・性別で調整した多変量ロジスティック回帰。参照は抗血栓薬なし。架空データ。");
  s.addNotes("注目させたい行 1 つだけ青。");
}
// ---------- 13 考察 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("考察", { placeholder: "title" });
  const b = (t) => ({ text: t, options: { color: BLUE } });
  threeLineTable(s, [
    ["報告", "n", "後出血率", "抗凝固薬の OR"],
    ["[First Author, et al. Journal Year]", "[n]", "[%]", "[OR]"],
    ["[First Author, et al. Journal Year]", "[n]", "[%]", "[OR]"],
    [b("本研究"), "1,196", "3.8%", b("3.42")],
  ], [cm(12.4), cm(6.1), cm(6.1), cm(6.2)], { y: cm(4.8) });
  message(s, "抗凝固薬継続例のリスクは先行報告と同程度だった", cm(11.0));
  T(s, "抗凝固薬の継続は血栓塞栓症を防ぐ一方で後出血を 3 倍に増やす。\n40 mm 以上の病変では予防的止血の追加や入院期間の延長を検討する余地がある。", { x: X, y: cm(12.8), w: W, h: cm(2.6), fontSize: 20, align: "center", lineSpacingMultiple: 1.4 });
  s.addNotes("文献比較表 + メッセージ + 解釈 2 文。本研究の行だけ青。");
}
// ---------- 14 限界 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("本研究の限界", { placeholder: "title" });
  T(s, bullets(["後方視的研究であり、休薬の判断は担当医に委ねられていた", "抗凝固薬の継続例は 96 例と少なく、薬剤ごとの比較はできない", "3 施設とも高容量施設であり、一般化可能性に限りがある", "術後 30 日以降の出血と血栓塞栓症は評価していない"]), { x: X, y: cm(5.6), w: W, h: cm(10.0), fontSize: 26, lineSpacingMultiple: 1.6 });
  s.addNotes("限界は 3〜4 点以内。");
}
// ---------- 15 結語 ----------
{
  const s = pres.addSlide({ masterName: "TITLE_LOGO" });
  s.addText("結語", { placeholder: "title" });
  T(s, [
    { text: "大腸 ESD 後出血は全体で ", options: { fontSize: 26, breakLine: false } },
    { text: "3.8", options: { fontSize: 32, color: BLUE, breakLine: false } },
    { text: "%", options: { fontSize: 26, color: BLUE, breakLine: false } },
    { text: " に起こり、", options: { fontSize: 26, breakLine: true } },
    { text: "抗血栓薬あり群で 4.6 ポイント高かった。", options: { fontSize: 26 } },
  ], { x: X, y: cm(5.6), w: W, h: cm(2.8), lineSpacingMultiple: 1.5 });
  body(s, "独立したリスク因子は抗凝固薬の継続（OR 3.42）と\n腫瘍径 40 mm 以上（OR 1.94）であった。", { x: X, y: cm(9.0), w: W, h: cm(2.8) });
  body(s, "抗凝固薬継続例では予防的止血と術後管理の強化を検討すべきである。", { x: X, y: cm(12.6), w: W, h: cm(1.6) });
  s.addNotes("結語は 3 点以内。このスライドを表示したまま終わる。");
}

(async () => {
  const out = path.join(__dirname, "gakkai-sample2-ESD.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("written", out);
})();
