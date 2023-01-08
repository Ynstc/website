import { Suspense, useState } from 'react';
import Head from "next/head";
import cx from "classnames";
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from './button';
import { NavLink } from './navlink';
import styles from 'styles/components/navbar.module.scss';
import { useAppStateContext } from "../state/AppState";

const Navbar = () => {
    const { userAuthentication } = useAppStateContext();
    const [user, loading] = useAuthState(userAuthentication.auth)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const signIn = async () => {
        await userAuthentication.signIn()
        closeMenu()
    }

    const signOut = async () => {
        await userAuthentication.signOut()
    }

    const toggleMenuOpen = () => {
        setMenuOpen(!menuOpen)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <>
            <Head>
                <title>Ernest&apos;s playground</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className={styles.navbar}>
                <nav className={`${styles.navbar__bar}  ${menuOpen ? styles.open : ''}`}>
                    <div className={cx(styles.navbar__overlay, { [styles.open]: menuOpen })} onClick={toggleMenuOpen}></div>
                    <button type="button" className={styles.navbar__burger} onClick={toggleMenuOpen}>
                        <span className="material-icons">menu</span>
                    </button>
                    <h1 className={styles.navbar__title}>Do your job.</h1>
                    <nav className={cx(styles.navbar__menu, { [styles.open]: menuOpen })} >
                        <NavLink activeClassName={styles.active} href="/" onClick={closeMenu}>
                            <button className={styles.navbar__button}>Home</button>
                        </NavLink>
                        <NavLink activeClassName={styles.active} href="/blog" onClick={closeMenu}>
                            <button className={styles.navbar__button}>Blog Post</button>
                        </NavLink>
                        {user === null || user === undefined ?
                            null : (<>
                                <NavLink activeClassName={styles.active} href="/crud" onClick={closeMenu}>
                                    <button className={styles.navbar__button}>CRUD</button>
                                </NavLink>
                                <NavLink activeClassName={styles.active} href="/dashboard" onClick={closeMenu}>
                                    <button className={styles.navbar__button}>Dashboard</button>
                                </NavLink>
                            </>)
                        }
                        <Suspense fallback="Loading charts...">
                            {user
                                ? <Button onClick={signOut} className='secondary'>Sign out</Button>
                                : <Button onClick={signIn} className='primary'>Sign In</Button>
                            }
                        </Suspense>
                    </nav>
                </nav>
            </section>
        </>
    );
};

export default Navbar;
