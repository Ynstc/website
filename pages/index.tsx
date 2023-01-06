import { NextPageWithAuth } from "../helpers/generalInterfaces";
import styles from '../styles/Index.module.scss';



const Home: NextPageWithAuth = () => {

    return (
        <div className={styles.wrapper}>
            <h1>Hello wanderer!</h1>
            <p className={styles.description}>Welcome to my little playground world. I have created this website just for fun.
                Maybe one day I will have inspiration to create post or add sepparate application
                in new tab who knows.</p>
            <p className={styles.description}>Sign in and registration are only for checking purpose I will not send you data to any third party.</p>
        </div>
    );
};

Home.auth = {auth: false};

export default Home;
