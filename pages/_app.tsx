import "../styles/globals.scss";
import Layout from "../components/layout";
import { AppState, Provider } from '../state/AppState';
import { Auth } from '../helpers/auth';
import { CustomAppProps } from "../helpers/generalInterfaces";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

const INITIAL_STATE = new AppState();

export default function MyApp({ Component, pageProps }: CustomAppProps) {
    // Create a new supabase browser client on every first render.
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())

    return (
        <Provider value={INITIAL_STATE}>
            <SessionContextProvider
                supabaseClient={supabaseClient}
                initialSession={pageProps.initialSession}
            >
                {Component.auth?.authorized === true ? (
                    <Auth>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </Auth>
                ) : (
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                )}
            </SessionContextProvider>
        </Provider>
    );
}
