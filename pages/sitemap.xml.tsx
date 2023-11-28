import { GetServerSidePropsContext } from 'next'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { DEFAULT_SEO } from '@/constants/siteMetadata'
import { BlogFrontmatter } from '@/types/blog'
import { menuItems } from '@/constants/menu'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const blogs = await getAllFilesFrontMatter('blog')
  const sitemap = generateSiteMap(blogs)
  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.end(sitemap)
  return {
    props: {},
  }
}

const Page = () => null
export default Page

const generateSiteMap = (blogs: BlogFrontmatter[]) => {
  let tags = blogs
    .filter((blog) => !blog.draft)
    .map((blog) => blog.tags)
    .flat()
  tags = Array.from(new Set(tags))
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
           <lastmod>${new Date(String(blog?.date))
             .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
             .replaceAll('/', '-')}</lastmod>
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
