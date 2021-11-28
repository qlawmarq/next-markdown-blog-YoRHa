import React from 'react'
import { useRouter } from 'next/router'
import { TagSEO } from '@/lib/SEO'
import { siteMetadata } from '@/data/siteMetadata'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import { getAllTags } from '@/lib/tags/tags'
import kebabCase from '@/lib/utils/kebabCase'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  posts: BlogFrontmatter[]
  tag: string
}

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags?.map((t) => kebabCase(t)).includes(params.tag)
  )

  return { props: { posts: filteredPosts, tag: params.tag } }
}

const Tag: React.FC<PropsType> = ({ posts, tag }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }

  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${siteMetadata.title} - ${tag}`}
        description={`${tag} tags - ${siteMetadata.title}`}
      />
      <PostListingLayout posts={posts} title={title} onClickListItem={handleClick} />
    </>
  )
}
export default Tag
