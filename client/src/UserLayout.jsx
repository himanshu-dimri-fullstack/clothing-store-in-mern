import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <>
            <Navbar />
            <ScrollToTop />

            <Outlet />

            <Footer />
        </>
    );
};

export default UserLayout;