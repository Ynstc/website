import { useState, useEffect } from 'react';
import { useUser, useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from "react-hot-toast";
import Image from 'next/image';


import { Button } from 'components/ui/button';
import { Database } from 'helpers/database.types';
import { NavLink } from 'components/layout/navlink';
import { useAppStateContext } from 'state/AppState';
import styles from 'styles/components/navbar.module.scss';

type Profiles = Database['public']['Tables']['profiles']['Row']

interface PropsType {
    closeMenu: () => void;
}

export const Login = ({ closeMenu }: PropsType) => {
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
    const supabase = useSupabaseClient()
    const session = useSession()
    const user = useUser()
    const { avatarState } = useAppStateContext();

    useEffect(() => {
        const localAvatar = localStorage.getItem('__avatar')
        if (localAvatar) {
            downloadImage(localAvatar)
        } else {
            getProfile()
        }
    }, [session, avatarState.refreshCounter])

    const signOut = async () => {
        supabase.auth.signOut()
    }

    async function getProfile() {
        try {
            if (user !== null) {
                let { data, error, status } = await supabase
                    .from('profiles')
                    .select(`avatar_url`)
                    .eq('id', user.id)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    localStorage.setItem('__avatar', data.avatar_url);
                    downloadImage(data.avatar_url)
                }
            }
        } catch (error) {
            throw new Error(`Error loading user data: ${error}`)
        }
    }

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
        } catch (error) {
            toast.error('Error downloading image');
            throw new Error(`Error downloading image: ${error}`)
        }
    }

    return (
        <>
            {session && avatarUrl
                ? <>
                    <Button onClick={signOut} className='primary'>Sign out</Button>
                    <NavLink activeClassName={styles.active} href="/account" onClick={closeMenu}>
                        <Image
                            src={avatarUrl}
                            className={styles.login__avatar}
                            alt="Avatar"
                            width={20}
                            height={20}
                        />
                    </NavLink>
                </>
                : (
                    <NavLink activeClassName={styles.active} href="/sign-in" onClick={closeMenu}>
                        <Button className='primary'>Sign In</Button>
                    </NavLink>
                )
                // :
            }
        </>
    )
}
