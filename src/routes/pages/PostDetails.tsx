import {useParams, useLocation} from "react-router";
import {useEffect, useState, useRef, useMemo} from "react";
import PostNavigation from "../../components/post/PostNavigation";
import MarkdownViewer from "../../components/post/MarkdownViewer";
import PostHeader from "../../components/post/PostHeader";
import PostTagList from "../../components/post/PostTagList";
import {Post, PostSummary} from "../../types/post";
import {PostDetailSkeleton} from "../../components/common/LoadingSkeleton";
import TOC from "../../components/post/TOC";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";
import {checkPostCacheSync, fetchPostWithSWR} from "../../utils/prefetch";

interface LocationState {
    postSummary?: PostSummary;
}

function PostDetails() {
    const {slug} = useParams<string>();
    const location = useLocation();
    const routerState = location.state as LocationState | null;

    // Cold Visit 주입 데이터 확인
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

    // 호버/기존 방문으로 축적된 인메모리 캐시 동기 확인 (0ms)
    const cachedPost = useMemo(() => {
        return slug ? checkPostCacheSync(slug) : undefined;
    }, [slug]);

    // 라우터 state로 넘어온 요약 정보
    const summaryPost = useMemo(() => {
        if (routerState?.postSummary && routerState.postSummary.slug === slug) {
            return {
                ...routerState.postSummary,
                content: "",
            } as Post;
        }
        return undefined;
    }, [routerState, slug]);

    const hasInitialData = useRef(Boolean(initialPost));

    // 화면 초기 상태: 주입 데이터 > 인메모리 전체 데이터 > 요약 데이터
    const [post, setPost] = useState<Post | undefined>(
        () => initialPost || cachedPost || summaryPost,
    );

    // 전체 스켈레톤: 셋 다 없는 직접 URL 진입 시에만 true
    const [isLoading, setIsLoading] = useState<boolean>(
        !initialPost && !cachedPost && !summaryPost,
    );

    // 본문 펄스 스켈레톤: 요약 정보만 있고 본문 content가 아직 없을 때만 true
    const [isContentLoading, setIsContentLoading] = useState<boolean>(
        Boolean(summaryPost && !initialPost && !cachedPost?.content),
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        let isMounted = true;

        // Cold Visit 첫 렌더링 주입 데이터 사용 시 1회 스킵
        if (hasInitialData.current) {
            hasInitialData.current = false;
            if (typeof window !== "undefined") {
                window.__INITIAL_POST_DETAIL__ = undefined;
            }
            return;
        }

        // SWR 실행: 즉시 캐시 반환 + 백그라운드 재검증
        const cached = fetchPostWithSWR(slug, (freshData) => {
            if (isMounted && freshData) {
                setPost(freshData);
                setIsLoading(false);
                setIsContentLoading(false);
                setError(null);
            }
        });

        if (cached?.content) {
            // 캐시에 본문까지 완벽히 있으면 스켈레톤 없이 즉시 렌더링
            setPost(cached);
            setIsLoading(false);
            setIsContentLoading(false);
        } else if (summaryPost) {
            // 호버 캐시가 아직 도착 전이면 헤더 띄우고 본문만 펄스 시작
            setPost(summaryPost);
            setIsLoading(false);
            setIsContentLoading(true);
        } else {
            setIsLoading(true);
        }

        return () => {
            isMounted = false;
        };
    }, [slug, summaryPost]);

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
                {post.content && <TOC content={post.content} />}
                <PostHeader post={post} />
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    fetchPriority="high"
                    loading="eager"
                    className="rounded-3xl max-h-[468px] aspect-[16/9] w-full object-cover"
                />

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
