import {Outlet} from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop"; // 추가
import {CategoryProvider} from "../../contexts/providers/CategoryProvider";

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
