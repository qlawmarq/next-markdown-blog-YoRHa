import { GetServerSidePropsContext } from 'next'
import { DEFAULT_SEO } from '@/constants/siteMetadata'

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const robotsTxt = getRobots()
  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/plain')
  res.write(robotsTxt)
  res.end()
  return {
    props: {},
  }
}

const Page = () => null
export default Page

const getRobots = () =>
  `
User-agent: *
Allow: /

Sitemap: ${new URL(`/sitemap.xml`, DEFAULT_SEO.canonical).toString()}
  `
