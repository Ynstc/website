import { Toaster } from "react-hot-toast";

import Footer from "components/footer";
import Navbar from "components/navbar";
import styles from 'styles/components/layout.module.scss';

const Layout = ({ children }: any) => {
    return (
        <div>
            <Navbar />
            <main className={styles.main__container} >{children}</main>
            <Footer />
            <Toaster />
        </div>
    );
};

export default Layout;
