/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
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
        noir: {
          950: "#030008",
          900: "#07000F",
          850: "#0B0614",
          800: "#10081F"
        },
        goldCore: "#D4AF37",
        electricGold: "#E6C96A",
        deepGold: "#7A5A12",
        ink: "#F5F3FF",
        muted: "#A1A1AA"
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
        "noir-radial": "radial-gradient(circle at center, rgba(212,175,55,0.26), transparent 58%)"
      }
    }
  },
  plugins: []
};
