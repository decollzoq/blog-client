import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import DefaultLayout from "./layouts/Default";
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
                element: <PostDetails />,
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
