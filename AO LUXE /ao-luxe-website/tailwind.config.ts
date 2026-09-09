import type { Config } from "tailwindcss";

/**
 * AO Luxe Events — brand design tokens.
 * To change a brand colour site-wide, edit it HERE and nowhere else.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#B8952A", // primary brand gold
          light: "#D4B65A", // hover / highlight
          dark: "#8E7220", // pressed state, deep gold bands
        },
        ink: {
          DEFAULT: "#111111", // page background (deep black)
          soft: "#191919", // raised cards / alternating sections
          line: "#262626", // hairline borders
        },
        cream: {
          DEFAULT: "#F5F0E8", // primary text on black
          muted: "#B3ADA3", // secondary / supporting text
        },
      },
      fontFamily: {
        // Wired up in app/layout.tsx via next/font
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Brand rule: nothing rounder than 4px
        DEFAULT: "2px",
        sm: "2px",
        md: "4px",
        lg: "4px",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        /* ── Hero reveal ────────────────────────────────────────
         * The pieces of the hero cross-fade in and settle together.
         * Each one overlaps the next, so nothing pops — it resolves.
         */

        /* The logo eases out of a soft blur and settles to full size. */
        "logo-settle": {
          "0%": {
            opacity: "0",
            transform: "scale(1.07)",
            filter: "blur(14px)",
          },
          "55%": { opacity: "1" },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
            filter: "blur(0)",
          },
        },

        /* The gold glow blooms behind the logo, then holds. */
        "glow-bloom": {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },

        /* Hairline rules draw outwards from the centre. */
        "rule-draw": {
          "0%": { opacity: "0", transform: "scaleX(0)" },
          "100%": { opacity: "1", transform: "scaleX(1)" },
        },

        /* Everything below the logo rises gently into place. */
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        // Long, unhurried easing — luxury shouldn't feel snappy.
        "logo-settle": "logo-settle 1.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "glow-bloom": "glow-bloom 2.2s ease-out both",
        "rule-draw": "rule-draw 1s cubic-bezier(0.22, 1, 0.36, 1) both",
        "rise-in": "rise-in 1s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
