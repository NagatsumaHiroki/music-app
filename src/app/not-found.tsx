import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-2xl text-gray-300">Page Not Found</p>
      <p className="mt-2 text-gray-400">お探しのページは存在しません。</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
