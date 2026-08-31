interface TagListProps {
    tags: string[];
}
function PostTagList({ tags }: TagListProps) {
    return (
        <div className="border-t-gray-200 dark:border-t-gray-600 pt-8 space-x-2 border-t-[1px]">
            {tags.map((tag, tdx) => (
                <span
                    key={tdx}
                    className="bg-gray-50 rounded-2xl text-sm text-gray-400 dark:text-gray-300 dark:bg-gray-800 font-normal px-4 py-2"
                >
                    # {tag}
                </span>
            ))}
        </div>
    );
}

export default PostTagList;
