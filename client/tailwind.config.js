/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react"); // eslint-disable-line
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            primary: {
              "50": "#fefce8",
              "100": "#fef9c3",
              "200": "#fef08a",
              "300": "#fde047",
              "400": "#facc15",
              "500": "#eab308",
              "600": "#ca8a04",
              "700": "#a16207",
              "800": "#854d0e",
              "900": "#713f12",
              "950": "#422006",
              DEFAULT: "#facc15",
            },
            secondary: {
              "50": "#fafaf9",
              "100": "#f5f5f4",
              "200": "#e7e5e4",
              "300": "#d6d3d1",
              "400": "#a8a29e",
              "500": "#78716c",
              "600": "#57534e",
              "700": "#44403c",
              "800": "#292524",
              "900": "#1c1917",
              "950": "#0c0a09",
              DEFAULT: "#78716c",
            },
          },
        },
      },
    })
  ]
}

