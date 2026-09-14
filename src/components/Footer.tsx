function Footer() {
    return (
        <footer className="border-t-[1px] py-8 px-6 sm:px-12 border-t-gray-200/50 dark:border-t-gray-800 font-light text-sm text-gray-500 dark:text-gray-400">
            <div className="container max-w-4xl mx-auto flex flex-col items-center gap-4 justify-center">
                <nav className="flex space-x-6 items-center">
                    <a
                        href="https://github.com/decollzoq"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://velog.io/@decollzoq/posts"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
                    >
                        Velog
                    </a>
                </nav>
                <p className="text-xs text-center text-gray-400">
                    © 2026. ParkMinSeon All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
