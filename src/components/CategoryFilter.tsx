import { useCategory } from "../contexts/providers/CategoryProvider";
import { useState, useEffect } from "react";
import { Category } from "../types/category";

function CategoryFilter() {
    const { category, setCategory } = useCategory();
    const [categoryList, setCategoryList] = useState<Category[]>([]);

    const [error, setError] = useState<string | null>(null);
    async function fetchCategory() {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/categories`,
            );

            const data: Category[] = await response.json();
            setCategoryList(data);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
            console.error("===== 카테고리 데이터 로드 실패 =====", e);
        } finally {
        }
    }

    useEffect(() => {
        fetchCategory();
    }, []);
    return (
        <section className="my-12 flex space-x-3 items-center font-semibold max-w-4xl">
            {error && <p>{error}</p>}
            <button
                onClick={() => setCategory({ slug: "all", name: "All" })}
                className={`h-10 w-16 rounded-3xl 
                        ${
                            category.slug === "all"
                                ? "bg-primary text-gray-50 dark:bg-primary-dark"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                        }`}
            >
                {category.name}
            </button>
            {categoryList.length > 0 && (
                <div className="flex space-x-3">
                    {categoryList.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setCategory(c)}
                            className={`h-10 w-16 rounded-3xl
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
