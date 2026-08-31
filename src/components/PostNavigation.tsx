import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { PostNav } from "../types/post";

interface NavigationProps {
    prevPost?: PostNav | null;
    nextPost?: PostNav | null;
}

function PostNavigation({ prevPost, nextPost }: NavigationProps) {
    return (
        <nav className="flex justify-between items-center space-x-8">
            <div className="w-1/2">
                {prevPost && (
                    <a
                        href={`/posts/${prevPost.slug}`}
                        className="p-4 flex space-x-4 items-center w-full text-gray-900 dark:text-gray-50 dark:hover:bg-gray-700 hover:bg-gray-50 rounded-lg hover:text-primary"
                    >
                        <IoIosArrowBack className="text-2xl" />
                        <div className="flex flex-col items-start gap-1 min-w-0">
                            <div className="text-gray-500 dark:text-gray-300 text-sm">
                                이전 글
                            </div>
                            <div className="w-full text-xl leading-10 text-start truncate ">
                                {prevPost.title}
                            </div>
                        </div>
                    </a>
                )}
            </div>

            <div className="w-1/2">
                {nextPost && (
                    <a
                        href={`/posts/${nextPost.slug}`}
                        className="p-4 flex space-x-4 items-center w-full justify-end text-gray-900 dark:text-gray-50 dark:hover:bg-gray-700 hover:bg-gray-50 rounded-lg hover:text-primary"
                    >
                        <div className="flex flex-col items-end gap-1 min-w-0">
                            <h2 className="text-gray-500 dark:text-gray-300  text-sm">
                                다음 글
                            </h2>
                            <p className="w-full text-xl leading-10 text-end truncate">
                                {nextPost.title}
                            </p>
                        </div>
                        <IoIosArrowForward className="text-2xl" />
                    </a>
                )}
            </div>
        </nav>
    );
}

export default PostNavigation;
