import React from 'react'
import { getAllFilesFrontMatter, getMdxFrontMatterBySlug } from '@/lib/markdown'
import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Blockquote, H1, H2, H3, H4, Paragraph, Code, Strong } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { Pre } from '@/components/molecules/Pre'
import BlogLayout from '@/components/templates/layouts/BlogLayout'
import { UnorderedList, OrderedList, ListItem } from '@/components/atoms/List'
import { BlogFrontmatter } from '@/types/blog'
import NotFoundLayout from '@/components/templates/layouts/NotFoundLayout'

type PropsType = {
  blog?: MDXRemoteSerializeResult<Record<string, string>, BlogFrontmatter>
  relatedBlogs?: BlogFrontmatter[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allBlogs = await getAllFilesFrontMatter('blog')
  const blogs = allBlogs.filter((blog) => !blog.draft)
  const localizedPaths = blogs.map((blog) => ({
    params: { slug: blog.slug },
    locale: blog.language,
  }))
  const originalPaths = blogs.map((blog) => ({ params: { slug: blog.slug } }))
  const paths = [...localizedPaths, ...originalPaths]
  return {
    paths: paths,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const allBlogs = await getAllFilesFrontMatter('blog')
    const slug = typeof params?.slug == 'string' ? params?.slug : undefined
    const blog = await getMdxFrontMatterBySlug('blog', params?.slug as string)
    if (!blog.frontmatter || !slug) {
      throw new Error(`Invalid ${params?.slug}`)
    }
    if (blog.frontmatter.draft) {
      return { notFound: true }
    }
    const relatedBlogs = allBlogs.filter(
      (p) =>
        p.slug !== slug &&
        !p.draft &&
        p.language === blog.frontmatter.language &&
        p.tags &&
        p.tags.some((tag) => blog.frontmatter.tags && blog.frontmatter.tags.includes(tag))
    )
    return { props: { blog, relatedBlogs } }
  } catch (error) {
    console.error('Error in getStaticProps', error)
    return { notFound: true }
  }
}

const Blog: React.FC<PropsType> = ({ blog, relatedBlogs }) => {
  if (!blog || !blog?.frontmatter) {
    return <NotFoundLayout />
  }
  return (
    <>
      <NextSeo title={blog.frontmatter.title} description={blog.frontmatter.description} />
      <BlogLayout frontmatter={blog.frontmatter} relatedBlogs={relatedBlogs}>
        <MDXRemote
          compiledSource={blog.compiledSource}
          components={{
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            p: Paragraph,
            a: Anchor,
            code: Code,
            pre: Pre,
            blockquote: Blockquote,
            li: ListItem,
            ul: UnorderedList,
            ol: OrderedList,
            strong: Strong,
          }}
        />
      </BlogLayout>
    </>
  )
}
export default Blog
