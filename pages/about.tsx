import React from 'react'
import { GetStaticProps } from 'next'
import { MDXLayoutRenderer } from '@/lib/markdown/MDXComponents'
import { getFileBySlug } from '@/lib/markdown/mdx'
import { PageSEO } from '@/lib/SEO'
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
      <PageSEO
        title={`${siteMetadata.title} - ${frontMatter.title}`}
        description={frontMatter.description}
      />
      <MDXLayoutRenderer mdxSource={mdxSource} frontMatter={frontMatter} />
    </>
  )
}
export default About
