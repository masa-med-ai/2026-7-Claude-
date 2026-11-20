# スライドのひな形（Claude Slides 用 HTML）

各ファイルは `<section>` 1 つだけ。`LOGO_URL` はアップロードしたロゴの URL に置き換える。`id` はファイル名と同じにする。
共通部分は次の 3 つ。

```html
<!-- section の style（全スライド共通） -->
background:#ffffff;color:#000000;font-family:'BIZ UDPGothic', Arial, sans-serif;padding:57px 112px 120px;display:flex;flex-direction:column;gap:0

<!-- タイトルと仕切り線 -->
<h2 style="font-size:72px;font-weight:400;line-height:1.25;text-align:center;padding:0 0 57px 0">背景</h2>
<div style="height:3px;background:#000000;box-shadow:0 3px 6px rgba(0,0,0,0.18)"></div>

<!-- ロゴ（3 枚目以降） -->
<img src="LOGO_URL" alt="SHOWA Medical University" style="position:absolute;left:17px;top:981px;width:504px;height:68px;object-fit:contain">
```

## cover（表紙）

```html
<section id="cover" data-transition="fade" style="background:#ffffff;color:#000000;font-family:'BIZ UDPGothic', Arial, sans-serif;padding:112px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:80px">
<p style="position:absolute;right:112px;top:74px;width:1000px;font-size:30px;line-height:1.4;text-align:right">第 ○○ 回 △△学会学術集会　2026年○月○日<br>場所・主題番号・テーマ</p>
<h1 style="font-size:96px;font-weight:400;line-height:1.4;text-align:center">演題名の 1 行目<br>語句の切れ目で改行<br>3 行まで</h1>
<div style="display:flex;flex-direction:column;gap:16px;align-items:center">
<p style="font-size:44px;line-height:1.5;text-align:center">○発表者名、[共同演者名]、[共同演者名]</p>
<p style="font-size:44px;line-height:1.5;text-align:center">所属</p>
</div>
<aside>話す要点</aside>
</section>
```

## text（本文のみ：COI、背景、目的、評価項目、結語）

本文ラッパーの `padding-top` で配置を決める（`upper` の計算は SKILL.md）。下の例は 2 行 × 3 ブロック（高さ 3×156 + 2×34 = 536px → padding-top 72px）。

```html
<section id="background" data-transition="fade" style="（共通）">
<h2 style="font-size:72px;font-weight:400;line-height:1.25;text-align:center;padding:0 0 57px 0">背景</h2>
<div style="height:3px;background:#000000;box-shadow:0 3px 6px rgba(0,0,0,0.18)"></div>
<div style="padding-top:72px;display:flex;flex-direction:column;gap:34px">
<p style="font-size:52px;line-height:1.5">既知のこと 1 の前半、<br>後半</p>
<p style="font-size:52px;line-height:1.5">既知のこと 2 の前半、<br>後半</p>
<p style="font-size:52px;line-height:1.5">未解決の問題の前半、<br>後半</p>
</div>
<img src="LOGO_URL" alt="SHOWA Medical University" style="position:absolute;left:17px;top:981px;width:504px;height:68px;object-fit:contain">
<p style="position:absolute;right:112px;top:960px;width:1000px;font-size:28px;line-height:1.4;text-align:right">First Author, et al. <b><i>Journal</i></b> Year<br>First Author, et al. <b><i>Journal</i></b> Year</p>
<aside>話す要点</aside>
</section>
```

- 青の強調：`<span style="color:#1f5aa6">腺腫検出率</span>`。
- 3 行以下のスライド（目的など）は `font-size:64px` に上げる。
- 文中の数字を大きくする行：

```html
<div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap"><p style="font-size:52px;line-height:1.5">後出血は全体で</p><p style="font-size:64px;line-height:1.1;color:#1f5aa6">3.8</p><p style="font-size:52px;line-height:1.5;color:#1f5aa6">%</p><p style="font-size:52px;line-height:1.5">に起こった。</p></div>
```

## bullets（箇条書き：統計解析、限界）

```html
<div style="padding-top:60px">
<ul style="font-size:44px;line-height:1.7">
<li>主解析：○○を目的変数とする多変量ロジスティック回帰</li>
<li>共変量：年齢、性別、…（長い項目は<br>語句の切れ目で改行）</li>
<li>有意水準 両側 5%。解析ソフト：R 4.4.1</li>
</ul>
</div>
```

