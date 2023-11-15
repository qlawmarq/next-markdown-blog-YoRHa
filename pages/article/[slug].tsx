import React, { Suspense, useEffect } from 'react'
import { getAllFilesFrontMatter, getMdxFrontMatterBySlug } from '@/lib/markdown'
import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Blockquote, H1, H2, H3, H4, Paragraph, Code, Strong } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { Pre } from '@/components/molecules/Pre'
import ArticleLayout from '@/components/templates/layouts/ArticleLayout'
import { UnorderedList, OrderedList, ListItem } from '@/components/atoms/List'
import { Spiner } from '@/components/molecules/Spiner'
import { ArticleFrontmatter } from '@/types/article'

type PropsType = {
  article?: MDXRemoteSerializeResult<Record<string, string>, ArticleFrontmatter>
  relatedArticles?: ArticleFrontmatter[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allArticles = await getAllFilesFrontMatter('article')
  const localizedPaths = allArticles.map((article) => ({
    params: { slug: article.slug },
    locale: article.language,
  }))
  const originalPaths = allArticles.map((article) => ({ params: { slug: article.slug } }))
  const paths = [...localizedPaths, ...originalPaths]
  return {
    paths: paths,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allArticles = await getAllFilesFrontMatter('article')
  const slug = typeof params?.slug == 'string' ? params?.slug : undefined
  const article = await getMdxFrontMatterBySlug('article', params?.slug as string)

  if (!article.frontmatter || !slug) {
    throw new Error(`Invalid ${params?.slug}`)
  }
  const relatedArticles = allArticles?.filter((p) => {
    let isRelated: boolean = false
    if (slug == article.frontmatter?.slug) {
      return isRelated
    }
    !p.draft &&
      p.tags?.forEach((tag) => {
        p.language == article.frontmatter?.language &&
          article.frontmatter.tags?.forEach((pt) => {
            if (tag == pt) {
              isRelated = true
            }
          })
      })
    return isRelated
  })
  return { props: { article, relatedArticles } }
}

const Blog: React.FC<PropsType> = ({ article, relatedArticles }) => {
  const router = useRouter()
  useEffect(() => {
    if (!article || article?.frontmatter?.draft) {
      router.push('/404')
    }
  }, [article, router])
  if (!article || !article?.frontmatter || article?.frontmatter?.draft) {
    return null
  }
  return (
    <>
      <NextSeo title={article.frontmatter.title} description={article.frontmatter.description} />
      <Suspense fallback={<Spiner />}>
        <ArticleLayout frontmatter={article.frontmatter} relatedArticles={relatedArticles}>
          <MDXRemote
            compiledSource={article.compiledSource}
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
        </ArticleLayout>
      </Suspense>
    </>
  )
}
export default Blog
