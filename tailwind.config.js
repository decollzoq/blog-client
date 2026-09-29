/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                primary: {
                    // 은은한 라이트 배경 틴트나 연한 태그용
                    light: "#F4F4F5", // zinc-100
                    // 라이트 모드 메인 포인트: 묵직한 딥 블랙/차콜
                    DEFAULT: "#18181B", // zinc-900
                    // 다크 모드(dark:bg-primary-dark 등) 포인트: 선명하고 깨끗한 화이트
                    dark: "#FAFAFA", // zinc-50
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
