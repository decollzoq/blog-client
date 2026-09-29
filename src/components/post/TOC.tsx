import {useEffect, useState, useMemo} from "react";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TOCProps {
    content: string;
}

function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/<[^>]+>/g, "")
        .replace(/[^\w\s\-가-힣ㄱ-ㅎ]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function TOC({content}: TOCProps) {
    const [activeId, setActiveId] = useState<string>("");

    // 본문 마크다운에서 헤딩(h1, h2, h3) 추출 및 중복 넘버링
    const headings = useMemo(() => {
        const lines = content.split("\n");
        const headingList: TocItem[] = [];
        const slugCounts = new Map<string, number>();

        lines.forEach((line) => {
            const match = line.match(/^(#{1,3})\s+(.*)$/);
            if (match) {
                const level = match[1].length;
                const rawText = match[2].trim();
                const cleanText = rawText
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
                    .replace(/[#*`_~]/g, "")
                    .trim();

                const baseSlug = generateSlug(cleanText);

                if (baseSlug) {
                    let uniqueId = baseSlug;
                    const count = slugCounts.get(baseSlug) || 0;

                    if (count > 0) {
                        uniqueId = `${baseSlug}-${count}`;
                    }

                    slugCounts.set(baseSlug, count + 1);
                    headingList.push({id: uniqueId, text: cleanText, level});
                }
            }
        });

        return headingList;
    }, [content]);

    // 화면 스크롤 시 현재 보고 있는 헤딩 감지
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-80px 0px -70% 0px",
            },
        );

        headings.forEach(({id}) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    const scrollToHeading = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const headerOffset = 84;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    if (headings.length === 0) return null;

    return (
        <aside className="hidden xl:block absolute left-full ml-16 top-0 h-full">
            <nav className="sticky top-36 w-56 text-[13px] leading-snug max-h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
                {/* 테두리 선 없이 은은한 텍스트 리스트 */}
                <div className="flex flex-col space-y-2">
                    {headings.map(({id, text, level}) => {
                        const isActive = activeId === id;
                        return (
                            <button
                                key={id}
                                onClick={() => scrollToHeading(id)}
                                className={`block text-left w-full truncate transition-colors duration-150 ${
                                    level === 2
                                        ? "pl-2"
                                        : level === 3
                                          ? "pl-4 text-[12px]"
                                          : ""
                                } ${
                                    isActive
                                        ? "font-semibold text-gray-900 dark:text-gray-100"
                                        : "text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300"
                                }`}
                            >
                                {text}
                            </button>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}
