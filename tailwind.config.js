/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // GREENPACK Brand Colors
        gp: {
          50:  "#f0f4e8",
          100: "#d8e4bc",
          200: "#bacf8e",
          300: "#9aba60",
          400: "#7faa3e",
          500: "#546A2F",
          600: "#465927",
          700: "#38471F",
          800: "#2A3517",
          900: "#1C2310",
          950: "#0D1208",
        },
        neon: {
          green: "#39FF14",
          lime:  "#B5FF5A",
          amber: "#FFB800",
          cyan:  "#00FFD1",
          red:   "#FF3860",
        },
        glass: {
          DEFAULT: "rgba(84,106,47,0.12)",
          light:   "rgba(84,106,47,0.22)",
          dark:    "rgba(28,35,16,0.85)",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card:        { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary:     { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted:       { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent:      { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border:  "hsl(var(--border))",
        input:   "hsl(var(--input))",
        ring:    "hsl(var(--ring))",
      },
      backgroundImage: {
        "gp-gradient":        "linear-gradient(135deg, #546A2F 0%, #2A3517 50%, #1C2310 100%)",
        "gp-gradient-neon":   "linear-gradient(135deg, #39FF14 0%, #546A2F 100%)",
        "gp-dark":            "linear-gradient(180deg, #0D1208 0%, #1C2310 100%)",
        "gp-glass":           "linear-gradient(135deg, rgba(84,106,47,0.18) 0%, rgba(28,35,16,0.35) 100%)",
        "hero-mesh":          "radial-gradient(ellipse at 20% 50%, rgba(57,255,20,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(84,106,47,0.15) 0%, transparent 50%)",
      },
      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        display: ["'Space Grotesk'", "sans-serif"],
      },
      animation: {
        "glow-pulse":     "glow-pulse 2s ease-in-out infinite",
        "float":          "float 6s ease-in-out infinite",
        "scan-line":      "scan-line 3s linear infinite",
        "counter-up":     "counter-up 0.8s ease-out forwards",
        "shimmer":        "shimmer 2s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "slide-up":       "slide-up 0.5s ease-out",
        "fade-in":        "fade-in 0.4s ease-out",
        "neon-flicker":   "neon-flicker 3s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(57,255,20,0.2), 0 0 40px rgba(84,106,47,0.1)" },
          "50%":       { boxShadow: "0 0 40px rgba(57,255,20,0.4), 0 0 80px rgba(84,106,47,0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-20px)" },
        },
        "scan-line": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "neon-flicker": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { textShadow: "0 0 7px #39FF14, 0 0 21px #39FF14" },
          "20%, 24%, 55%":                           { textShadow: "none" },
        },
      },
      boxShadow: {
        "glow-green":  "0 0 20px rgba(57,255,20,0.3), 0 0 60px rgba(57,255,20,0.1)",
        "glow-olive":  "0 0 20px rgba(84,106,47,0.4), 0 0 60px rgba(84,106,47,0.15)",
        "glow-amber":  "0 0 20px rgba(255,184,0,0.3), 0 0 60px rgba(255,184,0,0.1)",
        "glass":       "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "card-dark":   "0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(84,106,47,0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
