import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondary: "#052F35",
        primary: "#0E464F",
        darker: "#02191D",
        lighter: "#24a0b5",
      },
      fontFamily: {
        roadRage: ["'Road Rage'", "cursive"], // Add the new font here
      },
    },
  },
  plugins: [],
} satisfies Config;
