"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, login } from "@/actions/auth";

type AuthFormProps = {
  mode: "login" | "signup";
};

type ActionState = { error?: string } | undefined;

type AuthAction = (_state: ActionState, formData: FormData) => Promise<ActionState>;

export function AuthForm({ mode }: AuthFormProps) {
  const baseAction = mode === "signup" ? signup : login;
  const action: AuthAction = (_state, formData) => baseAction(formData);
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    action,
    undefined
  );

  const isSignup = mode === "signup";
  const heading = isSignup ? "Create your space" : "Welcome back";
  const subtext = isSignup
    ? "A private place to remember what matters."
    : "Your people are waiting.";

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl tracking-tight">{heading}</h1>
        <p className="mt-2 text-text-secondary">{subtext}</p>

        <form action={formAction} className="mt-8 flex flex-col gap-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
          />

          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-accent py-3 font-medium text-white transition-transform active:scale-[0.97] disabled:opacity-50"
          >
            {isPending
              ? isSignup
                ? "Creating your space…"
                : "Signing in…"
              : isSignup
                ? "Get started"
                : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-foreground">
                Log in
              </Link>
            </>
          ) : (
            <>
              New here?{" "}
              <Link href="/signup" className="font-medium text-foreground">
                Create your space
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
