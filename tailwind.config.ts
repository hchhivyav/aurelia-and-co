import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { ink: "#0E0D0C", ivory: "#F7F3EC", champagne: "#B89B5E", muted: "#77716A" },
    fontFamily: { serif: ["var(--font-cormorant)", "Georgia", "serif"], sans: ["var(--font-inter)", "Arial", "sans-serif"] },
    letterSpacing: { luxury: ".15em" },
    transitionTimingFunction: { silk: "cubic-bezier(0.22, 1, 0.36, 1)" }
  }},
  plugins: []
};
export default config;
