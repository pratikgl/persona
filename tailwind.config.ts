// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F6",
        surface: "#FFFFFF",
        border: "#E8E4DF",
        foreground: "#1C1917",
        "text-secondary": "#78716C",
        accent: {
          DEFAULT: "#C9835A",
          light: "#F5EDE6",
        },
        destructive: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        serif: ["var(--font-dm-serif)"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        xl: "12px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
