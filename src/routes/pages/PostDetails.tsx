import {useParams} from "react-router";
import {useEffect, useState, useCallback, useRef} from "react";
import PostNavigation from "../../components/PostNavigation";
import MarkdownViewer from "../../components/MarkdownViewer";
import PostHeader from "../../components/PostHeader";
import PostTagList from "../../components/PostTagList";
import {Post} from "../../types/post";
import {PostDetailSkeleton} from "../../components/LoadingSkeleton";

function PostDetails() {
    const {slug} = useParams<string>();

    // window에 주입된 초기 포스트 상세 데이터 확인
    const initialPost =
        typeof window !== "undefined" &&
        window.__INITIAL_POST_DETAIL__ &&
        (window.__INITIAL_POST_DETAIL__.slug === slug ||
            String(window.__INITIAL_POST_DETAIL__.id) === slug)
            ? window.__INITIAL_POST_DETAIL__
            : undefined;

    // 첫 진입 시 주입 데이터 소비 여부 기억
    const hasInitialData = useRef(Boolean(initialPost));

    // 주입 데이터가 있으면 즉시 post 상태로 바인딩
    const [post, setPost] = useState<Post | undefined>(initialPost);

    // 주입 데이터가 있으면 스켈레톤을 0초로 스킵 (false로 시작)
    const [isLoading, setIsLoading] = useState<boolean>(!initialPost);
    const [error, setError] = useState<string | null>(null);

    const fetchPostDetail = useCallback(async () => {
        if (!slug) return;
        try {
            // 주입 데이터가 없을 때만 로딩 스켈레톤 활성화
            if (!hasInitialData.current) {
                setIsLoading(true);
            }
            setError(null);

            const encodedSlug = encodeURIComponent(slug);
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/posts/${encodedSlug}`,
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
            // 첫 진입 소비 완료 후 플래그 및 window 변수 해제
            hasInitialData.current = false;
            if (typeof window !== "undefined") {
                window.__INITIAL_POST_DETAIL__ = undefined;
            }
        }
    }, [slug]);

    useEffect(() => {
        // 첫 진입 주입 데이터가 없을 때만 상태 비우기 (다른 글로 이동 시 대응)
        if (!hasInitialData.current) {
            setPost(undefined);
        }
        fetchPostDetail();
    }, [fetchPostDetail]);

    useEffect(() => {
        if (post) {
            setTimeout(() => {
                window.scrollTo({top: 0, left: 0, behavior: "instant"});
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 0);
        }
    }, [post]);

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
