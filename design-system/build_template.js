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


{ const s = pres.addSlide({ masterName: "COVER" });
  T(s, "第 ○○ 回 △△学会学術集会　2026年○月○日\n場所・主題番号・テーマ", { x: cm(15.5), y: cm(1.3), w: cm(16.4), h: cm(1.6), fontSize: 15, align: "right", lineSpacingMultiple: 1.4 });
  T(s, "演題名（48 pt・中央揃え・語句の切れ目で改行）", { x: X, y: cm(4.8), w: W, h: cm(7.2), fontSize: 48, align: "center", valign: "middle", lineSpacingMultiple: 1.4 });
  T(s, "○発表者名、共同演者名", { x: X, y: cm(13.6), w: W, h: cm(1.2), fontSize: 22, align: "center" });
  T(s, "所属", { x: X, y: cm(15.1), w: W, h: cm(1.2), fontSize: 22, align: "center" }); }
{ const s = pres.addSlide({ masterName: "TITLE_NO_LOGO" }); s.addText("利益相反（COI）の開示", { placeholder: "title" });
  body(s, "本文 26 pt、左揃え、7 行まで。ロゴなし。", { x: X, y: cm(7.0), w: W, h: cm(1.4) }); }
{ const s = pres.addSlide({ masterName: "TITLE_LOGO" }); s.addText("セクション名（背景・方法：対象・結果：主要評価項目 など）", { placeholder: "title" });
  body(s, "本文 26 pt、左揃え、7 行まで。改行は語句の切れ目で。\n数字は単位より 2 段大きく（例 32 pt + 22 pt）。色は白・黒・青・赤のみ。", { x: X, y: cm(5.6), w: W, h: cm(4.0) });
  message(s, "図表スライドのメッセージ行（24 pt・中央）", cm(14.3));
  note(s, "注記・出典 14 pt。引用は右下に 1 文献 1 行、雑誌名だけ太字イタリック。"); }
(async () => {
  const out = path.join(__dirname, "gakkai-template.pptx");
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("written", out);
})();
