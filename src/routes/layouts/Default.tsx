import {Outlet} from "react-router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ScrollToTop from "../../components/common/ScrollToTop";
import {CategoryProvider} from "../../contexts/CategoryProvider";

export default function DefaultLayout() {
    return (
        <>
            <ScrollToTop />
            <Header />
            <CategoryProvider>
                <Outlet />
            </CategoryProvider>
            <Footer />
        </>
    );
}