限界は `font-size:52px`、3〜4 項目。

## two-column（方法：研究デザインと対象）

```html
<p style="padding-top:54px;font-size:52px;line-height:1.5">2019 年 1 月〜2024 年 12 月、3 施設の後方視的コホート研究</p>
<div style="padding-top:40px;display:flex;gap:96px">
<div style="flex:1;display:flex;flex-direction:column;gap:20px">
<p style="font-size:48px;line-height:1.45">登録基準</p>
<ul style="font-size:44px;line-height:1.5"><li>基準 1</li><li>基準 2</li><li>基準 3</li></ul>
</div>
<div style="flex:1;display:flex;flex-direction:column;gap:20px">
<p style="font-size:48px;line-height:1.45">除外基準</p>
<ul style="font-size:44px;line-height:1.5"><li>基準 1</li><li>基準 2</li><li>基準 3</li></ul>
</div>
</div>
<p style="position:absolute;left:560px;top:1003px;width:1000px;font-size:28px;line-height:1.4">倫理審査承認番号 [承認番号]。オプトアウト方式で同意を取得。</p>
```

## flow（方法：患者フロー）

除外人数の合計が合うことを確かめる。

```html
<div style="flex:1;display:flex;gap:64px;align-items:center">
<div style="width:760px;display:flex;flex-direction:column;align-items:center;gap:0">
<div style="width:760px;border:2px solid #000000;padding:20px 32px"><p style="font-size:36px;line-height:1.4;text-align:center">期間中の全症例　n = 1,284</p></div>
<x-shape kind="arrow-down" style="background:#000000;width:36px;height:72px"></x-shape>
<div style="width:760px;border:2px solid #000000;padding:20px 32px"><p style="font-size:36px;line-height:1.4;text-align:center">解析対象　n = 1,196</p></div>
<x-shape kind="arrow-down" style="background:#000000;width:36px;height:72px"></x-shape>
<div style="width:760px;display:flex;gap:32px">
<div style="flex:1;border:2px solid #1f5aa6;padding:20px 24px"><p style="font-size:36px;line-height:1.4;text-align:center;color:#1f5aa6">曝露群<br>n = 318</p></div>
<div style="flex:1;border:2px solid #000000;padding:20px 24px"><p style="font-size:36px;line-height:1.4;text-align:center">対照群<br>n = 878</p></div>
</div>
</div>
<div style="flex:1;display:flex;flex-direction:column;gap:12px">
<p style="font-size:44px;line-height:1.45">除外　n = 88</p>
<ul style="font-size:36px;line-height:1.5"><li>理由 1　14</li><li>理由 2　41</li><li>理由 3　19</li><li>理由 4　14</li></ul>
</div>
</div>
```

## figure-text（方法：手技・機器、画像 + 説明）

画像が無いときは黒 2px 枠のプレースホルダを置く。画像があれば同じ大きさの `<img style="width:760px;height:540px;object-fit:contain">`。

```html
<div style="flex:1;display:flex;gap:64px;align-items:center">
<div style="width:760px;height:540px;border:2px solid #000000;display:flex;align-items:center;justify-content:center"><p style="font-size:30px;text-align:center;width:600px">[画像の説明]<br>実際の画像を貼る</p></div>
<div style="flex:1;display:flex;flex-direction:column;gap:20px">
<ul style="font-size:44px;line-height:1.5"><li>機器：[機種名]、[型番]</li><li>手順の要点</li><li>実施者の条件</li><li>対照群との違い</li></ul>
</div>
</div>
```

## table（結果：患者背景、副次評価項目、多変量解析）

1 行目の全セルに `width:N%` を付ける。注目させるセルだけ `color:#1f5aa6`。

