import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-medium text-stone-800">Welcome to HealthApp</h1>
      <p className="text-sm text-stone-500">Your health, simplified.</p>
      <Link
        href="/bmi"
        className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
      >
        Try BMI Calculator →
      </Link>
    </main>
  );
}