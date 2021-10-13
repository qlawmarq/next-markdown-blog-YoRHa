import { GetServerSidePropsContext } from 'next'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import { siteMetadata } from '@/data/siteMetadata'

import RSS from 'rss'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml()

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

const generateFeedXml = async () => {
  const blog = await getAllFilesFrontMatter('blog')
  const feed = new RSS({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site_url: siteMetadata.siteUrl,
    feed_url: '/rss',
    language: siteMetadata.language,
  })
  blog?.forEach((post) => {
    feed.item({
      title: String(post?.title),
      description: String(post?.description),
      date: new Date(String(post?.date)),
      url: `${siteMetadata.siteUrl}/${post?.slug}`,
    })
  })

  return feed.xml()
}
