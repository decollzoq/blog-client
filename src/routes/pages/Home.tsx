import {useCategory} from "../../contexts/providers/CategoryProvider";
import FeaturedSlider from "../../components/FeaturedSlider";
import CategoryFilter from "../../components/CategoryFilter";
import PostGrid from "../../components/PostGrid";
import {useEffect, useState, useCallback} from "react";
import {PostSummary} from "../../types/post";
import {HomeLoadingSkeleton} from "../../components/LoadingSkeleton";

function Home() {
    const {category} = useCategory();

    // window에 주입된 초기 데이터가 있는지 확인
    const initialPosts =
        typeof window !== "undefined" ? window.__INITIAL_POSTS__ : undefined;

    // 초기 데이터가 있으면 즉시 상태로 주입]
    const [posts, setPosts] = useState<PostSummary[]>(() => {
        if (category.slug === "all" || !category.slug) {
            return initialPosts || [];
        }
        return [];
    });

    // 초기 데이터가 있으면 로딩을 false로 시작해 스켈레톤 UI 스킵
    const [isLoading, setIsLoading] = useState<boolean>(() => {
        if (category.slug === "all" || !category.slug) {
            return !initialPosts;
        }
        return true;
    });

    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        try {
            if (!posts.length) {
                setIsLoading(true);
            }
            setError(null);
            const queryParam =
                category.slug === "all" || !category.slug
                    ? ""
                    : `?category=${category.slug}`;
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/posts${queryParam}`,
            );

            const res = (await response.json()) as {
                success: boolean;
                data: PostSummary[];
            };

            if (res.success && Array.isArray(res.data)) {
                setPosts(res.data);
            } else {
                setPosts([]);
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            console.error("===== 포스트 데이터 로드 실패 =====", e);
        } finally {
            setIsLoading(false);
            if (typeof window !== "undefined") {
                window.__INITIAL_POSTS__ = undefined;
            }
        }
    }, [category.slug, posts.length]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

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
                        {category.slug === "all" && posts.length > 0 && (
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
