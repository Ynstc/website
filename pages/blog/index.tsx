import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import PostItemList from '../../components/postItemList'
import { sortByDate } from '../../helpers'
import { PostPageProps } from './[slug]'

interface BlogProps {
    posts: Array<PostPageProps>
}

export default function Blog({ posts }: BlogProps) {
    return (
        <div>
            <Head>
                <title>Dev Blog</title>
            </Head>

            <div className='posts'>
                {posts.map((post, index) => (
                    <PostItemList key={index} post={post} />
                ))}
            </div>
        </div>
    )
}

Blog.auth = { authorized: false };

export async function getStaticProps() {
    // Get files from the posts dir
    const files = fs.readdirSync(path.join('posts'))

    // Get slug and frontmatter from posts
    const posts = files.map((filename) => {
        // Create slug
        const slug = filename.replace('.md', '')

        // Get frontmatter
        const markdownWithMeta = fs.readFileSync(
            path.join('posts', filename),
            'utf-8'
        )

        const { data: frontmatter } = matter(markdownWithMeta)

        return {
            slug,
            frontmatter,
        }
    })

    return {
        props: {
            posts: posts.sort(sortByDate),
        },
    }
}

