/** @type {import(tailwindcss).Config} */
module.exports = {
  content: ["**/*{html, js}"],
  theme: {
    extend: {
      screens: {
        xl: { min: "1221px" },
        lg: { min: "768px", max: "1220px" },
        md: { min: "426px", max: "767px" },
        sm: { min: "300px", max: "425px" },
      },
      colors: {
        // emphisis: "#fad16b",
        emphisis: "#71ff7b",
        detail: "#EF4444",
        white: "#E6E6E6",
        background: "#1E293B",
        dark: "#141C2F",
      },
    },
  },
  plugins: [],
};
