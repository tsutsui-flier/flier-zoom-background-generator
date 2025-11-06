# flier UI Styleguide 利用ガイドライン

このファイルは、AI が UI を生成する際に従うべきルールを定義します。
**生成されるすべての UI は、Figma ライブラリ「flier UI Styleguide」で定義されたデザイントークンとコンポーネントに厳密に従う必要があります。**

---

## 1. 基本原則

- **ライブラリ優先:** UI 要素は必ず`flier UI Styleguide`ライブラリ内のコンポーネントを使用して構築してください。独自にスタイルを当てたり、新しいコンポーネントを作成したりしないでください。
- **レスポンシブデザイン:** 特別に指示がない限り、Auto Layout を使用してレスポンシブなレイアウトを構築してください。Absolute positioning（絶対配置）の使用は避けてください。
- **命名規則の遵守:** 作成するレイヤーやフレームには、その役割が明確にわかる名前（例: `Header`, `User Card`, `Button Group`）を付けてください。

---

## 2. デザイントークン (Design Tokens) の利用

デザインのすべての要素（色、間隔、タイポグラフィ）は、`flier UI Styleguide`ライブラリの**Variables**で定義されたデザイントークンを使用してください。生の値を直接指定することは禁止します。

### 🎨 カラー (Color Palette)

- **Variables の使用:** 色はすべて`flier UI Styleguide`の Color Variables から適用してください。Hex コード（例: `#000000`）を直接使用せず、`primitive/[色名]`や`semantic/color/[役割]`などの Variable をリンクさせてください。
- **役割に応じた色の選択:**
  - **Primary Color:** 主要なアクションボタンや最も目立たせたい要素に使用します。(`[例: semantic/color/action/primary]`)
  - **Surface Color:** 背景色やカードのベースカラーとして使用します。(`[例: semantic/color/surface/default]`)
  - **Text Color:** 用途に応じて定義されたテキストカラーを使用してください。（例: `Body`, `Subtle`, `Disabled`など）(`[例: semantic/color/text/body]`)
  - **Border Color:** 境界線には指定のボーダーカラーを使用します。(`[例: semantic/color/border/default]`)

### 📐 間隔 (Spacing)

- **Variables の使用:** マージン、パディング、要素間の距離は、すべて Spacing Variables（例: `spacing/xs`, `spacing/sm`, `spacing/md`, `spacing/lg`）を使用して設定してください。
- **ピクセル値の直接指定禁止:** `8px`や`16px`といった具体的なピクセル値を直接入力するのではなく、定義済みの Spacing Variable を適用してください。
- **グリッドシステム:** レイアウトの基本グリッドは`[例: 8px]`単位です。すべての間隔はこの倍数に従います。

### 📝 テキストスタイル (TextStyles)

- **Variables の使用:** すべてのテキストには`flier UI Styleguide`で定義された Text Style Variables（例: `Heading/H1`, `Body/Large-Bold`, `Label/Small`）を適用してください。
- **個別設定の禁止:** フォントファミリー、サイズ、ウェイト、行間などを個別に設定することはせず、必ず定義済みのスタイルから選択してください。

---

## 3. コンポーネント (Components) の利用

UI を構成する際は、`flier UI Styleguide`ライブラリに登録されているコンポーネントを**最優先で**使用してください。

### Button

- **目的と階層に応じた使い分け:**
  - **Primary Button:** 画面内で最も重要なアクションに 1 つだけ使用します。（例: フォームの送信、決定）
  - **Secondary Button:** 2 番目に重要なアクションに使用します。（例: キャンセル、戻る）
  - **Tertiary/Text Button:** 最も優先度の低いアクションに使用します。（例: さらに表示、詳細）
- **ラベル:** ボタンのラベルは、動詞または短いフレーズで、実行されるアクションが明確にわかるようにしてください。（例: 「保存する」「次へ」）

### [その他のコンポーネント名 (例: Card, TextField, etc.)]

- **[コンポーネントの利用ルール 1]:** （例: Card は必ず Header、Body、Footer の構造を守ってください。）
- **[コンポーネントの利用ルール 2]:** （例: TextField には必ず対応する Label を付けてください。）
- **[コンポーネントの利用ルール 3]:** （例: アイコンは単独で使用せず、必ず IconButton コンポーネントでラップしてください。）
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

- Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
- Refactor code as you go to keep code clean
- Keep file sizes small and put helper functions and components in their own files.

---

# Design system guidelines

Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

- Use a base font-size of 14px
- Date formats should always be in the format “Jun 10”
- The bottom toolbar should only ever have a maximum of 4 items
- Never use the floating action button with the bottom toolbar
- Chips should always come in sets of 3 or more
- Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:

## Button

The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage

Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants

- Primary Button
  - Purpose : Used for the main action in a section or page
  - Visual Style : Bold, filled with the primary brand color
  - Usage : One primary button per section to guide users toward the most important action
- Secondary Button
  - Purpose : Used for alternative or supporting actions
  - Visual Style : Outlined with the primary color, transparent background
  - Usage : Can appear alongside a primary button for less important actions
- Tertiary Button
  - Purpose : Used for the least important actions
  - Visual Style : Text-only with no border, using primary color
  - Usage : For actions that should be available but not emphasized
    -->
