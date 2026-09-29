import {FaRegMoon} from "react-icons/fa";
import {IoSunnyOutline} from "react-icons/io5";
import {Link} from "react-router";
import useDarkMode from "../../hooks/useDarkMode";

function Header() {
    const {isDark, toggle} = useDarkMode();

    return (
        <header className="sticky top-0 bg-white/80 dark:bg-[#0d1117]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/60 z-50 transition-colors">
            <nav className="container max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <h1 className="font-bold text-2xl tracking-tight text-gray-900 dark:text-gray-100">
                        SEON
                    </h1>
                </Link>

                <div className="flex gap-6 items-center">
                    <div>
                        <Link
                            to="/"
                            className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                    </div>

                    <button
                        onClick={toggle}
                        aria-label="다크 모드 전환"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800/80 p-2 rounded-xl w-10 h-10 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        {isDark ? (
                            <IoSunnyOutline className="w-5 h-5 text-amber-400" />
                        ) : (
                            <FaRegMoon className="w-4 h-4 text-gray-700" />
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
