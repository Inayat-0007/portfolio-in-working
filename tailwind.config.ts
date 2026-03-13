import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0a",
          secondary: "#111111",
          tertiary: "#1a1a1a",
        },
        accent: {
          primary: "#00f0ff",
          secondary: "#8b5cf6",
          warm: "#f59e0b",
          success: "#22c55e",
          error: "#ef4444",
        },
        text: {
          primary: "#f5f5f5",
          secondary: "#aaaaaa",
          muted: "#888888",
          dim: "#555555",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "28px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px rgba(34, 197, 94, 0.6)" },
          "50%": { opacity: "0.6", boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "scroll-left": "scroll-left 30s linear infinite",
        "scroll-right": "scroll-right 30s linear infinite",
        grain: "grain 8s steps(10) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
