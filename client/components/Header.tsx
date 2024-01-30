import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex items-center justify-between">
      <Link
        href="/"
        className="font-young-serif font-bold text-3xl tracking-wider"
      >
        Chroma
      </Link>
      <Link
        href="/palette/generate"
        className="cursor-pointer hover:underline bg-violet-700 hover:bg-violet-800 text-gray-200 px-4 py-1 rounded-full"
      >
        Try Now
      </Link>
    </nav>
  );
}
