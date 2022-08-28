import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { getAllTags } from '@/lib/tags/tags'
import { BlogFrontmatter } from '@/types/blog'
import { NextSeo } from 'next-seo'
import kebabCase from '@/lib/utils/kebabCase'
import { GetStaticProps } from 'next'

type PropsType = {
  posts: BlogFrontmatter[]
  tag: string
}

export async function getStaticPaths() {
  const tags = await getAllTags('blog')
  return {
    paths: tags.map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts?.filter(
    (post) => !post.draft && post.tags?.map((t) => kebabCase(t)).includes(params?.tag as string)
  )

  return { props: { posts: filteredPosts, tag: params?.tag }, revalidate: 10 }
}

const Tag: React.FC<PropsType> = ({ posts, tag }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }
  const localizedPosts = useMemo(() => {
    return posts.filter((post) => post.language == router.locale)
  }, [router.locale, posts])

  return (
    <>
      <NextSeo title={tag} description={tag} noindex />
      <PostListingLayout posts={localizedPosts} title={`Tag - ${tag}`} onClickListItem={handleClick} />
    </>
  )
}
export default Tag
