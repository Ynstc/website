import type { AppProps } from "next/app";
import type { NextComponentType } from 'next'
import type { NextPage } from "next";

// component authentication properties
type PageAuth = {
    // role: string
    // loading: JSX.Element
    // unauthorized: string
    authorized: boolean
};

// component basic init properties
export type CustomAppProps = AppProps & {
    Component: NextComponentType & { auth?: PageAuth }
}

// component properties
export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
    auth: PageAuth
};
