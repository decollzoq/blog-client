import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CategoryProvider } from "../../contexts/providers/CategoryProvider";
import { Suspense } from "react";
import DefferedComponent from "../../components/DefferedComponent";
import Home from "../pages/Home";
import PostDetails from "../pages/PostDetails";

import {
    HomeLoadingSkeleton,
    PostDetailSkeleton,
} from "../../components/LoadingSkeleton";
export default function DefaultLayout() {
    return (
        <>
            <Header />
            <CategoryProvider>
                <Outlet />
            </CategoryProvider>
            <ScrollRestoration />
            <Footer />
        </>
    );
}

<Suspense
    fallback={
        <DefferedComponent>
            <HomeLoadingSkeleton />
        </DefferedComponent>
    }
>
    <Home />
</Suspense>;

<Suspense
    fallback={
        <DefferedComponent>
            <PostDetailSkeleton />
        </DefferedComponent>
    }
>
    <PostDetails />
</Suspense>;
