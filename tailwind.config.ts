import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        enwBlack: "#0A0A0A",
        enwGold: "#D4AF37",
        enwDarkGray: "#1A1A1A",
      },
    },
  },
  plugins: [],
};
export default config;