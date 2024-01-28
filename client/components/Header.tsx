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
      <div className="flex items-center gap-6 invisible md:visible">
        <p className="cursor-pointer hover:underline">Privacy Policy</p>
        <p className="cursor-pointer hover:underline">About</p>
      </div>
    </nav>
  );
}
