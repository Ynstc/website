import Footer from "./footer";
import Navbar from "./navbar";
import styles from 'styles/components/layout.module.scss';

const Layout = ({ children }: any) => {
  return (
    <div className="text-lg text-gray-700 flex">
      <div className="mx-auto max-w-sm w-full">
        <Navbar />
        <main className={styles.main} >{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
