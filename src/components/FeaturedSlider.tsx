import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { PostSummary } from "../types/post";
import { useState } from "react";

interface FeaturedSliderProps {
    posts: PostSummary[];
}

function FeaturedSlider({ posts }: FeaturedSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 번호
    let slidePost = posts[currentSlide]; // 현재 슬라이드 게시물
    function nextCard() {
        setCurrentSlide((prev) => (prev === posts.length - 1 ? 0 : prev + 1));
    }
    function prevCard() {
        setCurrentSlide((prev) => (prev === 0 ? posts.length - 1 : prev - 1));
    }
    return (
        <div className="container max-w-full relative aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-500">
            <a href={`/posts/${slidePost.slug}`}>
                <img
                    src={slidePost.thumbnail}
                    alt={slidePost.title}
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                <div className="absolute text-gray-50 bottom-0 px-9 py-8 flex sm:flex-col gap-2 items-center sm:items-start">
                    <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-100">
                        {slidePost.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-200">
                        {new Date(slidePost.createdAt).toLocaleDateString(
                            "ko-KR",
                        )}
                    </p>
                </div>
            </a>

            {/* 슬라이더 컨트롤 */}
            <div className="absolute top-1/2 left-4">
                <button
                    onClick={() => prevCard()}
                    className="bg-gray-600/30 backdrop-blur-sm hover:bg-gray-600/60 rounded-full h-10 w-10 transition-colors"
                >
                    <IoIosArrowBack className="w-6 h-6 ml-[7px] text-gray-50" />
                </button>
            </div>
            <div className="absolute top-1/2 right-4">
                <button
                    onClick={() => nextCard()}
                    className="bg-gray-600/30  backdrop-blur-sm hover:bg-gray-600/60 rounded-full h-10 w-10 transition-colors"
                >
                    <IoIosArrowForward className="w-6 h-6 ml-[9px] text-gray-50" />
                </button>
            </div>

            {/* 인디케이터 */}
            <div className="absolute bottom-4 max-w-full container flex items-center justify-center space-x-2">
                {posts.map((p, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`hover:cursor-default ${currentSlide === idx ? "bg-gray-50 w-8" : "bg-gray-400 w-2"} h-2 rounded-xl transition-all`}
                    />
                ))}
            </div>
        </div>
    );
}

export default FeaturedSlider;
