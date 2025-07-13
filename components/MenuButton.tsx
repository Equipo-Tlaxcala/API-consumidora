'use client';
import Link from 'next/link';

export default function MenuButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block w-60 rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
    >
      {label}
    </Link>
  );
}
