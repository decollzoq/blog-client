import {Link} from "react-router";
import {IoIosArrowBack} from "react-icons/io";
import {IoIosArrowForward} from "react-icons/io";
import {PostNav} from "../../types/post";
import {prefetchPostDetail} from "../../utils/prefetch";

interface NavigationProps {
    prevPost?: PostNav | null;
    nextPost?: PostNav | null;
}

function PostNavigation({prevPost, nextPost}: NavigationProps) {
    if (!prevPost && !nextPost) {
        return (
            <div className="py-6 text-gray-400 dark:text-gray-500 text-sm">
                해당 카테고리에 등록된 다른 글이 없습니다.
            </div>
        );
    }
    return (
        <nav className="flex justify-between items-center space-x-8">
            <div className="w-1/2">
                {nextPost && (
                    <Link
                        to={`/posts/${nextPost.slug}`}
                        state={{postSummary: nextPost}}
                        onMouseEnter={() => prefetchPostDetail(nextPost.slug)}
                        onTouchStart={() => prefetchPostDetail(nextPost.slug)}
                        className="p-4 flex space-x-4 items-center w-full text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/70 rounded-xl transition-colors group"
                    >
                        <IoIosArrowBack className="text-2xl text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                        <div className="flex flex-col items-start gap-1 min-w-0">
                            <h2 className="text-gray-400 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                다음 글
                            </h2>
                            <p className="w-full text-lg leading-7 text-start truncate font-medium group-hover:underline">
                                {nextPost.title}
                            </p>
                        </div>
                    </Link>
                )}
            </div>
            <div className="w-1/2">
                {prevPost && (
                    <Link
                        to={`/posts/${prevPost.slug}`}
                        state={{postSummary: prevPost}}
                        onMouseEnter={() => prefetchPostDetail(prevPost.slug)}
                        onTouchStart={() => prefetchPostDetail(prevPost.slug)}
                        className="p-4 flex space-x-4 items-center w-full justify-end text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/70 rounded-xl transition-colors group"
                    >
                        <div className="flex flex-col items-end gap-1 min-w-0">
                            <div className="text-gray-400 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                이전 글
                            </div>
                            <div className="w-full text-lg leading-7 text-end truncate font-medium group-hover:underline">
                                {prevPost.title}
                            </div>
                        </div>
                        <IoIosArrowForward className="text-2xl text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default PostNavigation;
