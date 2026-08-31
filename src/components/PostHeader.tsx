import { Post } from "../types/post";
interface Props {
    post: Post;
}
function PostHeader({ post }: Props) {
    return (
        <header className="flex flex-col items-start gap-4 mb-8">
            <div className="flex flex-row items-center gap-3">
                <div className="text-sm bg-primary text-gray-50 rounded-3xl px-3 py-1 dark:bg-primary-dark">
                    {post.categoryName}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-wider">
                {post.title}
            </h1>
        </header>
    );
}
export default PostHeader;
