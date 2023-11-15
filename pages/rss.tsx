import { GetServerSidePropsContext } from 'next'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { DEFAULT_SEO } from '@/data/siteMetadata'

import RSS from 'rss'
import { ArticleFrontmatter } from '@/types/article'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const articles = await getAllFilesFrontMatter('article')
  const xml = await generateFeedXml(articles)
  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)
  return {
    props: {},
  }
}

const Page = () => null
export default Page

const generateFeedXml = async (articles: ArticleFrontmatter[]) => {
  const feed = new RSS({
    title: DEFAULT_SEO.defaultTitle,
    description: DEFAULT_SEO.description,
    site_url: DEFAULT_SEO.openGraph.url,
    feed_url: '/rss',
    language: DEFAULT_SEO.openGraph.locale,
  })
  articles?.forEach((article) => {
    feed.item({
      title: String(article?.title),
      description: String(article?.description),
      date: new Date(String(article?.date)),
      url: new URL(`/article/${article?.slug}`, DEFAULT_SEO.openGraph.url).toString(),
    })
  })

  return feed.xml()
}
