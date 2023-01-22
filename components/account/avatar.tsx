import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { AiOutlineUser } from 'react-icons/ai';
import toast from "react-hot-toast";
import Image from 'next/image';

import { Database } from 'helpers/database.types'
import Loader from 'components/ui/loader';
import styles from 'styles/components/avatar.module.scss'

type Profiles = Database['public']['Tables']['profiles']['Row']

interface PropsType {
    uid: string
    url: Profiles['avatar_url']
    onUpload: (url: string) => void
}

export const Avatar = ({ uid, url, onUpload }: PropsType) => {
    const supabase = useSupabaseClient<Database>()
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

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

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                toast.error('You must select an image to upload.');
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${uid}.${fileExt}`
            const filePath = `${fileName}`

            onUpload(filePath)
        } catch (error) {

            toast.error('Error uploading avatar!');
            throw new Error(`Error uploading avatar: ${error}`)
        } finally {

            setUploading(false)
        }
    }

    return (

        <div className={styles.avatar}>
            <label className={styles.avatar__container} htmlFor="single">
                {avatarUrl ? (
                    uploading ? <Loader size='small' /> :
                        <Image
                            className={styles.profile}
                            src={avatarUrl}
                            alt="Avatar"
                            width={120}
                            height={120}
                        />
                ) : (
                    <AiOutlineUser className={styles.default__profile} />
                )}
            </label>
            <input
                className={styles.avatar__input}
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
            />
        </div>
    )
}
