/**
 * ログ設定
 * - サーバーサイドログ: ターミナルのみに表示
 * - クライアントサイドログ: ブラウザConsoleに表示
 */

// サーバーサイド専用ログ（ターミナルのみ）
export const log = {
  info: (message: string, ...args: unknown[]) => {
    if (typeof window === 'undefined' && typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
      // 開発環境でサーバーサイドのみログ出力
      process.stdout.write(`[INFO] ${message} ${args.length > 0 ? JSON.stringify(args) : ''}\n`);
    }
  },
  error: (message: string, error?: unknown) => {
    if (typeof window === 'undefined' && typeof process !== 'undefined') {
      // エラーは本番でもサーバーサイドに出力
      process.stderr.write(`[ERROR] ${message} ${error ? JSON.stringify(error) : ''}\n`);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (typeof window === 'undefined' && typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
      // 警告は開発環境でサーバーサイドのみ出力
      process.stdout.write(`[WARN] ${message} ${args.length > 0 ? JSON.stringify(args) : ''}\n`);
    }
  }
};

// クライアントサイド専用ログ（ブラウザConsoleに表示）
export const clientLog = {
  info: (message: string, ...args: unknown[]) => {
    if (typeof window !== 'undefined') {
      console.log(`[CLIENT INFO] ${message}`, ...args);
    }
  },
  error: (message: string, error?: unknown) => {
    if (typeof window !== 'undefined') {
      console.error(`[CLIENT ERROR] ${message}`, error);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (typeof window !== 'undefined') {
      console.warn(`[CLIENT WARN] ${message}`, ...args);
    }
  },
  debug: (message: string, ...args: unknown[]) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.debug(`[CLIENT DEBUG] ${message}`, ...args);
    }
  }
};
