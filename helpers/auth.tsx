import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSessionContext } from '@supabase/auth-helpers-react'

import Loader from "components/ui/loader";


export const Auth = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const sessionContext = useSessionContext()

    useEffect(() => {
        if (sessionContext.isLoading === true) return
        if (!sessionContext.session) router.push({
            pathname: '/sign-in',
        });
    }, [sessionContext])

    if (sessionContext.session) {
        return children
    }

    return <Loader />
}
