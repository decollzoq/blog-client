import {PostSummary} from "./post";

declare global {
    interface Window {
        __INITIAL_POSTS__?: PostSummary[];
    }
}

export {};
