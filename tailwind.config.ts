import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "neue-metana": "var(--font-neue-metana",
        "inter": "var(--font-inter)",
      },
      colors: {
        bg: "#F6F5E9",
        black: "#181613",
        orange: "#F58E12",
        yellow: "#EAD300",
        pink: "#FC64C5",
        blue: "#00BCD8",
      },
    },
  },
  plugins: [],
};
export default config;
