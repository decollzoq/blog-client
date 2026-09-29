import {useParams, useLocation} from "react-router";
import {useEffect, useState, useCallback, useRef, useMemo} from "react";
import PostNavigation from "../../components/post/PostNavigation";
import MarkdownViewer from "../../components/post/MarkdownViewer";
import PostHeader from "../../components/post/PostHeader";
import PostTagList from "../../components/post/PostTagList";
import {Post, PostSummary} from "../../types/post";
import {PostDetailSkeleton} from "../../components/common/LoadingSkeleton";
import TOC from "../../components/post/TOC";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";

interface LocationState {
    postSummary?: PostSummary;
}

function PostDetails() {
    const {slug} = useParams<string>();
    const location = useLocation();
    const routerState = location.state as LocationState | null;

    // Cold Visit: window에 주입된 초기 포스트 상세 데이터 확인
    const initialPost = useMemo(() => {
        if (typeof window === "undefined" || !window.__INITIAL_POST_DETAIL__) {
            return undefined;
        }
        const injected = window.__INITIAL_POST_DETAIL__;
        if (!slug) return injected;

        const isMatched =
            injected.slug === slug ||
            String(injected.id) === slug ||
            decodeURIComponent(injected.slug || "") ===
                decodeURIComponent(slug || "");

        return isMatched ? injected : undefined;
    }, [slug]);

    // SPA 대응: 홈 화면 카드 또는 PostNavigation에서 state로 넘겨받은 요약 정보
    const summaryPost = useMemo(() => {
        if (routerState?.postSummary && routerState.postSummary.slug === slug) {
            return {
                ...routerState.postSummary,
                content: "",
            } as Post;
        }
        return undefined;
    }, [routerState, slug]);

    // Cold Visit 최초 1회 감지용 플래그
    const hasInitialData = useRef(Boolean(initialPost));

    // 화면에 그릴 초기 상태 : 주입 데이터 > 전달받은 요약 데이터 > undefined
    const [post, setPost] = useState<Post | undefined>(
        () => initialPost || summaryPost,
    );

    // 전체 스켈레톤: initialPost도 없고 summaryPost도 없는 직접 URL 진입일 때만 true
    const [isLoading, setIsLoading] = useState<boolean>(
        !initialPost && !summaryPost,
    );

    // 본문 스켈레톤: 요약 정보만 있고 본문 content가 아직 없을 때 true
    const [isContentLoading, setIsContentLoading] = useState<boolean>(
        Boolean(summaryPost && !initialPost),
    );
    const [error, setError] = useState<string | null>(null);

    const fetchPostDetail = useCallback(async () => {
        if (!slug) return;

        // Cold Visit 첫 렌더링 시 주입된 데이터를 사용한 경우 한 번만 건너뛰고 플래그 해제
        if (hasInitialData.current) {
            hasInitialData.current = false;
            return;
        }

        try {
            if (!summaryPost) {
                setIsLoading(true);
            } else {
                setIsContentLoading(true);
            }
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
            setIsContentLoading(false);
            if (typeof window !== "undefined") {
                window.__INITIAL_POST_DETAIL__ = undefined;
            }
        }
    }, [slug, summaryPost]);

    useEffect(() => {
        // state가 있으면 헤더/썸네일을 0ms 만에 즉시 렌더링하고 본문 로딩 펄스 켬
        if (summaryPost) {
            setPost(summaryPost);
            setIsLoading(false);
            setIsContentLoading(true);
        } else if (!hasInitialData.current) {
            // 직접 URL 입력 진입 시에만 전체 스켈레톤 노출
            setPost(undefined);
            setIsLoading(true);
        }

        fetchPostDetail();
    }, [slug, fetchPostDetail, summaryPost]);

    // 아무런 데이터도 없을 때만 전체 스켈레톤 렌더링
    if (isLoading && !post) {
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
            <main className="relative max-w-4xl mx-auto px-6 py-12 mb-20">
                {/* 글 우측 목차 (xl 이상 화면에서만 표시) */}
                {post.content && <TOC content={post.content} />}
                <PostHeader post={post} />
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    fetchPriority="high"
                    loading="eager"
                    className="rounded-3xl max-h-[468px] aspect-[16/9] w-full object-cover"
                />

                {/* 본문 영역: 본문 fetch 대기 중에만 가벼운 펄스 스켈레톤 표시 */}
                {isContentLoading || !post.content ? (
                    <div className="py-16 space-y-4 animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                    </div>
                ) : (
                    <MarkdownViewer content={post.content} />
                )}

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
            <ScrollToTopButton />
        </div>
    );
}

export default PostDetails;
