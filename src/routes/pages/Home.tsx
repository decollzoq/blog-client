import {useCategory} from "../../contexts/CategoryProvider";
import FeaturedSlider from "../../components/post/FeaturedSlider";
import CategoryFilter from "../../components/post/CategoryFilter";
import PostGrid from "../../components/post/PostGrid";
import {useEffect, useState, useRef} from "react";
import {PostSummary} from "../../types/post";
import {HomeLoadingSkeleton} from "../../components/common/LoadingSkeleton";
import {
    checkPostListCacheSync,
    fetchPostListWithSWR,
} from "../../utils/prefetch";

function Home() {
    const {category} = useCategory();
    const currentCategory = category.slug || "all";

    // Cold Visit 주입 데이터 확인
    const initialPosts =
        typeof window !== "undefined" && currentCategory === "all"
            ? window.__INITIAL_POSTS__
            : undefined;

    // 인메모리 캐시 확인
    const cachedPosts = checkPostListCacheSync(currentCategory, 1);

    // 최초 화면 상태: 주입 데이터 > 인메모리 캐시 > 빈 배열
    const [posts, setPosts] = useState<PostSummary[]>(
        () => cachedPosts || initialPosts || [],
    );

    // 캐시나 주입 데이터가 전혀 없는 경우에만 스켈레톤 활성화
    const [isLoading, setIsLoading] = useState<boolean>(
        !cachedPosts && !initialPosts,
    );
    const [error, setError] = useState<string | null>(null);

    // Cold Visit 최초 마운트 시 중복 fetch 방지 플래그
    const isColdVisitHandled = useRef(Boolean(initialPosts));

    useEffect(() => {
        let isMounted = true;

        if (isColdVisitHandled.current) {
            isColdVisitHandled.current = false;
            if (typeof window !== "undefined") {
                window.__INITIAL_POSTS__ = undefined;
            }
            return;
        }

        // SWR 실행: 캐시 데이터 즉시 반환 + 백그라운드 최신화
        const cached = fetchPostListWithSWR(currentCategory, 1, (freshData) => {
            if (isMounted) {
                setPosts(
                    Array.isArray(freshData)
                        ? freshData
                        : freshData.posts || [],
                );
                setIsLoading(false);
                setError(null);
            }
        });

        if (cached) {
            setPosts(cached);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }

        return () => {
            isMounted = false;
        };
    }, [currentCategory]);

    return (
        <div className="min-h-[85vh]">
            <main className="container max-w-4xl mx-auto px-4 sm:px-6 py-12">
                {error && (
                    <div className="text-center py-20 text-red-500">
                        {error}
                    </div>
                )}

                {isLoading && !error && <HomeLoadingSkeleton />}

                {!isLoading && !error && (
                    <>
                        {currentCategory === "all" && posts.length > 0 && (
                            <FeaturedSlider posts={posts.slice(0, 3)} />
                        )}
                        <CategoryFilter />
                        <PostGrid posts={posts} />
                    </>
                )}
            </main>
        </div>
    );
}

export default Home;
