import { founders } from "@/data/founders";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }));
}

export default async function FounderBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const founder = founders.find((f) => f.slug === slug);
  if (!founder) notFound();

  const posts: { title: string; date: string; slug: string }[] = [];

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
          <span className="text-xs sm:text-sm text-stone-800 font-medium">Blog</span>
          <Link
            href={`/founders/${founder.slug}/bookshelf`}
            className="text-xs sm:text-sm text-stone-400 hover:text-stone-700 transition-colors"
          >
            Bookshelf
          </Link>
        </div>
      </nav>

      <div className="w-full px-4 md:max-w-3xl md:mx-auto md:px-8 py-16 flex-1 flex flex-col">
        <h1 className="text-2xl font-medium text-stone-800 mb-10">Blog</h1>

        <section>
          {posts.length === 0 && (
            <p className="text-stone-600 italic">No articles yet — check back soon.</p>
          )}

          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="flex justify-between items-baseline py-3 border-b border-stone-100 group hover:bg-stone-50 transition-colors rounded-lg px-2 -mx-2"
            >
              <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors">
                {post.title}
              </span>
              <span className="text-xs text-stone-400 ml-4 flex-shrink-0">{post.date}</span>
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
