import React from 'react'
import { getMdxFrontMatterBySlug } from '@/lib/markdown'
import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Blockquote, H1, H2, H3, H4, Paragraph, Code, Strong } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { Pre } from '@/components/molecules/Pre'
import PageLayout from '@/components/templates/layouts/PageLayout'
import { UnorderedList, OrderedList, ListItem } from '@/components/atoms/List'
import { BlogFrontmatter } from '@/types/blog'
import NotFoundLayout from '@/components/templates/layouts/NotFoundLayout'

type PropsType = {
  blog?: MDXRemoteSerializeResult<Record<string, string>, BlogFrontmatter>
  relatedBlogs?: BlogFrontmatter[]
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { notFound: true }
  }
  try {
    const blog = await getMdxFrontMatterBySlug('about', locale)
    if (blog.frontmatter.draft) {
      return { notFound: true }
    }
    return { props: { blog } }
  } catch (error) {
    return { notFound: true }
  }
}

const Blog: React.FC<PropsType> = ({ blog }) => {
  if (!blog || !blog?.frontmatter || blog?.frontmatter?.draft) {
    return <NotFoundLayout />
  }
  return (
    <>
      <NextSeo title={blog.frontmatter.title} description={blog.frontmatter.description} />
      <PageLayout frontmatter={blog.frontmatter}>
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
      </PageLayout>
    </>
  )
}
export default Blog
