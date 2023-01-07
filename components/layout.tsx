import Footer from "./footer";
import Navbar from "./navbar";
import styles from 'styles/components/layout.module.scss';

const Layout = ({ children }: any) => {
    return (
        <div>
            <Navbar />
            <main className={styles.main__container} >{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
