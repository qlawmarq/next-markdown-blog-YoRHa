import { GetStaticProps } from 'next'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { BlogSEO } from '@/components/SEO'
import { siteMetadata } from '@/data/siteMetadata'

export const getStaticProps: GetStaticProps = async () => {
  const authorDetails = await getFileBySlug('pages', 'about')
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <>
      <BlogSEO title={`${siteMetadata.title} - ${frontMatter.title}`} {...frontMatter} />
      <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
    </>
  )
}
