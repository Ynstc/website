import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import styles from '/Users/ernestkost/Desktop/projekty/moje/ernest_site/styles/components/slugBlog.module.scss'
import Image from 'next/image'

export interface PostPageProps {
    frontmatter: { title: string, date: string, cover_image: string, excerpt?: string },
    slug: string,
    content: string,

}

export default function PostPage({
    frontmatter: { title, date, cover_image },
    slug,
    content,
}: PostPageProps) {
    return (
        <>
            <div>
                <span>Posted on {date}</span>
                <h1>{title}</h1>
                <div>

                <Image className={styles.slugpost__thumbnail}
                        src={cover_image}
                        alt={title}
                        width={828}
                        height={460}
                    />
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>
            </div>
        </>
    )
}

PostPage.auth = { authorized: false };

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

interface GetStaticPropsType {
    params: {
        slug: string
    }
}

export async function getStaticProps({ params: { slug } }: GetStaticPropsType) {
    const markdownWithMeta = fs.readFileSync(
        path.join('posts', slug + '.md'),
        'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }
}
