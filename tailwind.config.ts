import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#03070d",
          900: "#071018",
          850: "#0d1621",
          800: "#14202b",
        },
        steel: {
          100: "#f4f7fb",
          200: "#dbe7f1",
          300: "#b5c7d5",
          400: "#86a0b2",
          500: "#597486",
        },
        signal: {
          teal: "#39d8d0",
          blue: "#69a9dd",
          green: "#87d48d",
          star: "#f3c775",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        line: "0 0 0 1px rgba(220, 229, 234, 0.12)",
        glow: "0 28px 90px rgba(57, 216, 208, 0.16)",
      },
      backgroundImage: {
        "technical-grid":
          "linear-gradient(rgba(220, 229, 234, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 229, 234, 0.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
