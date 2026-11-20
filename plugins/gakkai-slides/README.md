# gakkai-slides

医学系学会の口演スライドを「学会スライド 王道デザイン」で Claude Slides のデッキとして作成する Claude Code プラグインです。

## インストール

```
/plugin marketplace add masa-med-ai/2026-7-Claude-
/plugin install gakkai-slides@masa-med-ai
```

## 使い方

「学会スライドを作って」「王道デザインで口演スライド」「この抄録を学会スライドにして」のように頼むと、スキル `gakkai-slides` が起動します。`/gakkai-slides:gakkai-slides 抄録や要点` でも呼び出せます。

## 中身

| パス | 内容 |
|---|---|
| `skills/gakkai-slides/SKILL.md` | 作成手順と必ず守るルール |
| `skills/gakkai-slides/references/design-rules.md` | デザインルール全文 |
| `skills/gakkai-slides/references/slide-templates.md` | スライド種別ごとの HTML ひな形 |
| `skills/gakkai-slides/references/tokens.json` | 色・文字サイズ・余白のトークン |
| `skills/gakkai-slides/assets/showa-medical-university.png` | 左下に置く所属ロゴ |
| `skills/gakkai-slides/assets/gakkai-template.potx` | スライド番号プレースホルダ入りの PowerPoint テンプレート |

## 制約

- Claude Slides は 1 つのテキスト内で文字サイズを変えられません。数字と単位は別要素を横に並べます。
- Claude Slides の PowerPoint 書き出しにはスライド番号プレースホルダがありません。番号が必要な場合は同梱の `.potx` を使います。
