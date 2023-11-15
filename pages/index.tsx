import React, { Suspense, useMemo } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { DEFAULT_SEO } from '@/data/siteMetadata'
// import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import ArticleListingLayout from '@/components/templates/layouts/ArticleListingLayout'
import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { Spiner } from '@/components/molecules/Spiner'
import { ArticleFrontmatter } from '@/types/article'

type PropsType = {
  articles: ArticleFrontmatter[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allArticles = await getAllFilesFrontMatter('article')
  const articles = allArticles.filter((article) => !article.draft)
  return {
    props: { articles },
  }
}

const Index: React.FC<PropsType> = ({ articles }) => {
  const router = useRouter()
  const localizedArticles = useMemo(() => {
    return articles.filter((article) => article.language == router.locale)
  }, [router.locale, articles])
  const handleClick = (href: string) => {
    router.push(`/article/${href}`)
  }
  return (
    <>
      <NextSeo />
      <Suspense fallback={<Spiner />}>
        <ArticleListingLayout
          articles={localizedArticles}
          title={DEFAULT_SEO.defaultTitle}
          description={DEFAULT_SEO.description}
          onClickListItem={handleClick}
        />
      </Suspense>
    </>
  )
}

export default Index
