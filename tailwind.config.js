/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#a8dff0",
                    DEFAULT: "#87ceeb",
                    dark: "#5fa8d3",
                },
                gray: {
                    50: "#F9FAFB",
                    100: "#F3F4F6",
                    150: "#EAEAEA",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
