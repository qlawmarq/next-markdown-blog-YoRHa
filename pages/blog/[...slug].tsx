import React from 'react'
import { H1 } from '@/components/atoms/Typography'
import { MDXLayoutRenderer } from '@/lib/markdown/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/markdown/mdx'
import { BlogSEO } from '@/lib/SEO'
import { siteMetadata } from '@/data/siteMetadata'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  post: {
    mdxSource: string
    frontMatter: BlogFrontmatter
  }
  prev?: BlogFrontmatter
  next?: BlogFrontmatter
}

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}
export const getStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', params.slug?.join('/'))

  return { props: { post, prev, next } }
}

const Blog: React.FC<PropsType> = ({ post, prev, next }) => {
  const { mdxSource, frontMatter } = post
  return (
    <>
      {frontMatter.draft !== true ? (
        <>
          <BlogSEO
            title={frontMatter.title}
            description={frontMatter.description}
            date={frontMatter.date}
            url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
          />
          <MDXLayoutRenderer
            mdxSource={mdxSource}
            frontMatter={frontMatter}
            prev={prev}
            next={next}
          />
        </>
      ) : (
        <div>
          <H1>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </H1>
        </div>
      )}
    </>
  )
}
export default Blog
