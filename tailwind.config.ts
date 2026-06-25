import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ライトダークファンタジー / 占い・神託 palette
        ink: "#0b0d12",
        parchment: "#e9e7e0",
        oracle: "#d8b45a",
        rune: "#6f7bb6",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
