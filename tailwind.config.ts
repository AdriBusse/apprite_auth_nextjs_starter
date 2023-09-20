import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    screens: {
      xs: "640px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "4rem",
        md: "4rem",
      },
    },

    extend: {
      backgroundImage: {
        background: 'url("/backgrounds/background.svg")',
        "background-auth": 'url("/backgrounds/auth-background.svg")',
      },
      colors: {
        blue1: "#66BDFF",
        blue2: "#50A5E6",
        blue3: "#3A8EEE",
        dark: "#2E2C29",
        light: "#EEF5F8",
      },
    },
  },
  darkMode: "class",

  plugins: [nextui()],
};
export default config;
