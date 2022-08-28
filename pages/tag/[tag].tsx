import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { getAllTags } from '@/lib/tags/tags'
import { BlogFrontmatter } from '@/types/blog'
import { NextSeo } from 'next-seo'
import kebabCase from '@/lib/utils/kebabCase'
import { GetStaticPaths, GetStaticProps } from 'next'

type PropsType = {
  posts?: BlogFrontmatter[]
  tag?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags('')
  const originalPaths = tags.map((tag) => ({
    params: {
      tag,
    },
  }))
  return {
    paths: [...originalPaths],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('')
  const filteredPosts = allPosts?.filter(
    (post) => !post.draft && post.tags?.map((t) => kebabCase(t)).includes(params?.tag as string)
  )

  return { props: { posts: filteredPosts, tag: params?.tag }, revalidate: 10 }
}

const Tag: React.FC<PropsType> = ({ posts, tag }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/${href}`)
  }
  const localizedPosts = useMemo(() => {
    return posts?.filter((post) => post.language == router.locale)
  }, [router.locale, posts])

  // Capitalize first letter and convert space to dash
  const title = tag ? tag.toUpperCase() + tag.split(' ').join('-').slice(1) : ''
  return (
    <>
      <NextSeo title={tag} description={tag} noindex />
      <PostListingLayout posts={localizedPosts} title={title} onClickListItem={handleClick} />
    </>
  )
}
export default Tag
