import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PostNavigation from "../../components/PostNavigation";
import MarkdownViewer from "../../components/MarkdownViewer";
import PostHeader from "../../components/PostHeader";
import PostTagList from "../../components/PostTagList";
import { Post } from "../../types/post";
function PostDetails() {
    const { slug } = useParams<string>();
    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    async function fetchPostDetail() {
        try {
            setIsLoading(true);
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/posts/${slug}`,
            );
            const data = await response.json();
            console.log(data);
            setPost(data);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            console.error("===== 데이터 로드 실패 =====", e);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchPostDetail();
    }, [slug]);

    if (isLoading) {
        return null;
    }
    if (!post) {
        return <div>포스트를 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <main className="max-w-4xl mx-auto px-6 py-12 mb-20">
                <PostHeader post={post} />
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="rounded-3xl max-h-[468px] w-full object-cover"
                />

                <MarkdownViewer content={post.content} />

                <PostTagList tags={post.tags} />

                <footer className="mb-12 flex flex-col mt-12 text-gray-800 text-sm text-center font-normal dark:text-gray-300 border-t-gray-200 dark:border-t-gray-600 pt-8 space-y-4 border-t-[1px]">
                    <h1>
                        <span className="text-primary-dark">
                            {post.categoryName}{" "}
                        </span>
                        카테고리의 다른 글
                    </h1>
                    <PostNavigation
                        prevPost={post.prevPost}
                        nextPost={post.nextPost}
                    />
                </footer>
            </main>
        </div>
    );
}

export default PostDetails;
