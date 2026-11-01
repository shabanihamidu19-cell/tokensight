"use client";

import Link from "next/link";
import { ArrowRight, Upload, BarChart3, Shield, Zap, Check } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              T
            </div>
            TokenSight
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/app" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <Link
              href="/app"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Try free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">
          <Zap className="h-3 w-3 text-primary" />
          No API keys required · Works with any CSV export
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Instant clarity on your{" "}
          <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
            AI spend
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Upload your OpenAI, Anthropic, or provider usage CSV. See exactly which models, features, and days are burning tokens. Set budgets. Spot waste. Ship with confidence.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
          >
            Analyze my spend
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-base font-medium hover:bg-muted"
          >
            How it works
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Free forever for single projects · No credit card
        </p>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Built for builders who care about margins</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Enterprise cost tools are overkill. Spreadsheets are painful. TokenSight is the missing middle.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Drop your CSV</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Export usage from OpenAI, Anthropic, or any provider that gives token counts. We parse it in your browser. Nothing leaves unless you save.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Instant insights</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Cost by model, by day, by estimated feature. See the expensive outliers. Forecast the rest of the month.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Budgets & alerts</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Set a soft or hard monthly budget. Get visual warnings before the bill surprises you. Export clean reports for finance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Three steps. Ten seconds.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Export", desc: "From your provider dashboard download the usage CSV for the period you care about." },
              { step: "2", title: "Upload", desc: "Drag and drop into TokenSight. We detect columns automatically." },
              { step: "3", title: "Understand", desc: "Charts, totals, waste flags, and a budget progress bar appear instantly." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">Simple pricing</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Start free. Upgrade when you need history, multiple projects, or team seats.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="mt-2 text-3xl font-bold">$0</p>
              <ul className="mt-6 space-y-3 text-sm">
                {["1 project", "CSV analysis in browser", "Basic charts", "Budget progress", "Export PNG"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className="mt-8 block w-full rounded-full border border-border py-3 text-center font-medium hover:bg-muted"
              >
                Start free
              </Link>
            </div>
            <div className="rounded-2xl border-2 border-primary bg-card p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                Most popular
              </div>
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="mt-2 text-3xl font-bold">
                $19<span className="text-base font-normal text-muted-foreground">/mo</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Unlimited projects",
                  "Saved history",
                  "Team seats (3)",
                  "Email alerts",
                  "CSV + PDF export",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/app?plan=pro"
                className="mt-8 block w-full rounded-full bg-primary py-3 text-center font-medium text-primary-foreground hover:opacity-90"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs text-primary-foreground">
              T
            </div>
            TokenSight
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/app">Dashboard</Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 TokenSight. Built for builders.</p>
        </div>
      </footer>
    </div>
  );
}
