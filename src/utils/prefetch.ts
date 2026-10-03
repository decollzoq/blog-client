const MAX_CACHE_SIZE = 10;

// 상세 포스트 캐시 및 진행 중인 요청 맵
const postDataCache = new Map<string, any>();
const ongoingPostPromiseMap = new Map<string, Promise<any>>();

// 포스트 목록 캐시 및 진행 중인 요청 맵
const postListCache = new Map<string, any>();
const ongoingListPromiseMap = new Map<string, Promise<any>>();

export const prefetchPostDetail = (slug: string) => {
    if (!slug) return;
    if (postDataCache.has(slug) || ongoingPostPromiseMap.has(slug)) return;

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
            ongoingPostPromiseMap.delete(slug);
        });

    ongoingPostPromiseMap.set(slug, promise);
};

export const checkPostCacheSync = (slug: string) => {
    return postDataCache.get(slug);
};

export const fetchPostWithSWR = (
    slug: string,
    onRevalidated: (freshData: any) => void,
) => {
    // 1. 이미 캐시된 데이터 즉시 확인
    const cachedData = postDataCache.get(slug);

    // 2. 이미 백그라운드 네트워크 요청이 진행 중이라면 그 Promise에 콜백 연결
    if (ongoingPostPromiseMap.has(slug)) {
        ongoingPostPromiseMap
            .get(slug)!
            .then((freshData) => {
                if (freshData) onRevalidated(freshData);
            })
            .catch(() => {});
        return cachedData;
    }

    // 3. 백그라운드 재검증 요청 (Revalidate)
    const apiUrl = `${process.env.REACT_APP_SERVER_URL || ""}/api/posts/${slug}`;
    const promise = fetch(apiUrl)
        .then((res) => {
            if (!res.ok) throw new Error("포스트 로드 실패");
            return res.json();
        })
        .then((res) => {
            const freshData = res.data || res;
            if (postDataCache.size >= MAX_CACHE_SIZE) {
                const oldestKey = postDataCache.keys().next().value;
                if (oldestKey) postDataCache.delete(oldestKey);
            }
            postDataCache.set(slug, freshData);
            onRevalidated(freshData);
            return freshData;
        })
        .catch((err) => {
            console.error("포스트 백그라운드 재검증 실패:", err);
            throw err;
        })
        .finally(() => {
            ongoingPostPromiseMap.delete(slug);
        });

    ongoingPostPromiseMap.set(slug, promise);
    return cachedData;
};

export const checkPostListCacheSync = (
    category: string = "all",
    page: number = 1,
) => {
    return postListCache.get(`${category}-${page}`);
};

export const fetchPostListWithSWR = (
    category: string = "all",
    page: number = 1,
    onRevalidated: (freshData: any) => void,
) => {
    const cacheKey = `${category}-${page}`;
    const cachedData = postListCache.get(cacheKey);

    // 중복 API 호출 방지 (Home 진입 시 2번 호출 차단)
    if (ongoingListPromiseMap.has(cacheKey)) {
        ongoingListPromiseMap
            .get(cacheKey)!
            .then((freshData) => {
                if (freshData) onRevalidated(freshData);
            })
            .catch(() => {});
        return cachedData;
    }

    const query = new URLSearchParams();
    if (category && category !== "all") query.append("category", category);
    query.append("page", String(page));

    const apiUrl = `${process.env.REACT_APP_SERVER_URL || ""}/api/posts?${query.toString()}`;

    const promise = fetch(apiUrl)
        .then((res) => {
            if (!res.ok) throw new Error("목록 로드 실패");
            return res.json();
        })
        .then((res) => {
            const freshData = res.data || res;
            postListCache.set(cacheKey, freshData);
            onRevalidated(freshData);
            return freshData;
        })
        .catch((err) => {
            console.error("목록 백그라운드 재검증 실패:", err);
            throw err;
        })
        .finally(() => {
            ongoingListPromiseMap.delete(cacheKey);
        });

    ongoingListPromiseMap.set(cacheKey, promise);
    return cachedData;
};
