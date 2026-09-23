import {PostSummary} from "./post";

declare global {
    interface Window {
        __INITIAL_POST__?: PostSummary[];
    }
}

export {};
