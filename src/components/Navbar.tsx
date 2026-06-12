import Link from "next/link";

export default function Navbar({ className = "text-stone-800" }: { className?: string }) {
  return (
    <Link href="/" className={`text-xl font-bold ${className}`}>
      H
    </Link>
  );
}
