import {useCategory} from "../../contexts/providers/CategoryProvider";
import FeaturedSlider from "../../components/FeaturedSlider";
import CategoryFilter from "../../components/CategoryFilter";
import PostGrid from "../../components/PostGrid";
import {useEffect, useState} from "react";
import {PostSummary} from "../../types/post";
import {HomeLoadingSkeleton} from "../../components/LoadingSkeleton";

function Home() {
    const {category} = useCategory();
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchPosts() {
        try {
            setIsLoading(true);
            setError(null);
            const queryParam =
                category.slug === "all" || !category.slug
                    ? ""
                    : `?category=${category.slug}`;
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/posts${queryParam}`,
            );

            const res = await response.json();
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
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [category.slug]);

    if (isLoading) {
        return <HomeLoadingSkeleton />;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <div>
            <main className="container max-w-4xl mx-auto px-6 py-12">
                {error && <p>{error}</p>}
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
