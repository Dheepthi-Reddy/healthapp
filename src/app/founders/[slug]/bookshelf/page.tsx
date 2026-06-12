import { founders } from "@/data/founders";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }));
}

export default async function FounderBookshelfPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const founder = founders.find((f) => f.slug === slug);
  if (!founder) notFound();

  const books = founder.books ?? [];

  return (
    <main className="min-h-screen flex flex-col bg-white text-stone-900">

      {/* Nav */}
      <nav className="flex justify-between items-center px-4 sm:px-8 py-6 gap-4">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Navbar />
          <span className="font-medium text-stone-800 truncate">{founder.name}</span>
        </div>
        <div className="flex gap-3 sm:gap-6 flex-shrink-0">
          <Link
            href={`/founders/${founder.slug}`}
            className="text-xs sm:text-sm text-stone-400 hover:text-stone-700 transition-colors"
          >
            About
          </Link>
          <Link
            href={`/founders/${founder.slug}/blog`}
            className="text-xs sm:text-sm text-stone-400 hover:text-stone-700 transition-colors"
          >
            Blog
          </Link>
          <span className="text-xs sm:text-sm text-stone-800 font-medium">Bookshelf</span>
        </div>
      </nav>

      <div className="w-full px-4 md:max-w-3xl md:mx-auto md:px-8 py-16 flex-1 flex flex-col">
        <h1 className="text-2xl font-medium text-stone-800 mb-10">Bookshelf</h1>

        <section>
          {books.length === 0 && (
            <p className="text-stone-600 italic">No books added yet — check back soon.</p>
          )}

          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/founders/${founder.slug}/books/${book.slug}`}
              className="flex items-baseline justify-between py-4 border-b border-stone-100 hover:bg-stone-50 transition-colors rounded-lg px-2 -mx-2"
            >
              <span className="text-sm text-stone-800">{book.title}</span>
              <span className="text-xs text-stone-400 ml-4 flex-shrink-0">{book.author}</span>
            </Link>
          ))}
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-8 border-t border-stone-200 flex gap-5 items-center px-4 sm:px-8 py-6">
        <Link
          href="/"
          className="text-sm text-stone-600 hover:text-stone-700 transition-colors font-medium"
        >
          ← Home
        </Link>
        {founder.linkedin && (
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-600 hover:text-stone-700 transition-colors font-medium ml-auto"
          >
            LinkedIn
          </a>
        )}
        {founder.instagram && (
          <a
            href={founder.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-600 hover:text-stone-700 transition-colors"
          >
            Instagram
          </a>
        )}
        {founder.email && (
          <a
            href={`mailto:${founder.email}`}
            className="text-sm text-stone-600 hover:text-stone-700 transition-colors"
          >
            Email
          </a>
        )}
      </footer>
    </main>
  );
}
