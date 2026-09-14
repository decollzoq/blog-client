import {lazy, Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/Default";
import {PostDetailSkeleton} from "../components/LoadingSkeleton";

const PostDetails = lazy(() => import("./pages/PostDetails"));

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/posts/:slug",
                element: (
                    <Suspense fallback={<PostDetailSkeleton />}>
                        <PostDetails />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
