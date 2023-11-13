import React, { Suspense, useMemo } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { DEFAULT_SEO } from '@/data/siteMetadata'
// import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import { BlogFrontmatter } from '@/types/blog'
import PostListingLayout from '@/components/templates/layouts/PostListingLayout'
import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { Spiner } from '@/components/molecules/Spiner'

type PropsType = {
  posts: BlogFrontmatter[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllFilesFrontMatter('blog')
  const posts = allPosts.filter((post) => !post.draft)
  return {
    props: { posts },
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
      <Suspense fallback={<Spiner />}>
        <PostListingLayout
          posts={localizedPosts}
          title={DEFAULT_SEO.defaultTitle}
          description={DEFAULT_SEO.description}
          onClickListItem={handleClick}
        />
      </Suspense>
    </>
  )
}

export default Index
