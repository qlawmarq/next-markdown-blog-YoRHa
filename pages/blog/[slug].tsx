import React, { useEffect } from 'react'
import { getAllFilesFrontMatter, getMdxFrontMatterBySlug } from '@/lib/markdown'
import { BlogFrontmatter } from '@/types/blog'
import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Blockquote, H1, H2, H3, H4, Paragraph } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { Pre } from '@/components/molecules/Pre'
import PostLayout from '@/components/templates/layouts/PostLayout'

type PropsType = {
  post?: MDXRemoteSerializeResult<Record<string, string>, BlogFrontmatter>
  relatedPosts?: BlogFrontmatter[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllFilesFrontMatter('blog')
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
  const allPosts = await getAllFilesFrontMatter('blog')
  const post = await getMdxFrontMatterBySlug('blog', params?.slug as string)
  if(!post.frontmatter){
    throw new Error(`${params?.slug}`);
  }
  const relatedPosts = allPosts?.filter((p) => {
    let isRelatedPost: boolean = false
    if (p.slug === post.frontmatter?.slug) {
      return isRelatedPost
    }
    !p.draft &&
      p.tags?.forEach((tag) => {
        p.language == post.frontmatter?.language &&
          post.frontmatter.tags?.forEach((pt) => {
            if (tag == pt) {
              isRelatedPost = true
            }
          })
      })
    return isRelatedPost
  })
  return { props: { post, relatedPosts }, revalidate: 10 }
}

const Blog: React.FC<PropsType> = ({ post, relatedPosts }) => {
  const router = useRouter()
  useEffect(() => {
    if (!post || post?.frontmatter?.draft) {
      router.push('/404')
    }
  }, [])
  if (!post || !post?.frontmatter || post?.frontmatter?.draft) {
    return null
  }
  return (
    <>
      <NextSeo title={post.frontmatter.title} description={post.frontmatter.description} />
      <PostLayout frontmatter={post.frontmatter} relatedPosts={relatedPosts}>
        <MDXRemote
          compiledSource={post.compiledSource}
          components={{
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            p: Paragraph,
            a: Anchor,
            pre: Pre,
            blockquote: Blockquote,
          }}
        />
      </PostLayout>
    </>
  )
}
export default Blog
