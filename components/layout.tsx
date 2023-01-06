import Footer from "./footer";
import Navbar from "./navbar";
import styles from 'styles/components/layout.module.scss';

const Layout = ({ children }: any) => {
    return (
        <div>
            <div>
                <Navbar />
                <main className={styles.main} >{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
