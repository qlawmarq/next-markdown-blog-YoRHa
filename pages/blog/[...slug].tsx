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
  relatedPosts?: BlogFrontmatter[]
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
  const post = await getFileBySlug('blog', params.slug?.join('/'))
  const relatedPosts = allPosts.filter((p)=>{
    let searchResult: boolean = false;
    if(p.slug === post.frontMatter.slug){
      return searchResult
    }
    p.tags?.forEach(tag => {
      post.frontMatter.tags?.forEach((pt)=>{
        if(tag == pt){
          searchResult = true
        }
      })
    });
    return searchResult
  })
  return { props: { post, relatedPosts } }
}

const Blog: React.FC<PropsType> = ({ post, relatedPosts }) => {
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
            relatedPosts={relatedPosts}
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
