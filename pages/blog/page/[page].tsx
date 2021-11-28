import React from 'react'
import { useRouter } from 'next/router'

import { PageSEO } from '@/lib/SEO'
import { siteMetadata } from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  posts: BlogFrontmatter[]
}

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = totalPosts.length
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

  return {
    props: {
      posts,
    },
  }
}

const PostPage: React.FC<PropsType> = ({ posts }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <PostListingLayout
        posts={posts}
        title="All Posts"
        onClickListItem={handleClick}
      />
    </>
  )
}
export default PostPage
