import Link from 'next/link'
import styles from 'styles/components/postCard.module.scss';
import { PostPageProps } from '../pages/blog/[slug]'
import Image from 'next/image'

interface PostProps {
    post: PostPageProps
}
export default function PostCard({ post }: PostProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <div className={styles.postCard}>
                <div className={styles.postCard__postDate}>Posted on {post.frontmatter.date}</div>
                <div className={styles.postCard__container}>

                    <div className={styles.postCard__description__container}>
                        <h3 className={styles.postCard__title}>{post.frontmatter.title}</h3>
                        <p className={styles.postCard__excerpt}>{post.frontmatter.excerpt}</p>
                    </div>

                    <Image className={styles.postCard__thumbnail}
                        src={post.frontmatter.cover_image}
                        alt={post.frontmatter.title}
                        width={160}
                        height={112}
                    />
                </div>
            </div>
        </Link>
    )
}
