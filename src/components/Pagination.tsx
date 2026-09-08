interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
    if (totalPages <= 1) return null;

    const PAGE_GROUP_SIZE = 5; // 한 번에 화면에 보여줄 페이지 번호 개수
    const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE); // 현재 페이지 그룹
    const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1; // 현재 페이지 그룹의 시작 페이지 번호
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages); // 현재 페이지 그룹의 마지막 페이지 번호

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <nav
            aria-label="게시글 페이지 이동 네비게이션"
            className="flex justify-center items-center gap-1.5 mt-12 mb-8 select-none"
        >
            {/* 맨 처음 페이지로 이동 */}
            <button
                type="button"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                aria-label="첫 페이지로 이동"
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                &laquo;
            </button>

            {/* 이전 페이지로 이동 */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="이전 페이지로 이동"
                className="px-3 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                이전
            </button>

            {/* 페이지 번호 목록 */}
            <div className="flex items-center gap-1">
                {pages.map((pageNum) => {
                    const isActive = currentPage === pageNum;
                    return (
                        <button
                            key={pageNum}
                            type="button"
                            onClick={() => onPageChange(pageNum)}
                            aria-label={`${pageNum} 페이지로 이동`}
                            aria-current={isActive ? "page" : undefined}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-primary text-white shadow-sm font-bold"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            {/* 다음 페이지로 이동 */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="다음 페이지로 이동"
                className="px-3 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                다음
            </button>

            {/* 맨 끝 페이지로 이동 */}
            <button
                type="button"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="마지막 페이지로 이동"
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
                &raquo;
            </button>
        </nav>
    );
}

export default Pagination;
