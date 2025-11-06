import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Theme } from "@/lib/themes";
import { ThemePreview } from "./theme-preview";

type ThemeCardProps = {
  theme: Theme;
};

export function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/60 p-6 backdrop-blur-xl transition hover:border-slate-500/60 hover:shadow-2xl hover:shadow-indigo-500/20">
      <div className="flex items-center gap-3 text-xs text-slate-300">
        {theme.popular ? (
          <span className="inline-flex items-center rounded-full border border-indigo-500/60 bg-indigo-500/10 px-3 py-1 font-medium text-indigo-300">
            Popular
          </span>
        ) : theme.new ? (
          <span className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-300">
            New Release
          </span>
        ) : null}
        <span className="rounded-full border border-slate-700/70 px-3 py-1 font-medium capitalize text-slate-300/90">
          {theme.category}
        </span>
        <span className="ml-auto text-slate-400">★ {theme.rating.toFixed(1)}</span>
      </div>
      <h2 className="mt-5 font-display text-2xl text-white sm:text-3xl">{theme.name}</h2>
      <p className="mt-3 text-sm text-slate-300">{theme.tagline}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{theme.description}</p>
      <div className="mt-5 grid gap-2 text-xs text-slate-300">
        <div className="flex items-center justify-between">
          <span>Installs</span>
          <span className="font-medium text-white">{theme.installs.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Layout</span>
          <span className="font-medium capitalize text-white">{theme.layout}</span>
        </div>
      </div>
      <div className="mt-6 rounded-[28px]">
        <ThemePreview theme={theme} />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
        {theme.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-slate-700/70 bg-slate-800/70 px-3 py-1 text-slate-300"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-700/80 bg-slate-900/80 px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">License</p>
          <p className="font-display text-2xl text-white">${theme.price}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={theme.demoUrl}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Live demo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/themes/${theme.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-lg transition hover:bg-slate-200"
          >
            View theme
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
