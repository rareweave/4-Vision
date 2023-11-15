module.exports = {
  plugins: [require("flowbite/plugin"), require("daisyui")],
  content: [
    "./components/**/*.{vue,css}",
    "./pages/**/*.{vue,css}",
    "./layouts/**/*.{vue,css}",
    "./assets/**/*.{vue,css}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
      serif: ["ui-serif", "Georgia"],
      mono: ["Iosevka Aile Web", "monospace"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
  },
};
