/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        main: "#EEFF87",
        transmain: "rgba(238, 255, 135, 0.15)",
        cc: "#090D15",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        "circle": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "accordion-down": {
          from: { height: 0, opacity: 0 },
          to: { height: "var(--radix-accordion-content-height)", opacity: 1 },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "accordion-right": {
          from: { width: 0, opacity: 0 },
          to: { width: "var(--radix-accordion-content-width)" },
        },
        "accordion-left": {
          from: { width: "var(--radix-accordion-content-width)" },
          to: { width: 0, opacity: 0 },
        },
        "text-fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },'infinite-scroll': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },'manual-scroll-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-300px)' },
        },'manual-scroll-right': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(300px)' },
        },
        'touch': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '.5' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'slideIn': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(100%)', opacity: '1' },
        },
        'slideOut': {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '100%': { transform: 'translateX(100%)', opacity: '1' },
        },'slideInAndOut': {
          '0%': { transform: 'translateX(-50%)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '1' },
        }, 'fadeIn': {
          '0%': { opacity: 0, transform: "scale(1)" },
          '50%': { opacity: 1, transform: "scale(1.2)" },
          '100%': { opacity: 1, transform: "scale(1)" },
        },
         'fadeOut':{
          to: { opacity: 0, transform: "scale(.95)" }
        },'vibrate': {
          '0%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(2px, 2px)' },
          '50%': { transform: 'translate(-2px, -2px)' },
          '75%': { transform: 'translate(-2px, 2px)' },
          '100%': { transform: 'translate(2px, -2px)' },
        },'typewriter': {
          to: {
            left: "100%"
          }
        }
      },
      animation: {
        "circle": "circle 0.3s linear",
        'typewriter': "typewriter 5s steps(440) forwards",
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "accordion-right": "accordion-right 0.3s ease-out",
        "accordion-left": "accordion-left 0.3s ease-out",
        'pulse-scale': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'manual-scroll-left': 'manual-scroll-left 0.5s linear',
        'manual-scroll-right': 'manual-scroll-right 0.5s linear',
        'touch': 'ping 1s cubic-bezier(0, 0, 0.2, 1) 1',
        'slideIn': 'slideIn 3s ease-out',
        'slideOut': 'slideOut 0.5s ease-out',
        'slideInAndOut': 'slideInAndOut 8s ease-out',
        'fade-in': 'text-fade-in 0.5s ease-out',
        'fadeIn': "fadeIn 0.4s ease-out",
        'fadeOut': "fadeOut 0.45s ease-out forwards",
        'vibrate': 'vibrate 0.1s linear',
        spotlight: "spotlight 2s ease .75s 1 forwards",
        scroll:"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors
  ]
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}