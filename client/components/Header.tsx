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
      <p className="cursor-pointer hover:underline bg-violet-600 text-gray-200 px-2 rounded-full">
        About
      </p>
    </nav>
  );
}
