import {useParams} from "react-router";
import {useEffect, useState} from "react";
import PostNavigation from "../../components/PostNavigation";
import MarkdownViewer from "../../components/MarkdownViewer";
import PostHeader from "../../components/PostHeader";
import PostTagList from "../../components/PostTagList";
import {Post} from "../../types/post";
import {PostDetailSkeleton} from "../../components/LoadingSkeleton";

function PostDetails() {
    const {slug} = useParams<string>();
    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    async function fetchPostDetail() {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/posts/${slug}`,
            );
            const res = await response.json();
            if (res.success && res.data) {
                setPost(res.data);
            } else {
                setPost(undefined);
            }
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
        setPost(undefined);
        window.scrollTo({top: 0, left: 0, behavior: "instant"});
        fetchPostDetail();
    }, [slug]);

    if (isLoading) {
        return <PostDetailSkeleton />;
    }
    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }
    if (!post) {
        return (
            <div className="text-center py-20 text-gray-500">
                포스트를 찾을 수 없습니다.
            </div>
        );
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
