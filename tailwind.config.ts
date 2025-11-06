import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Inter", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(59,130,246,0.35)"
      },
      colors: {
        midnight: "#0f172a",
        cream: "#f5f1eb",
        iris: "#6366f1"
      }
    }
  },
  plugins: []
};

export default config;
