import { Suspense, useState } from 'react';
import Head from "next/head";
import cx from "classnames";
import Button from '../ui/button';
import { NavLink } from './navlink';
import styles from 'styles/components/navbar.module.scss';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const supabase = useSupabaseClient()
    const session = useSession()

    const signOut = async () => {
        supabase.auth.signOut()
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
                        <Suspense fallback="Loading charts...">
                            {session
                                ? <Button onClick={signOut} className='secondary'>Sign out</Button>
                                : (
                                    <NavLink activeClassName={styles.active} href="/sign-in" onClick={closeMenu}>
                                        <Button className='primary'>Sign In</Button>
                                    </NavLink>
                                )
                                // :
                            }
                        </Suspense>
                    </nav>
                </nav>
            </section>
        </>
    );
};

export default Navbar;
