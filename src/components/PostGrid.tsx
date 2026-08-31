import { PostSummary } from "../types/post";
import PostCard from "./PostCard";
interface PostGridProps {
    posts: PostSummary[];
}
function PostGrid({ posts }: PostGridProps) {
    return (
        <section className="mb-16 max-w-4xl mx-auto">
            <div className="container grid grid-cols-1 sm:grid-cols-2 gap-12 items-start max-w-full ">
                {posts.map((p: PostSummary) => (
                    <PostCard key={p.id} post={p} />
                ))}
            </div>
        </section>
    );
}

export default PostGrid;
