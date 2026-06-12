import Link from "next/link";
import { founders } from "@/data/founders";

export default function Home() {
  return (
    <main className="bg-stone-50">
      <section className="pt-16 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-medium text-stone-800">Welcome to HealthApp</h1>
        <p className="text-sm text-stone-500">Your health, simplified.</p>
        <Link
          href="/bmi"
          className="bg-stone-700 hover:bg-stone-800 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Try BMI Calculator
        </Link>
      </section>

      <section className="flex flex-col items-center justify-center gap-10 py-16">
        <h2 className="text-2xl font-medium text-stone-800">Meet the Founders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {founders.map((founder) => (
            <Link
              key={founder.slug}
              href={`/founders/${founder.slug}`}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-medium bg-stone-800 text-white mb-4">
                {founder.name
                  .split(" ")
                  .filter((n) => !["Dr.", "Ms.", "Mr."].includes(n))
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="text-center">
                <p className="text-stone-800 font-medium">{founder.name}</p>
                <p className="text-stone-500 text-sm">{founder.specialty}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}