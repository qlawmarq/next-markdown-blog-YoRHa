import React, { useEffect, useMemo, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { DEFAULT_SEO } from '@/data/siteMetadata'
// import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import { BlogFrontmatter } from '@/types/blog'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/markdown'

type PropsType = {
  posts: BlogFrontmatter[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllFilesFrontMatter('blog')
  const posts = allPosts.filter((post) => !post.draft)
  return {
    props: { posts },
    revalidate: 10,
  }
}

const Index: React.FC<PropsType> = ({ posts }) => {
  const router = useRouter()
  const localizedPosts = useMemo(() => {
    return posts.filter((post) => post.language == router.locale)
  }, [router.locale, posts])
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }
  return (
    <>
      <NextSeo />
      <PostListingLayout
        posts={localizedPosts}
        title={DEFAULT_SEO.defaultTitle}
        description={DEFAULT_SEO.description}
        onClickListItem={handleClick}
      />
    </>
  )
}

export default Index
