import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.scss";
import Layout from "../components/layout";
import { AppState, Provider } from '../state/AppState';
import { Auth } from '../helpers/auth';
import { CustomAppProps } from "../helpers/generalInterfaces";

const INITIAL_STATE = new AppState();

export default function MyApp({ Component, pageProps }: CustomAppProps) {
    // Create a new supabase browser client on every first render.
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())

    const queryClient = new QueryClient();

    return (
        <Provider value={INITIAL_STATE}>
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
        </Provider>
    );
}
