import {useEffect, useState} from "react";

function useDarkMode() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;

        // 1. 테마가 전환되는 찰나(순간)에 모든 transition을 강제로 꺼버림
        const css = document.createElement("style");
        css.appendChild(
            document.createTextNode(
                `* {
                   -webkit-transition: none !important;
                   -moz-transition: none !important;
                   -o-transition: none !important;
                   -ms-transition: none !important;
                   transition: none !important;
                }`,
            ),
        );
        document.head.appendChild(css);

        // 2. 다크모드 클래스 및 스토리지 업데이트
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        // 3. 브라우저가 변경된 색상 스타일을 적용(리플로우)한 직후 즉시 transition 복구
        void window.getComputedStyle(css).opacity;
        document.head.removeChild(css);
    }, [isDark]);

    function toggle() {
        setIsDark((prev) => !prev);
    }

    return {isDark, toggle};
}

export default useDarkMode;
