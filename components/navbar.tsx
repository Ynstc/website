import Head from "next/head";
import Link from 'next/link';
import styles from 'styles/components/navbar.module.scss';
import Button from './button';

const Navbar = () => {
    return (
        <div>
            <Head>
                <title>Ernest&apos;s playground</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className={styles.navbar}>
                <ul className={styles.list}>
                    <li className={styles.list__item}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={styles.list__item}>
                        <Link href="/playground">Playground</Link>
                    </li>
                    <li className={styles.list__item}>
                        <Link href="/blog">Blog Post</Link>
                    </li>
                </ul>
                <div className="account">
                    <Button className='primary'>Sign In</Button>
                    <Button className='secondary'>Register</Button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
