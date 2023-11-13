import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { getAllTags } from '@/lib/tags/tags'
import { BlogFrontmatter } from '@/types/blog'
import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import NotFoundLayout from '@/components/templates/layouts/NotFoundLayout'

type PropsType = {
  posts?: BlogFrontmatter[]
  tag?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllTags('blog')

  const localizedPaths = tags.map((tag) => ({
    params: {
      tag,
    },
    locale: 'ja',
  }))
  const originalPaths = tags.map((tag) => ({
    params: {
      tag,
    },
  }))
  const paths = [...localizedPaths, ...originalPaths]
  return {
    paths: [...paths],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('blog')
  const tag = typeof params?.tag === 'string' ? params?.tag : undefined
  const filteredPosts = tag
    ? allPosts?.filter((post) => !post.draft && post.tags?.includes(tag))
    : allPosts.filter((post) => !post.draft)
  return { props: { posts: filteredPosts, tag: tag } }
}

const Tag: React.FC<PropsType> = ({ posts, tag }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }
  const localizedPosts = useMemo(() => {
    return posts?.filter((post) => post.language == router.locale)
  }, [router.locale, posts])

  useEffect(() => {
    if (!posts || !tag) {
      router.push('/404')
    }
  }, [posts, router, tag])
  return (
    <>
      <NextSeo title={tag} description={tag} noindex />
      {localizedPosts && tag ? (
        <PostListingLayout
          posts={localizedPosts}
          title={`Tag - ${tag.toUpperCase()}`}
          onClickListItem={handleClick}
        />
      ) : (
        <NotFoundLayout />
      )}
    </>
  )
}
export default Tag
