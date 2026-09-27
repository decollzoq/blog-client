import {PostSummary, Post} from "./post";

declare global {
    interface Window {
        __INITIAL_POSTS__?: PostSummary[];
        __INITIAL__POST_DETAIL__?: Post;
    }
}

export {};
