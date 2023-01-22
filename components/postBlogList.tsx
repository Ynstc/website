import Link from 'next/link'
import Image from 'next/image'

import { PostPageProps } from 'pages/blog/[slug]'
import styles from 'styles/components/postItemList.module.scss';


interface PostProps {
    post: PostPageProps
}
export const PostBlogList = ({ post }: PostProps) => {
    return (
        <Link href={`/blog/${post.slug}`}>
            <div className={styles.postItemList}>
                <div className={styles.postItemList__postDate}>Posted on {post.frontmatter.date}</div>
                <div className={styles.postItemList__container}>

                    <div className={styles.postItemList__description__container}>
                        <h3 className={styles.postItemList__title}>{post.frontmatter.title}</h3>
                        <p className={styles.postItemList__excerpt}>{post.frontmatter.excerpt}</p>
                    </div>

                    <Image className={styles.postItemList__thumbnail}
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
