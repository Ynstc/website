import { useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import Head from "next/head";
import cx from "classnames";

import { NavLink } from 'components/layout/navlink';
import { Login } from 'components/layout/login'
import styles from 'styles/components/navbar.module.scss';




export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const session = useSession()

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
                <nav className={cx(styles.navbar__bar, { [styles.open]: menuOpen })}>
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

                        {session === null ?
                            null : (<>
                                <NavLink activeClassName={styles.active} href="/crud" onClick={closeMenu}>
                                    <button className={styles.navbar__button}>CRUD</button>
                                </NavLink>
                            </>)
                        }
                        <Login
                            closeMenu={closeMenu}
                        />
                    </nav>
                </nav>
            </section>
        </>
    );
};

