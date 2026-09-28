interface Env {
    REACT_APP_SERVER_URL?: string;
}

// 1. PagesFunction 및 HTMLRewriter 로컬 타입 에러 방지 선언
interface EventContext<Env, P extends string, Data> {
    request: Request;
    functionPath: string;
    waitUntil: (promise: Promise<unknown>) => void;
    next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
    env: Env;
    params: Record<P, string | string[]>;
    data: Data;
}

type PagesFunction<
    Env = unknown,
    P extends string = string,
    Data = Record<string, unknown>,
> = (context: EventContext<Env, P, Data>) => Response | Promise<Response>;

declare class HTMLRewriter {
    on(selector: string, handlers: {element?: (el: any) => void}): this;
    transform(response: Response): Response;
}

// 2. 엣지 단일 포스트 데이터 주입 핸들러
export const onRequestGet: PagesFunction<Env, "slug"> = async (context) => {
    // Pages 빌드 결과물인 정적 index.html 원본 가져오기
    const response = await context.next();

    const slug = context.params.slug;
    if (!slug || typeof slug !== "string") {
        return response;
    }

    const serverUrl =
        (context.env as any).REACT_APP_SERVER_URL ||
        "https://blog-server.decollzoq.workers.dev";

    let initialPostJson = "null";

    try {
        const encodedSlug = encodeURIComponent(slug);
        const apiRes = await fetch(`${serverUrl}/api/posts/${encodedSlug}`);
        if (apiRes.ok) {
            const result = (await apiRes.json()) as {
                success: boolean;
                data: unknown;
            };
            if (result.success && result.data) {
                // XSS 방지를 위해 </script> 이스케이프 처리
                initialPostJson = JSON.stringify(result.data).replace(
                    /<\/script>/g,
                    "<\\/script>",
                );
            }
        }
    } catch (err) {
        console.error("Pages Functions 상세 데이터 주입 실패:", err);
    }

    if (initialPostJson === "null") {
        return response;
    }

    // HTMLRewriter를 이용해 <head> 끝부분에 데이터 스크립트 태그 즉시 주입
    return new HTMLRewriter()
        .on("head", {
            element(element: any) {
                element.append(
                    `\n<script>window.__INITIAL_POST__ = ${initialPostJson};</script>\n`,
                    {html: true},
                );
            },
        })
        .transform(response);
};
