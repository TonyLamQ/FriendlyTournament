/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./apps/tournament/src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes:["corporate"]
  }
}

