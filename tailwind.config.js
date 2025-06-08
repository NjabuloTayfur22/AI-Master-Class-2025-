/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // If you need a border-border class, define it here
      borderColor: {
        border: "hsl(var(--border))",
      },
    },
  },
  plugins: [],
}