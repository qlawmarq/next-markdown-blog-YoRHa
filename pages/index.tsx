import React from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { PageSEO } from '@/lib/SEO'
import { siteMetadata } from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import { BlogFrontmatter } from '@/types/blog'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'

type PropsType = {
  posts: BlogFrontmatter[]
}

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

const Index: React.FC<PropsType> = ({ posts }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <PostListingLayout
        posts={posts}
        title={siteMetadata.title}
        description={siteMetadata.description}
        onClickListItem={handleClick}
      />
    </>
  )
}

export default Index
