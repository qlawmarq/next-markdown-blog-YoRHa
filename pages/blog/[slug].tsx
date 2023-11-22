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
  const localizedPaths = allBlogs.map((blog) => ({
    params: { slug: blog.slug },
    locale: blog.language,
  }))
  const originalPaths = allBlogs.map((blog) => ({ params: { slug: blog.slug } }))
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
    const relatedBlogs = allBlogs?.filter((p) => {
      let isRelated: boolean = false
      if (slug == blog.frontmatter?.slug) {
        return isRelated
      }
      !p.draft &&
        p.tags?.forEach((tag) => {
          p.language == blog.frontmatter?.language &&
            blog.frontmatter.tags?.forEach((pt) => {
              if (tag == pt) {
                isRelated = true
              }
            })
        })
      return isRelated
    })
    return { props: { blog, relatedBlogs } }
  } catch (error) {
    return { notFound: true }
  }
}

const Blog: React.FC<PropsType> = ({ blog, relatedBlogs }) => {
  if (!blog || !blog?.frontmatter || blog?.frontmatter?.draft) {
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
