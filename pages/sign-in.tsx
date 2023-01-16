import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { NextPageWithAuth } from "../helpers/generalInterfaces";
import styles from 'styles/sign-in.module.scss';


const SignIn: NextPageWithAuth = () => {
    const supabase = useSupabaseClient()
    const router = useRouter();
    const sessionContext = useSessionContext()

    useEffect(() => {
        if (!!sessionContext.session) router.push({
            pathname: '/',
        });
    }, [sessionContext])


    return (
        <div className={styles.signIn}>
            <Auth supabaseClient={supabase}
                appearance={{
                    theme: ThemeSupa,
                    className: {
                        label: styles.signIn__label,
                        anchor: styles.signIn__anchor,
                        button: styles.signIn__button,
                        message: styles.signIn__message
                    }
                }}
                providers={['google', 'github']}
                theme="dark"
                socialLayout="horizontal"
                magicLink={true}
            />
        </div>
    );
};

SignIn.auth = { authorized: false };

export default SignIn;
