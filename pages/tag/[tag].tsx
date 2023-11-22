import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import BlogListingLayout from '@/components/templates/layouts/BlogListingLayout'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { getAllTags } from '@/lib/tags/tags'
import { BlogFrontmatter } from '@/types/blog'
import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import NotFoundLayout from '@/components/templates/layouts/NotFoundLayout'

type PropsType = {
  blogs?: BlogFrontmatter[]
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
  try {
    const allBlogs = await getAllFilesFrontMatter('blog')
    const tag = typeof params?.tag === 'string' ? params?.tag : undefined
    const filteredBlogs = tag
      ? allBlogs?.filter((blog) => !blog.draft && blog.tags?.includes(tag))
      : allBlogs.filter((blog) => !blog.draft)
    return { props: { blogs: filteredBlogs, tag: tag } }
  } catch (error) {
    return { notFound: true }
  }
}

const Tag: React.FC<PropsType> = ({ blogs, tag }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }
  const localizedBlogs = useMemo(() => {
    return blogs?.filter((blog) => blog.language == router.locale)
  }, [router.locale, blogs])
  return (
    <>
      <NextSeo title={tag} description={tag} noindex />
      {localizedBlogs && tag ? (
        <BlogListingLayout
          blogs={localizedBlogs}
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
