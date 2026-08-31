function Footer() {
    return (
        <footer className="border-t-[1px] py-8 px-64 border-t-gray-200/50 font-light text-sm">
            <div className="flex flex-col items-center gap-4 justify-center">
                <div className="flex space-x-6 items-center">
                    <a
                        href="https://github.com/decollzoq"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2"
                    >
                        GitHub{" "}
                    </a>
                    <a
                        href="https://velog.io/@decollzoq/posts"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2"
                    >
                        Velog
                    </a>
                </div>
                <h1>© 2026. ParkMinSeon All rights reserved.</h1>
            </div>
        </footer>
    );
}

export default Footer;
