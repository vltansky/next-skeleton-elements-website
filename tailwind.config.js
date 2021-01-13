module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.mdx", "./src/**/*.md"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#a434ff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
