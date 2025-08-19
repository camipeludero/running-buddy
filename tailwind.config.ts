import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "neue-metana": "var(--font-neue-metana",
        "inter": "var(--font-inter)",
      },
      colors: {
        // Light mode colors
        bg: "#F6F5E9",
        black: "#181613",
        orange: "#F58E12",
        yellow: "#EAD300",
        pink: "#FC64C5",
        blue: "#00BCD8",
        
        // Modern dark mode palette
        dark: {
          900: "#0A0A0A",   // Deep black background
          800: "#111111",   // Card backgrounds
          700: "#1A1A1A",   // Elevated surfaces
          600: "#2A2A2A",   // Borders and dividers
          500: "#404040",   // Disabled states
          400: "#6B7280",   // Secondary text
          300: "#9CA3AF",   // Primary text muted
          200: "#D1D5DB",   // Primary text
          100: "#F3F4F6",   // White text
        },
        accent: {
          primary: "#6366F1",   // Modern indigo
          secondary: "#8B5CF6", // Purple
          success: "#10B981",   // Green
          warning: "#F59E0B",   // Amber
          error: "#EF4444",     // Red
          orange: "#FB923C",    // Modern orange
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
