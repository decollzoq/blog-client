export function PostDetailSkeleton() {
    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
            <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="w-3/4 h-12 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="w-1/2 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </header>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 bg-gray-200 dark:bg-gray-700"></div>

            <article className="space-y-4">
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-4/5 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </article>

            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t dark:border-gray-800">
                <div className="w-16 h-7 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="w-20 h-7 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="w-24 h-7 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
        </main>
    );
}

export function HomeLoadingSkeleton() {
    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
            <div className="mb-16">
                <div className="relative aspect-[21/9] rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="w-20 h-9 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0"
                    ></div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-4">
                        <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700"></div>
                        <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>
        </main>
    );
}
