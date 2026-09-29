import {useEffect, useState} from "react";
import {IoArrowUp} from "react-icons/io5";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, {passive: true});
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="맨 위로 가기"
            className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm"
        >
            <IoArrowUp className="w-5 h-5" />
        </button>
    );
}
