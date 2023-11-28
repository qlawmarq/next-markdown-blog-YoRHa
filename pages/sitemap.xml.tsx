import { GetServerSidePropsContext } from 'next'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { DEFAULT_SEO } from '@/constants/siteMetadata'
import { BlogFrontmatter } from '@/types/blog'
import { menuItems } from '@/constants/menu'
import { getAllTags } from '@/lib/tags/tags'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  try {
    const blogs = await getAllFilesFrontMatter('blog')
    const tags = await getAllTags('blog')
    const sitemap = generateSiteMap(blogs, tags)
    res.statusCode = 200
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.end(sitemap)
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

const generateSiteMap = (blogs: BlogFrontmatter[], tags: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${menuItems
        .map((item) => {
          return `
        <url>
            <loc>${new URL(item.href, DEFAULT_SEO.openGraph.url).toString()}</loc>
        </url>
      `
        })
        .join('')}
     ${blogs
       .map((blog) => {
         return `
       <url>
           <loc>${new URL(`/blog/${blog.slug}`, DEFAULT_SEO.openGraph.url).toString()}</loc>
           <lastmod>${new Date(String(blog.date)).toISOString().slice(0, 10)}</lastmod>
       </url>
     `
       })
       .join('')}
    <url>
      <loc>${new URL(`/tag`, DEFAULT_SEO.openGraph.url).toString()}</loc>
    </url>
    ${tags
      .map((tag) => {
        return `
      <url>
          <loc>${new URL(`/blog/${tag}`, DEFAULT_SEO.openGraph.url).toString()}</loc>
      </url>
    `
      })
      .join('')}
   </urlset>
 `
}
