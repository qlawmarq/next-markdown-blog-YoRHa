import React, { useEffect } from 'react'
import { MDXLayoutRenderer } from '@/components/templates/layouts/MDXLayout'
import {
  getAllFilesFrontMatter,
  getMdxFrontMatterBySlug,
} from '@/lib/markdown'
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
  const allPosts = await getAllFilesFrontMatter('')
  const localizedPaths = allPosts.map((post) => ({
    params: { slug: post.slug },
    locale: post.language,
  }))
  const originalPaths = allPosts.map((post) => ({ params: { slug: post.slug } }))
  const paths = [...localizedPaths, ...originalPaths]
  return {
    paths: paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('')
  const post = await getMdxFrontMatterBySlug('', params?.slug as string)
  const relatedPosts = allPosts.filter((p) => {
    let searchResult: boolean = false
    if (p.slug === post.frontMatter.slug) {
      return searchResult
    }
    !p.draft &&
      p.tags?.forEach((tag) => {
        p.language == post.frontMatter.language &&
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
