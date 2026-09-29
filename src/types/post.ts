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

export type PostNav = PostSummary;

export interface Post extends PostSummary {
    content: string;
    prevPost?: PostNav | null;
    nextPost?: PostNav | null;
}
