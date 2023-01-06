import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppStateContext } from "../state/AppState";

export const Auth = ({ children }: { children: JSX.Element }) => {
    const { userAuthentication } = useAppStateContext();
    const [session, loading] = useAuthState(userAuthentication.auth)

    const isUser = session !== null

    useEffect(() => {
        if (loading === true) return
        if (!isUser) userAuthentication.signIn()
    }, [isUser, loading])

    if (isUser) {
        return children
    }

    return <div>Loading...</div>
}
