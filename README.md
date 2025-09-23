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

\`\`\`bash
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

\`\`\`
src/
├── app/
│   ├── _components/          # ページレベルのコロケーション構造
│   │   ├── loading-spinner.tsx
│   │   ├── music-page-content.tsx
│   │   ├── scroll-to-top-button.tsx
│   │   ├── search-input.tsx
│   │   ├── search-section.tsx
│   │   ├── song-display-section.tsx
│   │   └── song-list.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── lib/
│   ├── logging.ts            # ターミナル専用ログ
│   ├── spotify-api.ts        # Spotify API関数
│   └── spotify-token.ts      # トークン管理
└── types/
    └── spotify.ts            # TypeScript型定義
\`\`\`