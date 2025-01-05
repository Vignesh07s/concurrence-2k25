module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      colors: {
        customWhite: '#f6f7fd', // Example custom color
        customBlue: '#1e90ff', // Another custom color
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      backdropBlur: {
        // Add custom blur levels
        xs: '2px',   // Example: very slight blur
        sm: '4px',   // Slight blur
        md: '8px',   // Medium blur
        lg: '12px',  // Strong blur
        xl: '16px',  // Very strong blur
      },
    },
  },
  plugins: [],
};
