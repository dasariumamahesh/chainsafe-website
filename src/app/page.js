"use client"

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <div className="space-y-2">
          <div>
            <Link
              href="/chainsafe"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Go to ChainSafe
            </Link>
          </div>
          <div>
            <Link
              href="/chainsafe/app"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Add Optional Chaining
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}