import React from 'react'
import { GetStaticProps } from 'next'
import { PageSEO } from '@/lib/SEO'
import { siteMetadata } from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import { BlogFrontmatter } from '@/types/blog'
import ListLayout from '@/components/templates/layouts/ListLayout'

type PropsType = {
  posts: BlogFrontmatter[]
}

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

const Index: React.FC<PropsType> = ({ posts }) => {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout posts={posts} title={siteMetadata.title} description={siteMetadata.description} />
    </>
  )
}

export default Index
