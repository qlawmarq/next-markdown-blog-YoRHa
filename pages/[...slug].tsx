import React, { useEffect } from 'react'
import { MDXLayoutRenderer } from '@/lib/markdown/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/markdown/mdx'
import { BlogFrontmatter } from '@/types/blog'
import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

type PropsType = {
  post: {
    mdxSource: string
    frontMatter: BlogFrontmatter
  }
  relatedPosts?: BlogFrontmatter[]
}

export async function getStaticPaths() {
  const posts = getFiles('')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('')
  const post = await getFileBySlug('', (params?.slug as string[])?.join('/'))
  const relatedPosts = allPosts.filter((p) => {
    let searchResult: boolean = false
    if (p.slug === post.frontMatter.slug) {
      return searchResult
    }
    !p.draft &&
      p.tags?.forEach((tag) => {
        post.frontMatter.tags?.forEach((pt) => {
          if (tag == pt) {
            searchResult = true
          }
        })
      })
    return searchResult
  })
  return { props: { post, relatedPosts }, revalidate: 10 }
}

const Blog: React.FC<PropsType> = ({ post, relatedPosts }) => {
  const { mdxSource, frontMatter } = post
  const router = useRouter()
  useEffect(() => {
    if (frontMatter.draft) {
      router.push('/404')
    }
  }, [])
  return (
    <>
      <NextSeo title={frontMatter.title} description={frontMatter.description} />
      <MDXLayoutRenderer
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        relatedPosts={relatedPosts}
      />
    </>
  )
}
export default Blog
