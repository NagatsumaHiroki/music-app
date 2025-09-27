import '@testing-library/jest-dom'

// モック関数のセットアップ
global.fetch = vi.fn()

// console.log を無効化してテストログをクリーンにする
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}
