import React, { useMemo } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import BlogListingLayout from '@/components/templates/layouts/BlogListingLayout'
import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/markdown'
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
    console.error('Error in getStaticProps', error)
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
      <NextSeo title={'Blog'} description={'List of written blog items'} />
      <BlogListingLayout blogs={localizedBlogs} title={'Blog'} onClickListItem={handleClick} />
    </>
  )
}

export default Index
