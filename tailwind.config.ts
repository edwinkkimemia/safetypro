import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === SAFETYPRO AFRICA BRAND PALETTE ===
        // Primary: Navy #063B70 (logo navy sampled #01315D, kept #063B70 for contrast)
        // Secondary: Logo Green #03A435 sampled from public/images/logo/logoy.png
        // Accent: Safety Red #E53935
        // Neutral: Slate #263746
        navy: {
          DEFAULT: "#063B70",
          50: "#E6EFF7",
          100: "#C2D9EC",
          200: "#9EC3E0",
          300: "#6A9BC8",
          400: "#2F6BAA",
          500: "#0E5A8A",
          600: "#084A75",
          700: "#063B70",
          800: "#052E58",
          900: "#042240",
          950: "#02152A",
        },
        // SafetyPro logo green — sampled from public/images/logo/logoy.png #03A435 (RGB 3,164,53)
        // Replaces teal #08A88A so all CTAs match the shield green in the logo
        teal: {
          DEFAULT: "#03A435",
          50: "#E6F6EA",
          100: "#C1EAD0",
          200: "#86D8A3",
          300: "#4EC67A",
          400: "#1FB65A",
          500: "#03A435",
          600: "#02943D",
          700: "#027F33",
          800: "#016A2A",
          900: "#015522",
        },
        // Safety Red accent — alerts, sale badges, warnings
        accent: {
          DEFAULT: "#E53935",
          50: "#FDECEC",
          100: "#FCC9C7",
          200: "#F9A09D",
          300: "#F27470",
          400: "#EC5350",
          500: "#E53935",
          600: "#CC322F",
          700: "#A82927",
          800: "#87211F",
          900: "#651917",
        },
        slate: {
          DEFAULT: "#263746",
          50: "#E9EDEC",
          100: "#D1D7D9",
          200: "#B0BCC0",
          300: "#8A9AA0",
          400: "#5C6F7A",
          500: "#3A505D",
          600: "#2F424E",
          700: "#263746",
          800: "#1E2B38",
          900: "#16202A",
        },
        // Legacy alias — `safety` now maps to logo green so existing bg-safety-* CTAs match logo
        safety: {
          DEFAULT: "#03A435",
          50: "#E6F6EA",
          100: "#C1EAD0",
          200: "#86D8A3",
          300: "#4EC67A",
          400: "#1FB65A",
          500: "#03A435",
          600: "#02943D",
          700: "#027F33",
          800: "#016A2A",
          900: "#015522",
        },
        emerald: {
          DEFAULT: "#03A435",
        },
        primary: {
          DEFAULT: "#063B70",
          50: "#E6EFF7",
          100: "#C2D9EC",
          200: "#9EC3E0",
          300: "#6A9BC8",
          400: "#2F6BAA",
          500: "#063B70",
          600: "#052E58",
          700: "#042240",
        },
        surface: "#F8F9FA",
        line: "#E2E8F0",
        success: "#03A435",
        danger: "#E53935",
        warning: "#F59E0B",
        ink: "#263746",
        // Vibrant marketplace accents - activated for Jumia/Amazon energy
        marketplace: {
          orange: "#F68B1E",
          amber: "#F59E0B",
          coral: "#FF6B35",
          sunflower: "#FFC107",
        },
        amber: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,40,71,0.04), 0 4px 16px rgba(15,40,71,0.06)",
        cardHover:
          "0 2px 4px rgba(15,40,71,0.05), 0 12px 32px rgba(15,40,71,0.12)",
        soft: "0 8px 40px rgba(15,40,71,0.08)",
        marketplace: "0 4px 20px rgba(246,139,30,0.15), 0 2px 8px rgba(246,139,30,0.1)",
        deal: "0 8px 32px rgba(229,57,53,0.15), 0 4px 16px rgba(245,158,11,0.1)",
        amber: "0 4px 16px rgba(245,158,11,0.2)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "4xl": "2rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        flash: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        countdown: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        fadeUp: "fadeUp 0.6s ease-out both",
        shimmer: "shimmer 2s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounceSubtle: "bounceSubtle 2s ease-in-out infinite",
        flash: "flash 1.5s ease-in-out infinite",
        countdown: "countdown 1s ease-in-out infinite",
      },
      maxWidth: {
        shell: "88rem",
      },
    },
  },
  plugins: [],
};
export default config;
