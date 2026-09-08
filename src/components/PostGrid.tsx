import {useState, useEffect, useRef} from "react";
import {PostSummary} from "../types/post";
import PostCard from "./PostCard";
import Pagination from "./Pagination";

interface PostGridProps {
    posts: PostSummary[];
}

const ITEMS_PER_PAGE = 6;

function PostGrid({posts}: PostGridProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const gridRef = useRef<HTMLDivElement>(null);

    // 카테고리 필터 클릭 등으로 post 목록이 바뀌면 1페이지로 리셋
    useEffect(() => {
        setCurrentPage(1);
    }, [posts]);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

    // 현재 페이지에서 보여줄 카드 슬라이싱
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // 번호 클릭 시 포스트 그리드 상단으로 부드럽게 스크롤
        if (gridRef.current) {
            gridRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    if (posts.length === 0) {
        return (
            <div className="py-20 text-center text-gray-400 dark:text-gray-500 text-sm">
                등록된 게시글이 없습니다.
            </div>
        );
    }

    return (
        <section ref={gridRef} className="mb-16 max-w-4xl mx-auto scroll-mt-20">
            {/* 카드 2x2 격자 레이아웃 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start max-w-full">
                {currentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* 페이지네이션 UI */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    );
}

export default PostGrid;
