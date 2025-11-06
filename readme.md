# flier Zoom背景ジェネレータ

flier社員用のZoom/Google Meet背景画像を簡単に作成できるWebアプリケーションです。

## 🌐 オンライン版

**すぐに使いたい方はこちら:**
[https://tsutsui-flier.github.io/flier-zoom-background-generator/](https://tsutsui-flier.github.io/flier-zoom-background-generator/)

ブラウザだけで使えます。インストール不要！

---

## 機能

- 3つのテンプレートから選択可能
- 名前、所属、役職を入力してリアルタイムプレビュー
- 1920x1080pxのPNG画像として出力
- LINE Seed JPフォントを使用

## ローカル環境で使う場合

### 1. 必要な環境

- Python 3（macOS/Linuxの場合は標準でインストール済み）
- Windowsの場合: [Python公式サイト](https://www.python.org/downloads/)からダウンロード

### 2. 起動方法

#### macOS / Linux の場合

1. ターミナルを開く
2. このフォルダに移動:
   ```bash
   cd /path/to/このフォルダ
   ```
3. HTTPサーバーを起動:
   ```bash
   python3 -m http.server 8000
   ```
4. ブラウザで以下にアクセス:
   ```
   http://localhost:8000/
   ```

#### Windows の場合

1. コマンドプロンプトまたはPowerShellを開く
2. このフォルダに移動:
   ```cmd
   cd C:\path\to\このフォルダ
   ```
3. HTTPサーバーを起動:
   ```cmd
   python -m http.server 8000
   ```
   （`python3`コマンドがない場合は`python`を使用）
4. ブラウザで以下にアクセス:
   ```
   http://localhost:8000/
   ```

### 3. 背景画像の作成

1. フォームに必要事項を入力
   - 所属（例: 編集部）※任意
   - 氏名（日本語）（例: 山田 太郎）
   - 氏名（英語）（例: Yamada Taro）
   - 役職（例: エンジニア）※任意

2. 3つのテンプレートのプレビューを確認

3. 好きなテンプレートの「ダウンロード」ボタンをクリック

4. `zoom-background-{英語名}.png` という名前でダウンロードされます

## 重要な注意事項

⚠️ **必ずHTTPサーバー経由でアクセスしてください**

- ❌ `index.html`をダブルクリックして開くと、セキュリティ制限によりダウンロードできません
- ✅ 上記の手順で`http://localhost:8000/`からアクセスしてください

## トラブルシューティング

### ポート8000が既に使用されている場合

別のポート番号を指定してください:
```bash
python3 -m http.server 8001
```
その場合、ブラウザでは`http://localhost:8001/`にアクセスしてください。

### ダウンロードできない場合

1. ブラウザのアドレスバーを確認
   - `http://localhost:8000/`になっているか確認
   - `file:///`で始まる場合は、上記の手順でHTTPサーバーを起動してアクセスし直してください

2. ブラウザのコンソール（F12キー）を開いてエラーを確認

### サーバーを停止したい場合

ターミナル/コマンドプロンプトで`Ctrl+C`を押してください。

## ファイル構成

```
.
├── README.md                 # このファイル
├── index.html                # メインHTMLファイル
├── app.js                    # JavaScript（Canvas描画処理）
├── flieruistyleguide.css     # flierデザインシステムCSS
├── font/                     # LINE Seed JPフォント
│   ├── LINESeedJP_OTF_Bd.otf
│   ├── LINESeedJP_OTF_Rg.otf
│   └── LINESeedJP_OTF_Th.otf
└── img/                      # テンプレート画像
    ├── templateA_bg.png
    ├── templateB_bg.png
    ├── templateC_bg.png
    ├── Image1 Container_ダウンロードする中には含めないでください.svg
    ├── Image2 Container_ダウンロードする中には含めないでください.svg
    ├── Image3 Container_ダウンロードする中には含めないでください.svg
    ├── rectangle_blue.svg
    └── Union.svg
```

## 🚀 GitHub Pagesへのデプロイ方法

このプロジェクトを無料でオンライン公開する手順です。

### 前提条件
- GitHubアカウントを持っていること

### デプロイ手順

1. **GitHubで新しいリポジトリを作成**
   - [https://github.com/new](https://github.com/new) にアクセス
   - Repository name: `flier-zoom-background-generator` (任意の名前)
   - Public を選択
   - 「Create repository」をクリック

2. **ローカルでコミット＆プッシュ**
   ```bash
   # このフォルダで実行
   git add .
   git commit -m "Initial commit: flier Zoom背景ジェネレータ"
   git remote add origin https://github.com/YOUR-USERNAME/flier-zoom-background-generator.git
   git push -u origin main
   ```

3. **GitHub Pagesを有効化**
   - GitHubのリポジトリページで「Settings」タブをクリック
   - 左メニューから「Pages」を選択
   - Source: 「main」ブランチを選択
   - 「Save」をクリック

4. **公開URLを確認**
   - 数分待つと、以下のURLでアクセス可能になります:
   - `https://YOUR-USERNAME.github.io/flier-zoom-background-generator/`

5. **READMEのURLを更新**
   - `readme.md`の`YOUR-USERNAME`を実際のGitHubユーザー名に置き換えてコミット

### 他のデプロイオプション

#### Netlify（ドラッグ&ドロップで簡単）
1. [Netlify](https://www.netlify.com/) にアクセス
2. フォルダごとドラッグ&ドロップ
3. 即座に公開URL取得

#### Vercel（GitHubと連携）
1. [Vercel](https://vercel.com/) にアクセス
2. GitHubリポジトリをインポート
3. 自動デプロイ設定完了

## ライセンス

このプロジェクトはflier社内での使用を目的としています。
