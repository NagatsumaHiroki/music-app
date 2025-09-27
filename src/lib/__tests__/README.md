# Spotify API テストドキュメント

このディレクトリには、Spotify APIデータ取得機能のViteテストコードが含まれています。

## テストファイル構成

### 1. `spotify-token.test.ts`
Spotify認証トークン取得機能のテスト
- `generateToken()`: 認証情報からアクセストークンを生成
- `fetchToken()`: 環境変数からトークンを取得
- エラーハンドリングテスト
- Base64デコードエラーテスト

### 2. `spotify-api.test.ts`
Spotify API各機能の単体テスト
- `getPopularSongs()`: 人気曲取得
- `searchSongInfo()`: 楽曲検索
- `getCategories()`: カテゴリー一覧取得
- `getCategoryPlaylists()`: カテゴリー別プレイリスト取得
- `getPlaylistTracks()`: プレイリスト楽曲取得
- 各APIのエラーハンドリング

### 3. `integration.test.ts`
統合テスト
- トークン取得から楽曲検索までの一連の流れ
- API失敗時の動作確認
- 並行処理テスト

## テスト実行方法

```bash
# すべてのテストを実行
npm run test

# テストを1回だけ実行（CI環境向け）
npm run test:run

# ウォッチモードでテスト実行
npm run test:watch

# UIモードでテスト実行
npm run test:ui

# カバレッジ付きでテスト実行
npm run test:coverage
```

## テストの特徴

### モック使用
- **axios**: HTTP通信をモック
- **ログ出力**: console出力を無効化
- **環境変数**: テスト用の値を設定

### テストカバレッジ
- 正常系テスト
- 異常系テスト（API エラー、認証失敗など）
- エッジケーステスト（短いID、無効なBase64など）

### 実際のAPIコールなし
すべてのテストはモックを使用しており、実際のSpotify APIには接続しません。そのため、API制限や認証情報なしでもテストを実行できます。

## 新しいテストの追加

新しいAPI機能を追加した場合：

1. 対応するテストファイルに新しいdescribeブロックを追加
2. 正常系と異常系の両方をテスト
3. モックレスポンスは実際のAPI仕様に準拠
4. エラーハンドリングも忘れずにテスト

例：
```typescript
describe('新しい関数', () => {
  it('正常に動作すること', async () => {
    // 正常系テスト
  })

  it('エラー時に適切に例外をスローすること', async () => {
    // 異常系テスト
  })
})
```
