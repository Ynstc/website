import "../styles/globals.scss";
import Layout from "../components/layout";
import { AppState, Provider } from '../state/AppState';
import { Auth } from '../firebase/auth';
import { CustomAppProps } from "../helpers/generalInterfaces";


const INITIAL_STATE = new AppState();

export default function MyApp({ Component, pageProps }: CustomAppProps) {

    return (
        <Provider value={INITIAL_STATE}>
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
        </Provider>
    );
}
