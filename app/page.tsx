'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Layers, Rocket, ShieldCheck, Sparkle, Wand2 } from "lucide-react";

import { ThemeCard } from "@/components/theme-card";
import { ThemeFilters, type FilterState } from "@/components/theme-filters";
import { getCategories, getTags, themes } from "@/lib/themes";

const categories = getCategories();
const tags = getTags();

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    layout: "all",
    tag: null
  });

  const filteredThemes = useMemo(() => {
    return themes.filter((theme) => {
      if (filters.category !== "all" && theme.category !== filters.category) return false;
      if (filters.layout !== "all" && theme.layout !== filters.layout) return false;
      if (filters.tag && !theme.tags.includes(filters.tag)) return false;

      if (filters.search.trim().length > 0) {
        const needle = filters.search.toLowerCase();
        const haystack = [
          theme.name,
          theme.tagline,
          theme.description,
          theme.category,
          theme.tags.join(" ")
        ].join(" ");
        if (!haystack.toLowerCase().includes(needle)) return false;
      }
      return true;
    });
  }, [filters]);

  const heroThemes = themes.slice(0, 3);

  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden rounded-[40px] border border-slate-700/60 bg-slate-900/70 p-10 text-white shadow-2xl lg:p-14">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-sky-500/30 blur-3xl" />
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="lg:w-3/5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
              <Sparkle className="h-4 w-4" />
              Premium Next.js themes for builders
            </div>
            <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Launch faster with design systems engineered to convert.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200">
              Explore a curated marketplace of production-ready Next.js themes. Each design includes
              Tailwind-powered sections, polished typography, and marketing copy patterns tuned for
              growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#themes"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-xl transition hover:bg-slate-200"
              >
                Browse the catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#collections"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/50 hover:text-white"
              >
                View curated collections
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-1 gap-6 text-sm text-slate-200 sm:grid-cols-3">
              <div>
                <dt className="uppercase tracking-widest text-slate-400">Launch-ready</dt>
                <dd className="mt-1 font-display text-3xl text-white">8 themes</dd>
              </div>
              <div>
                <dt className="uppercase tracking-widest text-slate-400">Avg rating</dt>
                <dd className="mt-1 font-display text-3xl text-white">4.8★</dd>
              </div>
              <div>
                <dt className="uppercase tracking-widest text-slate-400">Installs</dt>
                <dd className="mt-1 font-display text-3xl text-white">8k+</dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-6 lg:w-2/5">
            {heroThemes.map((theme) => (
              <div
                key={theme.slug}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/70">
                  <span>{theme.category}</span>
                  <span>{theme.layout} mode</span>
                </div>
                <h3 className="mt-4 font-display text-2xl text-white">{theme.name}</h3>
                <p className="mt-2 text-sm text-slate-200">{theme.tagline}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1">
                    <Flame className="h-3.5 w-3.5 text-amber-300" />
                    {theme.installs.toLocaleString()} installs
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1">
                    ★ {theme.rating.toFixed(1)}
                  </span>
                </div>
                <Link
                  href={`/themes/${theme.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-slate-200"
                >
                  Preview theme
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="collections" className="space-y-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
            <Layers className="h-4 w-4" />
            Curated Collections
          </p>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
            Everything you need to launch, market, and iterate.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            Every Spectrum theme ships with modular sections, polished typography, and conversion
            best practices so you can focus on your product instead of layout decisions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-xl">
            <Wand2 className="h-10 w-10 text-indigo-300" />
            <h3 className="mt-5 font-display text-2xl text-white">Modular sections</h3>
            <p className="mt-3 text-sm text-slate-300">
              Compose landing pages with 70+ Tailwind sections covering hero, pricing, testimonials,
              onboarding, and more.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-xl">
            <Rocket className="h-10 w-10 text-emerald-300" />
            <h3 className="mt-5 font-display text-2xl text-white">Conversion insights</h3>
            <p className="mt-3 text-sm text-slate-300">
              Templates ship with conversion copy prompts and data-backed layouts learned from
              scaling real products.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-xl">
            <ShieldCheck className="h-10 w-10 text-sky-300" />
            <h3 className="mt-5 font-display text-2xl text-white">Production ready</h3>
            <p className="mt-3 text-sm text-slate-300">
              Built with Next.js App Router, TypeScript, Tailwind CSS, and accessible components
              ready for Vercel deployments.
            </p>
          </div>
        </div>
      </section>

      <section id="themes" className="grid gap-8 lg:grid-cols-[320px,1fr]">
        <ThemeFilters categories={categories} tags={tags} filters={filters} onFiltersChange={setFilters} />
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
            <div>
              {filteredThemes.length} {filteredThemes.length === 1 ? "theme" : "themes"}
              {filters.category !== "all" ? ` in ${filters.category}` : ""}.
            </div>
            <div className="flex gap-2 text-xs text-slate-400">
              <span>Filters:</span>
              <span>Search {filters.search.trim().length > 0 ? "active" : "off"}</span>
              <span>Layout {filters.layout}</span>
              <span>Tag {filters.tag ?? "any"}</span>
            </div>
          </div>
          <div className="grid gap-10">
            {filteredThemes.map((theme) => (
              <ThemeCard key={theme.slug} theme={theme} />
            ))}
            {filteredThemes.length === 0 && (
              <div className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-10 text-center text-slate-300">
                <p className="text-lg font-medium text-white">No themes match your filters yet.</p>
                <p className="mt-2 text-sm text-slate-400">
                  Try clearing filters or drop us a note and we’ll craft a bespoke design for you.
                </p>
                <Link
                  href="mailto:hello@spectrumthemes.dev"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700/60 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:text-white"
                >
                  Request a custom theme
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="faq" className="rounded-[40px] border border-slate-700/60 bg-slate-900/60 p-10 shadow-2xl sm:p-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
              FAQ
            </p>
            <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl">
              Answers to everything about your theme license.
            </h2>
            <p className="mt-4 text-sm text-slate-300">
              Each purchase includes a commercial license, lifetime updates, and one-click
              deployment workflows. Need something custom? We build bespoke themes too.
            </p>
            <Link
              href="mailto:hello@spectrumthemes.dev"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm font-medium text-white/80 transition hover:border-white/50 hover:text-white"
            >
              Ask something else
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-6">
              <h3 className="font-display text-xl text-white">How fast can I launch?</h3>
              <p className="mt-3 text-sm text-slate-300">
                Import the repository, connect to Vercel, and deploy in minutes. Each theme includes
                content placeholders, structured Tailwind components, and environment-ready configs.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-6">
              <h3 className="font-display text-xl text-white">Do themes support TypeScript?</h3>
              <p className="mt-3 text-sm text-slate-300">
                Yes. Every component ships with strict TypeScript types and ESLint-ready conventions.
                Remove or extend sections without breaking the design system.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-6">
              <h3 className="font-display text-xl text-white">What about future updates?</h3>
              <p className="mt-3 text-sm text-slate-300">
                Purchases include lifetime updates per theme. We drop new sections monthly, plus
                variant colorways tuned for emerging product categories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
