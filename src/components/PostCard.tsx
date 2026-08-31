import { PostSummary } from "../types/post";

function PostCard({ post }: { post: PostSummary }) {
    return (
        <article
            key={post.id}
            className="hover:text-primary hover:-translate-y-2 transition-transform duration-500"
        >
            <a href={`/posts/${post.slug}`}>
                <div className="container flex flex-col">
                    <div className="relative">
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-3/4 object-cover rounded-2xl"
                        />
                        <div className="px-3 py-1 absolute top-3 left-3 bg-gray-600/50 backdrop-blur-sm rounded-2xl text-gray-50 text-sm">
                            {post.categoryName}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl mb-3 font-bold ">
                            {post.title}
                        </h3>

                        <div className="flex space-x-2 mb-2">
                            {post.tags.map((tag, tdx) => (
                                <span
                                    key={tdx}
                                    className="bg-gray-50 rounded-xl text-xs text-gray-500 dark:text-gray-400 dark:bg-gray-800 font-light px-2 py-1"
                                >
                                    # {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString(
                                "ko-KR",
                            )}
                        </p>
                    </div>
                </div>
            </a>
        </article>
    );
}

export default PostCard;
