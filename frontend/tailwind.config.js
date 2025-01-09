module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3d': '0px 8px 30px rgba(0, 0, 0, 0.2)', // Custom shadow for carousel images
      },
      animation: {
        marquee: "marquee 10s linear infinite", // Optional marquee animation
      },
      colors: {
        customWhite: '#f6f7fd', // Example custom color for styling
        customBlue: '#1e90ff', // Example custom color for hover effects
      },
    },
  },
  plugins: [],
};
