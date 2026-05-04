/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        noirBlack: "#030303",
        noirPanel: "#111114",
        noirSmoke: "#8A8A8F",
        noirPaper: "#F4F1EA",
        noirMuted: "#A7A3A0",
        goldAccent: "#D4AF37",
        champagneGold: "#C9A646",
        antiqueGold: "#B08D2C",
        softGold: "#E6C96A",
        goldCore: "#D4AF37",
        electricGold: "#E6C96A",
        deepGold: "#7A5A12",
        ink: "#F5F3FF",
        muted: "#A1A1AA",
        noir: {
          bg: "#0c0c0e",
          text: "#ffffff",
          muted: "#555558",
          line: "#1e1e22",
          pill: "#222226",
          faint: "#444448",
          accent: "#7B2FFF",
          hover: "#6322e0",
          950: "#030008",
          900: "#07000F",
          850: "#0B0614",
          800: "#10081F"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(212, 175, 55, 0.28)",
        hardGlow: "0 28px 100px rgba(176, 141, 44, 0.34)"
      },
      backgroundImage: {
        "noir-radial":
          "radial-gradient(circle at center, rgba(212,175,55,0.26), transparent 58%)"
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
