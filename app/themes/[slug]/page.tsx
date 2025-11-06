import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BadgeCheck, FolderGit2, Palette, Sparkles } from "lucide-react";

import { ThemePreview } from "@/components/theme-preview";
import { getThemeBySlug, themes } from "@/lib/themes";

type ThemePageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return themes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const theme = getThemeBySlug(params.slug);
  if (!theme) {
    return {
      title: "Theme not found – Spectrum Themes"
    };
  }

  return {
    title: `${theme.name} – Premium Next.js theme`,
    description: theme.description
  };
}

export default function ThemeDetailPage({ params }: ThemePageProps) {
  const theme = getThemeBySlug(params.slug);
  if (!theme) notFound();

  const relatedThemes = themes
    .filter((candidate) => candidate.slug !== theme.slug && candidate.category === theme.category)
    .slice(0, 3);

  return (
    <div className="space-y-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to store
      </Link>

      <section className="rounded-[40px] border border-slate-700/60 bg-slate-900/60 p-10 shadow-2xl sm:p-14">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="lg:w-2/5">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/60 bg-indigo-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-indigo-100">
              {theme.category}
            </span>
            <h1 className="mt-6 font-display text-4xl text-white sm:text-5xl">{theme.name}</h1>
            <p className="mt-4 text-lg text-slate-200">{theme.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{theme.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-200">
              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400">Price</p>
                <p className="mt-1 font-display text-3xl text-white">${theme.price}</p>
              </div>
              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400">Installs</p>
                <p className="mt-1 font-display text-3xl text-white">{theme.installs.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link
                href={theme.demoUrl}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-900 shadow-xl transition hover:bg-slate-200"
              >
                Launch live demo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              {theme.figmaUrl && (
                <Link
                  href={theme.figmaUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-medium text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Preview Figma
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          <div className="lg:w-3/5">
            <ThemePreview theme={theme} />
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-xl">
          <BadgeCheck className="h-9 w-9 text-emerald-300" />
          <h2 className="mt-4 font-display text-2xl text-white">Included in the kit</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {theme.sections.map((section) => (
              <li key={section} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span>{section}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-xl">
          <Palette className="h-9 w-9 text-indigo-300" />
          <h2 className="mt-4 font-display text-2xl text-white">Color system</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(theme.colors).map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-400">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-3 h-10 w-full rounded-xl" style={{ background: value }} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 shadow-xl">
          <FolderGit2 className="h-9 w-9 text-sky-300" />
          <h2 className="mt-4 font-display text-2xl text-white">Tech stack</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Next.js App Router with TypeScript</li>
            <li>Tailwind CSS with utility-first layout</li>
            <li>Framer Motion-ready component patterns</li>
            <li>MDX-ready copy sections</li>
          </ul>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-700/60 bg-slate-900/60 p-10 shadow-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="lg:w-3/5">
            <h2 className="font-display text-3xl text-white">Highlights & differentiators</h2>
            <p className="mt-3 text-sm text-slate-300">
              Theme sections map directly to conversion journeys. Edit any copy block, drop in
              product screenshots, and deploy. All components follow accessible contrast ratios and
              responsive constraints out of the box.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
              {theme.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4"
                >
                  <Sparkles className="mt-1 h-4 w-4 text-purple-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-indigo-400/40 bg-indigo-500/10 p-8 text-white shadow-glow lg:w-2/5">
            <h3 className="font-display text-2xl">Best suited for</h3>
            <ul className="mt-4 space-y-2 text-sm text-indigo-100">
              {theme.bestFor.map((target) => (
                <li key={target} className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-indigo-300" />
                  {target}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-6 text-sm text-white/80">
              <p>
                Need modifications like CMS hooks, animations, or API integrations? Our studio can
                tailor this theme for your stack in under a week.
              </p>
              <Link
                href="mailto:studio@spectrumthemes.dev"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:border-white/50"
              >
                Request a custom build
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {relatedThemes.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl text-white">More in {theme.category}</h2>
            <Link
              href="/#themes"
              className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
            >
              View all categories
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedThemes.map((candidate) => (
              <Link
                key={candidate.slug}
                href={`/themes/${candidate.slug}`}
                className="group rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 transition hover:border-indigo-400/60 hover:shadow-2xl"
              >
                <p className="text-xs uppercase tracking-widest text-slate-400">{candidate.category}</p>
                <h3 className="mt-3 font-display text-2xl text-white">{candidate.name}</h3>
                <p className="mt-2 text-sm text-slate-300">{candidate.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300">
                  <span>★ {candidate.rating.toFixed(1)}</span>
                  <span>•</span>
                  <span>{candidate.installs.toLocaleString()} installs</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
