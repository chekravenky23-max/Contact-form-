import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-8 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[100px] z-0 pointer-events-none" />

      <main className="z-10 flex flex-col items-center text-center max-w-4xl w-full">
        <div className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-8 inline-block shadow-sm">
          Welcome to
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--foreground)] mb-6 drop-shadow-sm">
          DHYANA DHARMA ASHRAM
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-12 max-w-2xl">
          Teachers Training Course by <span className="text-blue-600 dark:text-blue-400 font-semibold">Ramu Master</span>
        </p>

        <Link
          href="/about"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-blue-600 rounded-full shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            About Course
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-100 group-active:bg-white/30"></div>
        </Link>
      </main>

      <footer className="absolute bottom-8 text-slate-500 text-sm z-10 text-center">
        © {new Date().getFullYear()} Dhyana Dharma Ashram. All rights reserved.
      </footer>
    </div>
  );
}
