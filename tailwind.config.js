/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blueBg: "#eef1fa",
        green: "#02c462",
        darkBlue: "#00227d",
        grayText: "#afafbb",
        lightGray: "#626268",
        darkGray: "#202020",
        programBorder: "#d4d4df",
        programBg: "#eeeef4",
      },
      boxShadow: {
        card: "0px 0px 20px 16px rgba(17, 17, 26, 0.08)",
        activeProgram:
          "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
      },
      fontFamily: {
        body: ["Nunito"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          xl: "30px",
        },
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
        width: {
          min: "20rem",
          max: "25rem",
        },
        minWidth: {
          min: "20rem",
          max: "25rem",
        },
      },
    },
  },
  plugins: [],
};
