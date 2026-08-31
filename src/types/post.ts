export interface Post {
    id: string;
    slug: string;
    thumbnail: string;
    title: string;
    createdAt: string;
    categoryName: string;
    categorySlug: string;
    tags: string[];
    content: string;
    prevPost?: PostNav | null;
    nextPost?: PostNav | null;
}

export interface PostNav {
    title: string;
    slug: string;
}

export interface PostSummary {
    id: string;
    slug: string;
    thumbnail: string;
    title: string;
    createdAt: string;
    categoryName: string;
    categorySlug: string;
    tags: string[];
}
