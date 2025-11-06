import type { Theme } from "@/lib/themes";

type ThemePreviewProps = {
  theme: Theme;
  className?: string;
};

export function ThemePreview({ theme, className }: ThemePreviewProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 shadow-2xl transition duration-500 hover:-translate-y-1 hover:shadow-glow ${className ?? ""}`}
      style={{
        backgroundImage: `${theme.preview.gradient}, ${theme.preview.accent}`,
        backgroundBlendMode: "screen"
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: theme.preview.overlay
        }}
        aria-hidden="true"
      />
      <div className="relative space-y-6 p-6">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80">
          <span>{theme.category}</span>
          <span>{theme.layout === "dark" ? "Dark UI" : "Light UI"}</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 shadow-inner backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2 text-xs text-white/70">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="ml-auto font-medium tracking-wide text-white/60">{theme.name}</span>
          </div>
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-6 px-6 py-6">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg">
                <div className="h-3 w-32 rounded-full bg-white/40" />
                <div className="mt-3 h-2 w-48 rounded-full bg-white/25" />
                <div className="mt-2 h-2 w-40 rounded-full bg-white/25" />
                <div className="mt-4 flex gap-3">
                  <div
                    className="h-10 flex-1 rounded-xl"
                    style={{ background: theme.colors.accent, opacity: 0.85 }}
                  />
                  <div className="h-10 flex-1 rounded-xl bg-white/25" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {theme.sections.slice(0, 3).map((section) => (
                  <div key={section} className="rounded-xl border border-white/10 bg-white/10 p-3">
                    <div className="h-2 w-16 rounded-full bg-white/30" />
                    <div className="mt-2 h-2 w-12 rounded-full bg-white/20" />
                    <div className="mt-4 h-10 rounded-lg bg-white/5" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="mb-3 h-2 w-28 rounded-full bg-white/35" />
                <div className="space-y-2">
                  {theme.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-white/60" />
                      <span className="h-2 flex-1 rounded-full bg-white/20" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-white/50">
                  <span>Metrics</span>
                  <span>Live</span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full rounded-full bg-white/20" />
                  <div
                    className="h-2 rounded-full"
                    style={{ width: "75%", background: theme.colors.accent, opacity: 0.8 }}
                  />
                  <div className="flex justify-between text-[10px] uppercase text-white/40">
                    <span>Signups</span>
                    <span>Conversion</span>
                    <span>Retention</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
