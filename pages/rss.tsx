import { GetServerSidePropsContext, GetStaticProps } from 'next'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { DEFAULT_SEO } from '@/data/siteMetadata'

import RSS from 'rss'
import { BlogFrontmatter } from '@/types/blog'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const posts = await getAllFilesFrontMatter('')
  const xml = await generateFeedXml(posts)
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

const generateFeedXml = async (posts: BlogFrontmatter[]) => {
  const feed = new RSS({
    title: DEFAULT_SEO.defaultTitle,
    description: DEFAULT_SEO.description,
    site_url: DEFAULT_SEO.openGraph.url,
    feed_url: '/rss',
    language: DEFAULT_SEO.openGraph.locale,
  })
  posts?.forEach((post) => {
    feed.item({
      title: String(post?.title),
      description: String(post?.description),
      date: new Date(String(post?.date)),
      url: `${DEFAULT_SEO.openGraph.url}/${post?.slug}`,
    })
  })

  return feed.xml()
}
