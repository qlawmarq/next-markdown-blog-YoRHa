import React from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { DEFAULT_SEO } from '@/data/siteMetadata'
// import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import { BlogFrontmatter } from '@/types/blog'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'

type PropsType = {
  posts: BlogFrontmatter[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllFilesFrontMatter('')
  const posts = allPosts.filter((post) => !post.draft)
  return {
    props: { posts },
    revalidate: 10,
  }
}

const Index: React.FC<PropsType> = ({ posts }) => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/${href}`)
  }
  return (
    <>
      <NextSeo />
      <PostListingLayout
        posts={posts}
        title={DEFAULT_SEO.defaultTitle}
        description={DEFAULT_SEO.description}
        onClickListItem={handleClick}
      />
    </>
  )
}

export default Index
