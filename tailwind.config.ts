import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fff4", // Lightest Green
          100: "#dcfce7", // Very Light Green
          200: "#bbf7d0", // Light Green
          300: "#86efac", // Medium Light Green
          400: "#4ade80", // Medium Green
          500: "#22c55e", // Primary Green
          600: "#16a34a", // Darker Green
          700: "#15803d", // Deep Green
          800: "#166534", // Dark Green
          900: "#14532d", // Very Dark Green
          950: "#0f381d", // Darkest Green
          DEFAULT: "#22c55e", // Default Green (Primary)
        },
        secondary: {
          "50": "#f0f4f8",
          "100": "#d9e2ec",
          "200": "#bcccdc",
          "300": "#9fb3c8",
          "400": "#829ab1",
          "500": "#627d98",
          "600": "#486581",
          "700": "#334e68",
          "800": "#243b53",
          "900": "#102a43",
          DEFAULT: "#627d98",
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Menlo", "Monaco", "Courier New", "monospace"],
        gilroy: ["Gilroy-Bold", "Gilroy-Medium", "Gilroy-Light"],
      },
      spacing: {
        "0": "0px",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "32": "8rem",
        "40": "10rem",
        "48": "12rem",
        "56": "14rem",
        "64": "16rem",
      },
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      container: {
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
