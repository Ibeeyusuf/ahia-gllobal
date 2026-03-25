import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-plus-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74",
          400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c",
          800: "#9a3412", 900: "#7c2d12",
        },
        neutral: {
          50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1",
          400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155",
          800: "#1e293b", 900: "#0f172a",
        },
      },
      borderRadius: { xl2: "0.875rem", xl3: "1.25rem" },
      boxShadow: {
        card: "0 4px 14px -3px rgba(15,23,42,.09)",
        hover: "0 12px 30px -5px rgba(15,23,42,.16)",
        modal: "0 24px 60px -8px rgba(15,23,42,.28)",
      },
    },
  },
  plugins: [],
};
export default config;
