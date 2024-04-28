import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "800px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          // old // primary: "#00965f",
          primary: "#57ae81",
          error: "#a5304a",
          "base-content": "#e8f4ec",
          // lightest
          "base-100": "#2a303c",
          // medium
          "base-200": "#3e444f",
          // darkest
          "base-300": "#545963",
          // "base-100": "#e8f4ec",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
