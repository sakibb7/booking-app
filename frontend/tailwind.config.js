/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
        "3xl": "1600px",
        "4xl": "1800px",
      },
      colors: {
        p1: "#008DDA",
        p2: "#41C9E2",
        p3: "#ACE2E1",
        p4: "#F7EEDD",
      },
      padding: {
        30: "120px",
        15: "60px",
      },
    },
  },
  plugins: [],
};
