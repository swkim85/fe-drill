import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white dark:bg-black">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold">
          홈
        </Link>
        <nav className="flex gap-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
