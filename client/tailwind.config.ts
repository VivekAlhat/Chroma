import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#191919",
      },
      fontFamily: {
        "young-serif": ["Young Serif", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
export default config;
