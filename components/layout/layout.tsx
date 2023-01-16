import { Toaster } from "react-hot-toast";

import Footer from "components/layout/footer";
import Navbar from "components/layout/navbar";
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
