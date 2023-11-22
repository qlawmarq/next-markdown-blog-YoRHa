import React, { Suspense, useMemo } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { DEFAULT_SEO } from 'constants/siteMetadata'
// import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import BlogListingLayout from '@/components/templates/layouts/BlogListingLayout'
import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { Spinner } from '@/components/molecules/Spinner'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  blogs: BlogFrontmatter[]
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allBlogs = await getAllFilesFrontMatter('blog')
    const blogs = allBlogs.filter((blog) => !blog.draft)
    return {
      props: { blogs },
    }
  } catch (error) {
    return { notFound: true }
  }
}

const Index: React.FC<PropsType> = ({ blogs }) => {
  const router = useRouter()
  const localizedBlogs = useMemo(() => {
    return blogs.filter((blog) => blog.language == router.locale)
  }, [router.locale, blogs])
  const handleClick = (href: string) => {
    router.push(`/blog/${href}`)
  }
  return (
    <>
      <NextSeo />
      <Suspense fallback={<Spinner />}>
        <BlogListingLayout
          blogs={localizedBlogs}
          title={DEFAULT_SEO.defaultTitle}
          description={DEFAULT_SEO.description}
          onClickListItem={handleClick}
        />
      </Suspense>
    </>
  )
}

export default Index
