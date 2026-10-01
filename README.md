# SEON BLOG
> **Cloudflare Pages + D1** 기반의 [기술 블로그](https://seon-blog.pages.dev/)

## 기술 스택
- Frontend : React, TypeScript, React Router, Tailwind CSS
- Edge & Serverless : Cloudflare Pages, Cloudflare Pages Functions (`HTMLRewriter`)
- Database : Cloudflare D1 (Serverless SQLite)

## 아키텍처 오버플로우
- 기존 순수 CSR 아키텍처의 긴 네트워크 워터폴과 스켈레톤 깜빡임 문제를 해결하기 위해, Cloudflare Pages Functions 기반의 엣지 데이터 주입
- React Router State 기반 Soft Navigation 파이프라인 구축
  <img width="699" height="599" alt="스크린샷 2026-09-29 오후 8 08 43" src="https://github.com/user-attachments/assets/03ff5e3e-5571-4e95-946a-d5de3440d0e6" />

## Key Performance Optimization 

### 1. 엣지 HTML 데이터 인젝션 구축 (Cold Visit 최적화)
- **문제** : CSR 구조상 JS 번들 파싱 후 백엔드 API를 비동기 호출하느라 400~600ms 동안 회색 스켈레톤 UI 노출 및 LCP 지연 발생

- **해결** : Cloudflare Pages Functions 미들웨어와 `HTMLRewriter` 스트리밍 파서를 구축하여, 
   </br>원본 HTML이 클라이언트에 도달하기 전 `<head>` 내에 `window.__INITIAL_POSTS__` / `window.__INITIAL_POST_DETAIL__` 사전 주입

- **결과** : 클라이언트 본문 fetch 왕복을 0으로 제거하고, 스켈레톤 없이 첫 프레임부터 완성된 뷰 렌더링 (LCP 리소스 로드 대기 시간 `89%` 단축)

### 2. SPA Soft Navigatoin 즉시 렌더링 (Soft LCP 46ms 달성)
- **문제** : 홈 화면에서 상세 글 클릭 시 라우트 분리 청크(305KB) 다운로드 및 본문 API 응답 대기로 인해 약 2.2초 동안 빈 스켈레톤 응시

- **해결** 
   - 상세 라우트 번들 분할 구조 최적화로 직렬 청크 다운로드 대기 제거
   - `PostCard`에서 `React Router `state`로 요약 데이터를 전달받아 **제목, 카테고리, 썸네일, 태그` 박스를 0ms 만에 즉각 렌더링**
   - 본문 영역만 가벼운 애니메이션 후 데이터 도착 즉시 마크다운으로 부드럽게 교체

- **결과** : SPA 전환 LCP `2.22s` -> `0.046s` (97.9%) 단축, TBT `750ms` -> `70ms` (90.6%) 감소

### 3. 번들 경량화 및 중복 패칭 제거
- 무거운 마크다운 파서 의존성을 필요 시점에만 소비하도록 라우트 단위 코드 스플리팅 적용 (초기 JS 번들 `401KiB` -> `96KiB`로 75.9% 절감)
- `CategoryProvider` 전역 상태 컨텍스트 도입으로 중복 카테고리 API 호출 차단 (호출 수 3건 -> 2건 감소)
- 백엔드 `Cache-Control` 헤더를 구성하여 재방문 로딩 속도 `1.76s` -> `71ms` 로 단축

## SEON BLOG

### 메인 페이지 
- **최신 포스트 슬라이더** : 최근 작성된 주요 포스트 3편을 상단 슬라이드로 보여줍니다.
- **페이지네이션 피드** : 전체 글 목록을 페이지당 6개씩 분할 렌더링합니다.
- **상단 퀵 스크롤** : 홈 화면에서 헤더 로고나 'Home' 링크 클릭 시 최상단으로 복귀합니다. 
<img width="960" height="572" alt="화면 기록 2026-10-01 오후 7 57 53" src="https://github.com/user-attachments/assets/ea19f066-2c6e-44fd-881a-e272e3876e51" />

### 카테고리 필터
- **필터링** : 카테고리 탭 선택 시 해당 분류의 게시글 목록을 필터링합니다.
<img width="960" height="572" alt="화면 기록 2026-10-01 오후 7 57 53" src="https://github.com/user-attachments/assets/6fb2b188-98d1-4c3a-95f8-8faf30387dd1" />

### 글 상세 페이지
- **TOC** : 본문 마크다운의 헤딩을 추출하여 우측 글의 목차를 표시하고, 클릭 시 해당 목차로 이동할 수 있습니다.
- **동일 카테고리 내 글 이동** : 하단에서 동일 카테고리의 이전 글 / 다음 글로 이동할 수 있습니다.
<img width="960" height="572" alt="화면 기록 2026-10-01 오후 7 57 53" src="https://github.com/user-attachments/assets/5c7d3c4e-c77f-4872-b43b-13723d49e00e" />
<img width="960" height="572" alt="화면 기록 2026-10-01 오후 7 57 53" src="https://github.com/user-attachments/assets/56939c98-1170-4b3d-81b2-d6bccab75f50" />

### 다크모드
<img width="960" height="572" alt="화면 기록 2026-10-01 오후 8 08 05" src="https://github.com/user-attachments/assets/fab2ae9d-9ea0-48cb-b41a-2e8ca187654f" />
