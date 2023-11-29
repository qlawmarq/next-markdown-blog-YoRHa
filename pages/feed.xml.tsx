import { GetServerSidePropsContext } from 'next'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { DEFAULT_SEO } from '@/constants/siteMetadata'

import RSS from 'rss'
import { BlogFrontmatter } from '@/types/blog'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  try {
    const blogs = await getAllFilesFrontMatter('blog')
    const xml = await generateFeedXml(blogs)
    res.statusCode = 200
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
    res.setHeader('Content-Type', 'text/xml')
    res.end(xml)
    return {
      props: {},
    }
  } catch (error) {
    console.error('Error in getServerSideProps', error)
    return { notFound: true }
  }
}

const Page = () => null
export default Page

const generateFeedXml = async (blogs: BlogFrontmatter[]) => {
  const feed = new RSS({
    title: DEFAULT_SEO.defaultTitle,
    description: DEFAULT_SEO.description,
    site_url: DEFAULT_SEO.canonical,
    feed_url: new URL(`/feed.xml`, DEFAULT_SEO.canonical).toString(),
  })
  blogs
    .filter((blog) => !blog.draft)
    .forEach((blog) => {
      feed.item({
        title: String(blog.title),
        description: String(blog.description),
        date: new Date(String(blog.date)).toISOString(),
        url: new URL(`/blog/${blog.slug}`, DEFAULT_SEO.canonical).toString(),
      })
    })

  return feed.xml()
}
