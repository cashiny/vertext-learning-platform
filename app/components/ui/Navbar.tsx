import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-8">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-xs bg-primary-500 text-xs font-bold text-white">
          V
        </span>
        <span className="font-display text-lg font-bold text-neutral-900">
          Vertex
        </span>
      </Link>
      <div className="flex items-center gap-6 font-sans text-sm font-medium text-neutral-700">
        <Link href="/courses" className="hover:text-neutral-900">
          Courses
        </Link>
        <Link href="/my-learning" className="hover:text-neutral-900">
          My Learning
        </Link>
      </div>
    </nav>
  );
}
