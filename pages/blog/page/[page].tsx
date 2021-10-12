import React from 'react'
import { useRouter } from 'next/router'

import { PageSEO } from '@/lib/SEO'
import { siteMetadata } from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { POSTS_PER_PAGE } from '../../blog'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  posts: BlogFrontmatter[]
  initialDisplayPosts?: []
  pagination?: any
}

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps = async (context) => {
  const {
    params: { page },
  } = context
  const posts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

const PostPage: React.FC<PropsType> = ({ posts, initialDisplayPosts, pagination }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <PostListingLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
        onClickListItem={handleClick}
      />
    </>
  )
}
export default PostPage
