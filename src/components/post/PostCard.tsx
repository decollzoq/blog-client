import {Link} from "react-router";
import {PostSummary} from "../../types/post";

function PostCard({post}: {post: PostSummary}) {
    return (
        <article className="group py-8 sm:py-10 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
            <Link
                to={`/posts/${post.slug}`}
                state={{postSummary: post}}
                className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6 md:gap-10"
            >
                {/* 좌측: 카테고리, 제목, 요약/태그, 날짜 */}
                <div className="flex-1 flex flex-col items-start">
                    <span className="text-sm font-semibold text-primary dark:text-primary-dark mb-2">
                        {post.categoryName}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors mb-3">
                        {post.title}
                    </h3>
                    {/* 태그 목록 */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag, tdx) => (
                            <span
                                key={tdx}
                                className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs px-2.5 py-1 rounded-md"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-sm text-gray-400 dark:text-gray-500 font-light">
                        {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                </div>

                {/* 우측: 썸네일 이미지 (모바일은 전체 폭, sm 이상에서는 고정 폭) */}
                <div className="w-full sm:w-48 md:w-56 lg:w-64 shrink-0 aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-xs">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.15]"
                    />
                </div>
            </Link>
        </article>
    );
}

export default PostCard;
