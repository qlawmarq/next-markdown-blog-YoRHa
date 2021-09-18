import { GetStaticProps } from 'next'
import { MDXLayoutRenderer } from '@/lib/markdown/MDXComponents'
import { getFileBySlug } from '@/lib/markdown/mdx'
import { BlogSEO } from '@/lib/SEO'
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
