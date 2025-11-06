'use client';

import { useMemo } from "react";
import clsx from "clsx";
import { Sparkles, Layout, Search } from "lucide-react";

type FilterState = {
  search: string;
  category: string;
  layout: "all" | "light" | "dark";
  tag: string | null;
};

type ThemeFiltersProps = {
  categories: string[];
  tags: string[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
};

export function ThemeFilters({ categories, tags, filters, onFiltersChange }: ThemeFiltersProps) {
  const tagGroups = useMemo(() => {
    const groups: Record<string, string[]> = {};
    tags.forEach((tag) => {
      const key = tag.split("-")[0] ?? "misc";
      if (!groups[key]) groups[key] = [];
      groups[key].push(tag);
    });
    return Object.entries(groups)
      .map(([key, values]) => [key, values.sort()] as const)
      .sort((a, b) => a[0].localeCompare(b[0]));
  }, [tags]);

  return (
    <aside className="frosted rounded-3xl p-6 text-slate-200 shadow-2xl">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4">
        <label className="flex items-center gap-3 text-sm text-slate-300">
          <Search className="h-4 w-4 text-slate-400" />
          <span>Search themes</span>
        </label>
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
          placeholder="Try “SaaS” or “dark”"
          className="mt-3 w-full rounded-xl border border-slate-700/60 bg-slate-900/80 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-xs uppercase tracking-wider text-slate-400">Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onFiltersChange({ ...filters, category: "all" })}
            className={clsx(
              "inline-flex items-center rounded-full border px-4 py-1.5 text-sm transition",
              filters.category === "all"
                ? "border-indigo-400/70 bg-indigo-500/20 text-white shadow-glow"
                : "border-slate-700/60 bg-slate-900/60 text-slate-300 hover:border-slate-500"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onFiltersChange({ ...filters, category })}
              className={clsx(
                "inline-flex items-center rounded-full border px-4 py-1.5 text-sm capitalize transition",
                filters.category === category
                  ? "border-indigo-400/70 bg-indigo-500/20 text-white shadow-glow"
                  : "border-slate-700/60 bg-slate-900/60 text-slate-300 hover:border-slate-500"
              )}
            >
              {category.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4">
        <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
          <Layout className="h-4 w-4" />
          Layout mode
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(["all", "light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onFiltersChange({ ...filters, layout: mode })}
              className={clsx(
                "rounded-xl border px-4 py-2 text-sm capitalize transition",
                filters.layout === mode
                  ? "border-emerald-400/80 bg-emerald-500/20 text-white shadow-glow"
                  : "border-slate-700/60 bg-slate-900/60 text-slate-300 hover:border-slate-500"
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
          <Sparkles className="h-4 w-4" />
          Collections
        </p>
        <div className="mt-3 space-y-4">
          {tagGroups.map(([group, groupTags]) => (
            <div key={group}>
              <p className="text-xs uppercase tracking-wider text-slate-500">{group}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {groupTags.map((tag) => {
                  const active = filters.tag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => onFiltersChange({ ...filters, tag: active ? null : tag })}
                      className={clsx(
                        "rounded-full border px-3 py-1 text-xs transition",
                        active
                          ? "border-purple-400/80 bg-purple-500/20 text-white shadow-glow"
                          : "border-slate-700/60 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                      )}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export type { FilterState };
