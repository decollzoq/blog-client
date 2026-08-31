import {useCategory} from "../contexts/providers/CategoryProvider";
import {useState, useEffect} from "react";
import {Category} from "../types/category";

function CategoryFilter() {
    const {category, setCategory} = useCategory();
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function fetchCategory() {
        try {
            const BASE_URL = process.env.REACT_APP_SERVER_URL;
            const response = await fetch(`${BASE_URL}/api/categories`);
            const res = await response.json();

            // { success: true, data: [...] } 포맷 대응
            const rawCategories = res.data || (Array.isArray(res) ? res : []);
            setCategoryList(rawCategories);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            console.error("===== 카테고리 데이터 로드 실패 =====", e);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <section className="my-12 flex space-x-3 items-center font-semibold max-w-4xl overflow-x-auto pb-2">
            {error && <p className="text-red-500">{error}</p>}

            {/* All 기본 버튼 */}
            <button
                onClick={() => setCategory({slug: "all", name: "All"})}
                className={`h-10 px-4 rounded-3xl shrink-0 transition-colors
                        ${
                            category.slug === "all"
                                ? "bg-primary text-gray-50 dark:bg-primary-dark"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        }`}
            >
                All
            </button>

            {/* 동적 카테고리 버튼 목록 */}
            {categoryList.length > 0 && (
                <div className="flex space-x-3 shrink-0">
                    {categoryList.map((c) => (
                        <button
                            key={c.slug}
                            onClick={() => setCategory(c)}
                            className={`h-10 px-4 rounded-3xl transition-colors
                        ${
                            category.slug === c.slug
                                ? "bg-primary text-gray-50 dark:bg-primary-dark"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        }`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}

export default CategoryFilter;
