import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1.25rem" },
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        "surface-3": "rgb(var(--surface-3) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted) / <alpha-value>)",
        "ink-subtle": "rgb(var(--ink-subtle) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        "rule-strong": "rgb(var(--rule-strong) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        "accent-fg": "rgb(var(--accent-fg) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        live: "rgb(var(--live) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Editorial scale — tighter, more dramatic
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.8125rem", { lineHeight: "1.55" }],
        base: ["0.9375rem", { lineHeight: "1.65" }],
        lg: ["1.0625rem", { lineHeight: "1.6" }],
        xl: ["1.1875rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "3xl": ["2rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "4xl": ["2.75rem", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "5xl": ["3.75rem", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "6xl": ["5rem", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        "7xl": ["6.5rem", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
      },
      letterSpacing: { tightest: "-0.045em" },
      maxWidth: {
        "8xl": "92rem",
        prose: "68ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "live-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.85)" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "char-rise": {
          "0%": { opacity: "0", transform: "translateY(0.6em) rotate(2deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "marquee-slow": "marquee 110s linear infinite",
        "live-pulse": "live-pulse 1.6s ease-in-out infinite",
        "rise-in": "rise-in 0.7s var(--ease-editorial, cubic-bezier(0.22,1,0.36,1)) both",
        "char-rise": "char-rise 0.9s var(--ease-editorial, cubic-bezier(0.22,1,0.36,1)) both",
        shimmer: "shimmer 2.5s linear infinite",
      },
      boxShadow: {
        editorial: "0 1px 0 0 rgb(var(--rule)), 0 0 0 1px rgb(var(--rule))",
        elevate: "0 8px 24px -8px rgb(0 0 0 / 0.18), 0 2px 6px -2px rgb(0 0 0 / 0.10)",
        glow: "0 0 0 1px rgb(var(--accent) / 0.4), 0 0 32px -4px rgb(var(--accent) / 0.45)",
      },
      backgroundImage: {
        "noise": "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"><filter id=\"a\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"2\" stitchTiles=\"stitch\"/><feColorMatrix values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23a)\"/></svg>')",
      },
    },
  },
  plugins: [],
};

export default config;
