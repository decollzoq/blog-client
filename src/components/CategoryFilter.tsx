import {useCategory} from "../contexts/providers/CategoryProvider";

function CategoryFilter() {
    const {category, setCategory, categoryList, categoryError} = useCategory();

    return (
        <section className="my-12 flex space-x-3 items-center font-semibold max-w-4xl overflow-x-auto pb-2">
            {categoryError && <p className="text-red-500">{categoryError}</p>}

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
