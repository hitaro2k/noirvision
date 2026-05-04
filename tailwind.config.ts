import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          bg: "#0c0c0e",
          text: "#ffffff",
          muted: "#555558",
          line: "#1e1e22",
          pill: "#222226",
          faint: "#444448",
          accent: "#7B2FFF",
          hover: "#6322e0"
        }
      },
      keyframes: {
        bounceDot: {
          "0%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-8px)" }
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        visionColor: {
          "0%, 100%": { color: "#7B2FFF" },
          "25%": { color: "#A855F7" },
          "50%": { color: "#FF2FBF" },
          "75%": { color: "#2FFFFF" }
        }
      },
      animation: {
        bounceDot: "bounceDot 0.8s ease-in-out infinite",
        fadeIn: "fadeIn 0.45s ease forwards",
        visionColor: "visionColor 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
