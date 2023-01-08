import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import { remark } from 'remark';
import { remarkExtendedTable, extendedTableHandlers } from 'remark-extended-table';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight'
import styles from '/Users/ernestkost/Desktop/projekty/moje/ernest_site/styles/slugBlog.module.scss'

export interface PostPageProps {
    frontmatter: { title: string, date: string, cover_image: string, excerpt?: string },
    slug: string,
    contentHtml: string
}

export default function PostPage({
    frontmatter: { title, date, cover_image },
    slug,
    contentHtml
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
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
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


    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkExtendedTable)
        .use(remarkRehype, null, { handlers: Object.assign({}, extendedTableHandlers) })
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(content);

    const contentHtml = processedContent.toString();

    return {
        props: {
            frontmatter,
            slug,
            contentHtml
        },
    }
}
