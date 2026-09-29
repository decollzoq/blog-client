import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router";
import {PostSummary} from "../../types/post";
import {useState} from "react";

interface FeaturedSliderProps {
    posts: PostSummary[];
}

function FeaturedSlider({posts}: FeaturedSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidePost = posts[currentSlide];

    function nextCard() {
        setCurrentSlide((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    }
    function prevCard() {
        setCurrentSlide((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
    }

    if (!slidePost) return null;

    return (
        <section
            aria-label="주요 포스트 슬라이더"
            className="container max-w-full relative h-[460px] sm:h-[480px] md:h-[280px] lg:h-[320px] rounded-3xl overflow-hidden bg-gray-50/80 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60 p-5 sm:p-6 md:p-8 transition-colors shadow-sm"
        >
            <Link
                to={`/posts/${slidePost.slug}`}
                state={{postSummary: slidePost}}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-center h-full group"
            >
                <div className="md:col-span-7 flex flex-col justify-between items-start h-full py-1 pl-9 sm:pl-11 md:pl-12 pr-0 md:pr-4 order-2 md:order-1">
                    {/* 상단: 카테고리 뱃지 */}
                    <div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark">
                            {slidePost.categoryName || "Featured"}
                        </span>
                    </div>

                    {/* 중단: 제목 영역 */}
                    <div className="w-full my-auto">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white leading-snug line-clamp-2 min-h-[3.2rem] md:min-h-[3.6rem] group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex items-center">
                            {slidePost.title}
                        </h2>
                    </div>

                    {/* 하단: 태그 및 작성일 */}
                    <div className="w-full flex flex-col gap-2">
                        <div className="h-7 overflow-hidden flex flex-wrap gap-1.5 items-center">
                            {slidePost.tags && slidePost.tags.length > 0 ? (
                                slidePost.tags.map((tag, tdx) => (
                                    <span
                                        key={tdx}
                                        className="bg-white/80 dark:bg-gray-900/60 text-gray-500 dark:text-gray-400 text-xs px-2.5 py-0.5 rounded-lg border border-gray-100 dark:border-gray-700/50 shrink-0 whitespace-nowrap"
                                    >
                                        #{tag}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-transparent select-none">
                                    #none
                                </span>
                            )}
                        </div>

                        <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-light">
                            {new Date(slidePost.createdAt).toLocaleDateString(
                                "ko-KR",
                            )}
                        </span>
                    </div>
                </div>

                {/* 우측: 썸네일 영역 (오른쪽 화살표 버튼 공간을 고려해 pr-8 sm:pr-9 md:pr-0 적용) */}
                <div className="md:col-span-5 w-full h-full flex items-center justify-center order-1 md:order-2 pr-9 sm:pr-10 md:pr-10">
                    <div className="relative w-full aspect-[16/9] max-h-full overflow-hidden rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                        <img
                            src={slidePost.thumbnail}
                            alt={slidePost.title}
                            fetchPriority="high"
                            loading="eager"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                    </div>
                </div>
            </Link>

            {/* 좌우 이동 컨트롤 버튼 */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-3 z-20">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        prevCard();
                    }}
                    aria-label="이전 슬라이드 보기"
                    className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-md rounded-full h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center transition-colors"
                >
                    <IoIosArrowBack className="w-5 h-5" />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 z-20">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        nextCard();
                    }}
                    aria-label="다음 슬라이드 보기"
                    className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-md rounded-full h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center transition-colors"
                >
                    <IoIosArrowForward className="w-5 h-5" />
                </button>
            </div>

            {/* 하단 인디케이터 */}
            <div className="absolute bottom-2 sm:bottom-3 w-full left-0 flex items-center justify-center space-x-1.5 z-20 pointer-events-auto">
                {posts.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`${idx + 1}번째 슬라이드 보기`}
                        className="py-1 px-1 flex items-center justify-center focus:outline-none"
                    >
                        <span
                            className={`block h-1.5 rounded-full transition-all duration-300 ${
                                currentSlide === idx
                                    ? "bg-primary dark:bg-primary-dark w-6"
                                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 w-1.5"
                            }`}
                        />
                    </button>
                ))}
            </div>
        </section>
    );
}

export default FeaturedSlider;
