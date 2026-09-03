import {Outlet} from "react-router";
import {ScrollRestoration} from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {CategoryProvider} from "../../contexts/providers/CategoryProvider";

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
