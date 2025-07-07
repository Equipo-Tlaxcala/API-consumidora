'use client';
import Link from 'next/link';

export default function BackButton() {
  return (
    <Link
      href="/"
      className="mt-6 inline-block rounded bg-gray-300 px-3 py-1 hover:bg-gray-400"
    >
       Volver al menú
    </Link>
  );
}
