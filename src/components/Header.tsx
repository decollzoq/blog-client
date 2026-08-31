import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import useDarkMode from "../hooks/useDarkMode";

function Header() {
    const { isDark, toggle } = useDarkMode();

    return (
        <header className="sticky top-0 bg-white dark:bg-gray-900 z-10">
            <nav className="container max-w-4xl mx-auto px-6 py-3 flex justify-between">
                <a href="/" className="flex items-center">
                    <h1 className="font-bold text-2xl">SEON</h1>
                </a>
                <div className="flex gap-6 place-items-center ">
                    <div className="hover:text-primary">
                        <a href="/" className="text-lg">
                            Home
                        </a>
                    </div>
                    <button
                        onClick={toggle}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-xl w-10 h-10 "
                    >
                        {isDark ? (
                            <IoSunnyOutline className="mx-auto w-5 h-5 text-gray-50 " />
                        ) : (
                            <FaRegMoon className="mx-auto" />
                        )}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
