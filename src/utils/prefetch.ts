// 최근 10개 포스트만 보관하여 메모리 누수 방지 (LRU)
const MAX_CACHE_SIZE = 10;
const postDataCache = new Map<string, any>();
const ongoingPromiseCache = new Map<string, Promise<any>>();

export const prefetchPostDetail = (slug: string) => {
    if (!slug) return;
    if (postDataCache.has(slug) || ongoingPromiseCache.has(slug)) return;

    const apiUrl = `${process.env.REACT_APP_SERVER_URL || ""}/api/posts/${slug}`;

    const promise = fetch(apiUrl)
        .then((res) => {
            if (!res.ok) throw new Error("포스트 로드 실패");
            return res.json();
        })
        .then((res) => {
            const data = res.data || res;
            if (postDataCache.size >= MAX_CACHE_SIZE) {
                const oldestKey = postDataCache.keys().next().value;
                if (oldestKey) postDataCache.delete(oldestKey);
            }
            postDataCache.set(slug, data);
            return data;
        })
        .catch((err) => {
            postDataCache.delete(slug);
            throw err;
        })
        .finally(() => {
            ongoingPromiseCache.delete(slug);
        });

    ongoingPromiseCache.set(slug, promise);
};

export const getCachedPost = async (slug: string) => {
    // 1. 이미 완료된 데이터가 메모리에 있으면 동기(0ms) 반환
    if (postDataCache.has(slug)) {
        return postDataCache.get(slug);
    }
    // 2. 호버로 요청이 날아가 진행 중인 상태라면 그 Promise 반환
    if (ongoingPromiseCache.has(slug)) {
        return ongoingPromiseCache.get(slug);
    }
    // 3. 호버 없이 직행한 경우 fetch 실행 후 캐시 적재
    return fetch(`${process.env.REACT_APP_SERVER_URL || ""}/api/posts/${slug}`)
        .then((res) => {
            if (!res.ok) throw new Error("포스트 로드 실패");
            return res.json();
        })
        .then((res) => {
            const data = res.data || res;
            if (postDataCache.size >= MAX_CACHE_SIZE) {
                const oldestKey = postDataCache.keys().next().value;
                if (oldestKey) postDataCache.delete(oldestKey);
            }
            postDataCache.set(slug, data);
            return data;
        });
};

// 동기식으로 캐시 존재 여부만 빠르게 확인할 수 있는 헬퍼
export const checkPostCacheSync = (slug: string) => {
    return postDataCache.get(slug);
};
