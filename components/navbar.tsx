import { Suspense } from 'react';
import Head from "next/head";
import Link from 'next/link';
import styles from 'styles/components/navbar.module.scss';
import Button from './button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
import { useAppStateContext } from "../state/AppState";

const Navbar = () => {
    const { userAuthentication } = useAppStateContext();
    const [user, loading] = useAuthState(userAuthentication.auth)
    const router = useRouter()

    const signIn = async () => {
        await userAuthentication.signIn()
    }

    const signOut = async () => {
        await userAuthentication.signOut()
    }

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
                    <li className={styles.list__item}>
                        <Link href="/crud">CRUD</Link>
                    </li>
                </ul>
                <div className="account">
                    <Suspense fallback="Loading charts...">
                        <Link href="/dashboard">
                            {user
                                ? <Button onClick={signOut} className='secondary'>Sign out</Button>
                                : <Button onClick={signIn} className='primary'>Sign In</Button>
                            }
                        </Link>
                    </Suspense>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;
