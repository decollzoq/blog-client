// 1. CSS 파일 사이드이펙트 및 모듈 import 전역 선언
declare module "*.css" {
    const content: {[className: string]: string};
    export default content;
}

// 2. 인라인 import를 사용하여 최상단 import/export 없이 순수 전역 공간 유지
interface Window {
    __INITIAL_POSTS__?: import("./post").PostSummary[];
    __INITIAL_POST_DETAIL__?: import("./post").Post;
}
