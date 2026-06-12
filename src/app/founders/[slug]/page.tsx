import { founders } from "@/data/founders";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return founders.map((f) => ({ slug: f.slug }));
}

export default async function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const founder = founders.find((f) => f.slug === slug);
  if (!founder) notFound();

  return (
    <main className="min-h-screen flex flex-col bg-white text-stone-900">

      {/* Nav */}
      <nav className="flex justify-between items-center px-4 sm:px-8 py-6 gap-4">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Navbar />
          <Link href={`/founders/${founder.slug}`} className="font-medium text-stone-800 truncate">
            {founder.name}
          </Link>
        </div>
        <div className="flex gap-3 sm:gap-6 flex-shrink-0">
          <span className="text-xs sm:text-sm text-stone-800 font-medium">About</span>
          <Link
            href={`/founders/${founder.slug}/blog`}
            className="text-xs sm:text-sm text-stone-400 hover:text-stone-700 transition-colors"
          >
            Blog
          </Link>
          <Link
            href={`/founders/${founder.slug}/bookshelf`}
            className="text-xs sm:text-sm text-stone-400 hover:text-stone-700 transition-colors"
          >
            Bookshelf
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-16 flex-1 flex flex-col w-full">
        <h1 className="text-2xl font-medium text-stone-800 mb-10">About</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <section className="flex flex-col gap-5">
            <p className="text-stone-600 leading-relaxed">{founder.bio}</p>
            <p className="text-stone-600 leading-relaxed">
              Outside of work, {founder.name.split(" ").slice(-1)[0]} spends time learning, writing, and exploring new ideas in {founder.specialty.toLowerCase()}.
            </p>
            <div className="flex flex-wrap gap-1">
              {founder.credentials.map((c) => (
                <span
                  key={c}
                  className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                  style={{ background: founder.bg, color: founder.color }}
                >
                  {c}
                </span>
              ))}
            </div>
          </section>

          {/* Photo */}
          {founder.photo ? (
            <div className="w-full aspect-square rounded-xl overflow-hidden">
              <img
                src={founder.photo}
                alt={founder.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ) : (
            <div className="w-full aspect-square bg-stone-100 rounded-xl flex items-center justify-center">
              <p className="text-xs text-stone-400">Photo coming soon</p>
            </div>
          )}
        </div>

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