"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { founders } from "@/data/founders";

const COVER = "/images/through-the-doors-of-life.jpeg";

export default function BookPage() {
  const params = useParams<{ slug: string; bookSlug: string }>();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const founder = founders.find((f) => f.slug === params.slug);
  if (!founder) notFound();

  const book = founder.books?.find((b) => b.slug === params.bookSlug);
  if (!book) notFound();

  const coverScale = Math.max(0.08, 1 - scrollY / 270);
  const coverTranslateY = -(scrollY * 0.35);
  const coverOpacity = scrollY > 180 ? Math.max(0, 1 - (scrollY - 180) / 70) : 1;

  const comingSoonOpacity = Math.min(1, Math.max(0, (scrollY - 120) / 160));
  const comingSoonBlur = Math.max(0, 12 * (1 - (scrollY - 120) / 160));

  return (
    <main className="bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-stone-100 px-4 sm:px-8 py-6 flex items-center gap-3">
        <Link href="/" className="text-xl font-bold text-stone-800">
          H
        </Link>
        <div
          className="flex items-center gap-3"
          style={{
            opacity: scrollY > 250 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <img src={COVER} alt={book.title} className="w-8 h-10 object-cover rounded" />
          <span className="text-xl font-bold text-stone-800">{book.title}</span>
        </div>
      </nav>

      <div className="relative min-h-[130vh]">
        {/* Coming soon */}
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0"
          style={{
            opacity: comingSoonOpacity,
            filter: comingSoonBlur > 0 ? `blur(${comingSoonBlur}px)` : "none",
            transition: "none",
          }}
        >
          <p className="text-3xl md:text-5xl font-medium text-stone-800 mb-3">
            Coming Soon
            <span style={{ animation: "dot1 3s infinite" }}>.</span>
            <span style={{ animation: "dot2 3s infinite" }}>.</span>
            <span style={{ animation: "dot3 3s infinite" }}>.</span>
          </p>
          <p className="text-stone-400 text-sm">This book is currently being written by {book.author}</p>
        </div>

        {/* Sticky book cover */}
        <div className="sticky top-0 h-screen flex items-center justify-center z-10">
          <div
            className="flex flex-col items-center"
            style={{
              transform: `translateY(${coverTranslateY}px) scale(${coverScale})`,
              opacity: coverOpacity,
              transformOrigin: "top center",
              transition: "none",
            }}
          >
            <img
              src={COVER}
              alt={book.title}
              className="w-80 h-auto rounded-xl shadow-lg mb-6"
            />
            <h1 className="text-3xl font-medium text-stone-800 mb-2">{book.title}</h1>
            <p className="text-stone-400 text-sm">{book.author}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
