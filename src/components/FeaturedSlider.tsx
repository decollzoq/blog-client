import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {PostSummary} from "../types/post";
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
            className="container max-w-full relative aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
        >
            <a
                href={`/posts/${slidePost.slug}`}
                className="block w-full h-full"
            >
                <img
                    src={slidePost.thumbnail}
                    alt={slidePost.title}
                    fetchPriority="high" // LCP 로드 우선순위 최고 설정
                    loading="eager" // lazy loading 방지
                    decoding="async"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                <div className="absolute text-gray-50 bottom-0 px-6 sm:px-9 py-6 sm:py-8 flex flex-col gap-2 items-start">
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white line-clamp-2">
                        {slidePost.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-200">
                        {new Date(slidePost.createdAt).toLocaleDateString(
                            "ko-KR",
                        )}
                    </p>
                </div>
            </a>

            {/* 슬라이더 컨트롤 */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4">
                <button
                    onClick={prevCard}
                    aria-label="이전 슬라이드 보기"
                    className="bg-gray-800/40 backdrop-blur-sm hover:bg-gray-800/70 rounded-full h-10 w-10 flex items-center justify-center transition-colors"
                >
                    <IoIosArrowBack className="w-6 h-6 text-white" />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <button
                    onClick={nextCard}
                    aria-label="다음 슬라이드 보기"
                    className="bg-gray-800/40 backdrop-blur-sm hover:bg-gray-800/70 rounded-full h-10 w-10 flex items-center justify-center transition-colors"
                >
                    <IoIosArrowForward className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* 인디케이터: 터치 타깃 확보 (py-3 px-1.5로 감싸 터치 영역 확대) */}
            <div className="absolute bottom-3 w-full flex items-center justify-center space-x-1">
                {posts.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`${idx + 1}번째 슬라이드 보기`}
                        className="py-3 px-1.5 flex items-center justify-center focus:outline-none"
                    >
                        <span
                            className={`block h-2 rounded-full transition-all ${
                                currentSlide === idx
                                    ? "bg-white w-7"
                                    : "bg-white/50 hover:bg-white/80 w-2"
                            }`}
                        />
                    </button>
                ))}
            </div>
        </section>
    );
}

export default FeaturedSlider;
