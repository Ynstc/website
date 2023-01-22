import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import toast from "react-hot-toast";
import cx from "classnames";

import { NextPageWithAuth } from "helpers/generalInterfaces";
import { Avatar } from 'components/account/avatar'
import { Database } from 'helpers/database.types'
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { useAppStateContext } from 'state/AppState';
import { DefaultBacgroundAccount } from 'public/defaultBacgroundAccount'
import Loader from "components/ui/loader";
import styles from 'styles/account.module.scss';

type Profiles = Database['public']['Tables']['profiles']['Row']


const Account: NextPageWithAuth = () => {
    const supabase = useSupabaseClient<Database>()
    const user = useUser()
    const session = useSession()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState<Profiles['username']>(null)
    const [userAbout, setUserAbout] = useState<Profiles['user_about']>(null)
    const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
    const { avatarState } = useAppStateContext();

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            if (user === null) throw new Error('No user')

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, user_about, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setUserAbout(data.user_about)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            throw new Error(`Error loading user data: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({
        username,
        userAbout,
        avatar_url,
    }: {
        username: Profiles['username']
        userAbout: Profiles['user_about']
        avatar_url: Profiles['avatar_url']
    }) {
        try {
            setLoading(true)
            if (user === null) throw new Error('No user')

            const updates = {
                id: user.id,
                username,
                user_about: userAbout,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
            if (avatar_url) {
                avatarState.triggerRefresh()
                localStorage.setItem('__avatar', avatar_url);
            }

            toast.success('Profile updated!');
        } catch (error) {
            throw new Error(`Error updating the data: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {user === null || loading ? <Loader /> :
                <div className={styles.account}>
                    <DefaultBacgroundAccount className={styles.background} />
                    <Avatar
                        uid={user.id}
                        url={avatar_url}
                        onUpload={setAvatarUrl}
                    />
                    <div className={styles.input__wrapper}>
                        <Input
                            id="email"
                            type="text"
                            value={session?.user.email ?? ''}
                            isDisabled={true}
                            placeholder="Email"
                        />
                    </div>
                    <div className={styles.input__wrapper}>

                        <Input
                            id="username"
                            type="text"
                            value={username || ''}
                            placeholder={'Username'}
                            onChange={setUsername}
                        />
                    </div>
                    <textarea
                        className={styles.textarea}
                        value={userAbout || ''}
                        placeholder={'Write something about yourself'}
                        onChange={(e) => setUserAbout(e.target.value)}
                        maxLength={300}
                        rows={6}
                    />
                    <div className={styles.button__wrapper}>
                        {`${userAbout?.length ?? 0}/300`}
                        <Button
                            className={cx('secondary', styles.button__submit)}
                            onClick={() => updateProfile({ username, userAbout, avatar_url })}
                            isDisabled={loading}
                        >
                            {loading ? 'Loading ...' : 'Update'}
                        </Button>
                    </div>
                </div>}
        </>

    )
}

Account.auth = { authorized: true };

export default Account