```html
<div style="padding-top:80px"><table style="font-size:36px;line-height:1.4;color:#000000;border-top:3px solid #000000;border-bottom:3px solid #000000;padding:14px 16px">
<tr><th style="width:36%;text-align:center;font-weight:400;color:#000000">項目</th><th style="width:25%;text-align:center;font-weight:400;color:#000000">A 群（n = 318）</th><th style="width:25%;text-align:center;font-weight:400;color:#000000">B 群（n = 878）</th><th style="width:14%;text-align:center;font-weight:400;color:#000000">P 値</th></tr>
<tr><td style="text-align:center">年齢（歳）、中央値（IQR）</td><td style="text-align:center">74（68–79）</td><td style="text-align:center">68（60–75）</td><td style="text-align:center">&lt;0.001</td></tr>
<tr><td style="text-align:center">男性、n（%）</td><td style="text-align:center">221（69.5）</td><td style="text-align:center">512（58.3）</td><td style="text-align:center">&lt;0.001</td></tr>
</table></div>
<p style="padding-top:48px;font-size:48px;line-height:1.45;text-align:center">表から言える 1 文（メッセージ行）</p>
<img src="LOGO_URL" alt="SHOWA Medical University" style="position:absolute;left:17px;top:981px;width:504px;height:68px;object-fit:contain">
<p style="position:absolute;left:560px;top:1003px;width:1000px;font-size:28px;line-height:1.4">IQR：四分位範囲。</p>
```

考察の文献比較表は同じ形で、表の下にメッセージ行と解釈 2 行（40px、中央揃え、`padding-top:24px`）を置く。

## bar-chart（結果：主要評価項目）

軸の最大値を `MAX`、描画域の高さを 380px（y=40〜420）とすると、棒の高さ = 380 × 値 ÷ MAX、棒の y = 420 − 高さ。数値ラベルの `top` = 棒の y − 78。

```html
<div style="padding-top:72px;display:flex;gap:64px;align-items:center">
<div style="position:relative;width:900px;height:500px">
<svg aria-label="A 群 7.2%、B 群 2.6% の棒グラフ" viewBox="0 0 900 500" width="900" height="500"><line x1="120" y1="40" x2="120" y2="420" stroke="#000000" stroke-width="2"/><line x1="120" y1="420" x2="880" y2="420" stroke="#000000" stroke-width="2"/><line x1="110" y1="40" x2="120" y2="40" stroke="#000000" stroke-width="2"/><line x1="110" y1="135" x2="120" y2="135" stroke="#000000" stroke-width="2"/><line x1="110" y1="230" x2="120" y2="230" stroke="#000000" stroke-width="2"/><line x1="110" y1="325" x2="120" y2="325" stroke="#000000" stroke-width="2"/><rect x="250" y="78" width="210" height="342" fill="#1f5aa6"/><rect x="590" y="297" width="210" height="123" fill="#ffffff" stroke="#000000" stroke-width="3"/></svg>
<p style="position:absolute;left:0;top:22px;width:96px;font-size:30px;text-align:right">8</p>
<p style="position:absolute;left:0;top:117px;width:96px;font-size:30px;text-align:right">6</p>
<p style="position:absolute;left:0;top:212px;width:96px;font-size:30px;text-align:right">4</p>
<p style="position:absolute;left:0;top:307px;width:96px;font-size:30px;text-align:right">2</p>
<p style="position:absolute;left:0;top:402px;width:96px;font-size:30px;text-align:right">0（%）</p>
<div style="position:absolute;left:215px;top:0;width:280px;display:flex;justify-content:center;align-items:baseline;gap:4px"><p style="font-size:64px;line-height:1.1;color:#1f5aa6">7.2</p><p style="font-size:44px;line-height:1.1;color:#1f5aa6">%</p></div>
<div style="position:absolute;left:555px;top:218px;width:280px;display:flex;justify-content:center;align-items:baseline;gap:4px"><p style="font-size:64px;line-height:1.1">2.6</p><p style="font-size:44px;line-height:1.1">%</p></div>
<p style="position:absolute;left:195px;top:432px;width:320px;font-size:32px;text-align:center">A 群　23/318</p>
<p style="position:absolute;left:535px;top:432px;width:320px;font-size:32px;text-align:center">B 群　23/878</p>
</div>
<div style="flex:1;display:flex;flex-direction:column;gap:24px">
<div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap"><p style="font-size:44px;line-height:1.3">差</p><p style="font-size:64px;line-height:1.1;color:#1f5aa6">4.6</p><p style="font-size:44px;line-height:1.3;color:#1f5aa6">ポイント</p></div>
<p style="font-size:44px;line-height:1.45">95% CI 1.7–7.5、P = 0.001</p>
<p style="font-size:44px;line-height:1.45">調整解析や全体の値を 1 行</p>
</div>
</div>
<p style="padding-top:40px;font-size:48px;line-height:1.45;text-align:center">図から言える 1 文（メッセージ行）</p>
```

- 割合の差は「ポイント」と書く。各棒に分母を添える。
- 3 群以上は青塗り / 白塗り黒枠 / 黒塗りで区別する。
