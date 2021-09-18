import React from 'react'
import { GetStaticProps } from 'next'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import { siteMetadata } from '@/data/siteMetadata'
import ListLayout from '@/components/templates/layouts/ListLayout'
import { PageSEO } from '@/lib/SEO'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  posts: BlogFrontmatter[]
  initialDisplayPosts?: []
  pagination?: any
}

export const POSTS_PER_PAGE = 5

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

const Blog: React.FC<PropsType> = ({ posts, initialDisplayPosts, pagination }) => {
  return (
    <>
      <PageSEO title={`${siteMetadata.title} - Blog`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
export default Blog
