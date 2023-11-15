import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import ArticleListingLayout from '@/components/templates/layouts/ArticleListingLayout'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { getAllTags } from '@/lib/tags/tags'
import { ArticleFrontmatter } from '@/types/article'
import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import NotFoundLayout from '@/components/templates/layouts/NotFoundLayout'

type PropsType = {
  articles?: ArticleFrontmatter[]
  tag?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags('article')

  const localizedPaths = tags.map((tag) => ({
    params: {
      tag,
    },
    locale: 'ja',
  }))
  const originalPaths = tags.map((tag) => ({
    params: {
      tag,
    },
  }))
  const paths = [...localizedPaths, ...originalPaths]
  return {
    paths: [...paths],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allArticles = await getAllFilesFrontMatter('article')
  const tag = typeof params?.tag === 'string' ? params?.tag : undefined
  const filteredArticles = tag
    ? allArticles?.filter((article) => !article.draft && article.tags?.includes(tag))
    : allArticles.filter((article) => !article.draft)
  return { props: { articles: filteredArticles, tag: tag } }
}

const Tag: React.FC<PropsType> = ({ articles, tag }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/article/${href}`)
  }
  const localizedArticles = useMemo(() => {
    return articles?.filter((article) => article.language == router.locale)
  }, [router.locale, articles])

  useEffect(() => {
    if (!articles || !tag) {
      router.push('/404')
    }
  }, [articles, router, tag])
  return (
    <>
      <NextSeo title={tag} description={tag} noindex />
      {localizedArticles && tag ? (
        <ArticleListingLayout
          articles={localizedArticles}
          title={`Tag - ${tag.toUpperCase()}`}
          onClickListItem={handleClick}
        />
      ) : (
        <NotFoundLayout />
      )}
    </>
  )
}
export default Tag
