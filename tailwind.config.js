/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Màu chính: Đỏ đô - phù hợp ngành xây dựng
        primary: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
          800: "#7f1d1d",
          900: "#450a0a",
        },
        // Màu phụ: Vàng đồng - sang trọng
        secondary: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        // Màu accent: Slate - hiện đại chuyên nghiệp
        accent: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // Màu electric: Cyan - hiện đại
        electric: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Montserrat", "Inter", "sans-serif"],
      },
      animation: {
        // Entrance animations
        "fade-up": "fadeUp 0.6s ease-out",
        "fade-up-slow": "fadeUp 0.8s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        
        // Continuous animations
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float 4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "glow": "glow 2s ease-in-out infinite",
        
        // Hover & interaction
        "scale-up": "scaleUp 0.2s ease-out",
        "bounce-soft": "bounceSoft 0.5s ease-out",
        "wiggle": "wiggle 0.3s ease-in-out",
        
        // Loading & progress
        "spin-slow": "spin 3s linear infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        // Entrance
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        
        // Continuous
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(220, 38, 38, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(220, 38, 38, 0.6)" },
        },
        
        // Interaction
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 40% 20%, hsla(28,100%,74%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.2) 0px, transparent 50%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        "glass-lg": "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
        "inner-glow": "inset 0 0 20px rgba(255, 255, 255, 0.1)",
        "neon-red": "0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)",
        "neon-cyan": "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
      },
    },
  },
  plugins: [],
};
