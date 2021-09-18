import React from 'react'
import { GetStaticProps } from 'next'
import { MDXLayoutRenderer } from '@/lib/markdown/MDXComponents'
import { getFileBySlug } from '@/lib/markdown/mdx'
import { BlogSEO } from '@/lib/SEO'
import { siteMetadata } from '@/data/siteMetadata'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  about: {
    mdxSource: string
    frontMatter: BlogFrontmatter
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const about = await getFileBySlug('pages', 'about')
  return { props: { about } }
}

const About: React.FC<PropsType> = ({ about }) => {
  const { mdxSource, frontMatter } = about

  return (
    <>
      <BlogSEO
        title={`${siteMetadata.title} - ${frontMatter.title}`}
        date={frontMatter.date}
        url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`}
      />
      <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
    </>
  )
}
export default About
