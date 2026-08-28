import Link from "next/link";

export function LandingHero() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
        Remember the little things.
      </h1>
      <p className="mt-4 max-w-md text-lg text-text-secondary">
        The things people casually tell you often matter more than they realize.
      </p>
      <div className="mt-10 flex gap-3">
        <Link
          href="/signup"
          className="rounded-xl bg-accent px-6 py-3 font-medium text-white transition-transform active:scale-[0.97]"
        >
          Sign up
        </Link>
        <Link
          href="/login"
          className="rounded-xl border border-border bg-surface px-6 py-3 font-medium transition-transform active:scale-[0.97]"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}
