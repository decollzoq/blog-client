const prefetchedSlugs = new Set<string>();

export const prefetchPostDetail = (slug: string) => {
    if (!slug || prefetchedSlugs.has(slug)) return;

    prefetchedSlugs.add(slug);

    // 1. 상세 페이지 API 사전 호출 (브라우저 HTTP 캐시 적재)
    const apiUrl = `${process.env.REACT_APP_SERVER_URL || ""}/api/posts/${slug}`;

    // priority: 'low'를 주어 메인 스레드 렌더링에 영향을 주지 않음
    fetch(apiUrl, {priority: "low"}).catch((err) => {
        // 프리패칭 실패는 무시하고 Set에서 제거하여 클릭 시 정상 fetch되도록 처리
        prefetchedSlugs.delete(slug);
    });

    // 2. 마크다운 뷰어 및 신택스 하이라이터 번들 청크도 백그라운드 사전 로드
    import("../components/post/MarkdownViewer").catch(() => {});
};
