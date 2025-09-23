# Music App - 音楽検索アプリ

music-play-app から Next.js 15 に移行した音楽検索アプリケーションです。

## 特徴

- **Spotify API**を使用した楽曲検索
- **人気楽曲**の表示
- **Next.js 15**と**React 19**を使用
- **Server Components**中心の設計でクライアントコンポーネントを最小化
- **コロケーション構造**でコンポーネントを整理
- **ターミナルのみでのAPIログ出力**

## 技術スタック

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Font Awesome
- **API Client**: Axios
- **Images**: Next.js Image Optimization

## 環境設定

1. 環境変数を設定してください：

\`\`\`env
# .env.local
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_base64_encoded_client_id_here
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_base64_encoded_client_secret_here
\`\`\`

2. 依存関係をインストール：

\`\`\`bash
npm install
\`\`\`

## 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

http://localhost:3000 でアプリケーションにアクセスできます。

## ビルド

\`\`\`bash
npm run build
npm start
\`\`\`

## 移行で実装された要件

1. **コロケーション構造**: 各機能のコンポーネントを `src/app/_components/` に配置
2. **APIログのターミナル出力**: `src/lib/logging.ts` でサーバーサイドのみでログを出力
3. **クライアントコンポーネントの最小化**: 必要最小限のコンポーネントのみ `'use client'` を使用

## ディレクトリ構造

\`\`\`text
music-app/
├── public/                   # 静的ファイル
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── no_image.png         # 楽曲画像の代替画像
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── _components/     # ページレベルのコロケーション構造
│   │   │   ├── category-selector.tsx      # カテゴリ選択コンポーネント
│   │   │   ├── category-songs.tsx         # カテゴリ別楽曲表示
│   │   │   ├── infinite-scroll-songs.tsx  # 無限スクロール
│   │   │   ├── loading-spinner.tsx        # ローディング表示
│   │   │   ├── music-page-content.tsx     # メインページコンテンツ
│   │   │   ├── scroll-to-top-button.tsx   # トップスクロールボタン
│   │   │   ├── search-input.tsx           # 検索入力
│   │   │   ├── search-section.tsx         # 検索セクション
│   │   │   ├── song-display-section.tsx   # 楽曲表示セクション
│   │   │   └── song-list.tsx              # 楽曲リスト
│   │   ├── favicon.ico
│   │   ├── globals.css      # グローバルスタイル
│   │   ├── layout.tsx       # ルートレイアウト
│   │   ├── not-found.tsx    # 404ページ
│   │   └── page.tsx         # ホームページ
│   ├── lib/                 # ユーティリティ関数
│   │   ├── logging.ts       # ターミナル専用ログ出力
│   │   ├── spotify-api.ts   # Spotify API クライアント
│   │   └── spotify-token.ts # トークン管理
│   └── types/               # TypeScript 型定義
│       └── spotify.ts       # Spotify API レスポンス型
├── eslint.config.mjs        # ESLint設定
├── next-env.d.ts           # Next.js型定義
├── next.config.ts          # Next.js設定
├── package.json            # 依存関係
├── postcss.config.mjs      # PostCSS設定
├── README.md              # このファイル
└── tsconfig.json          # TypeScript設定
\`\`\`