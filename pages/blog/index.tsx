import React, { Suspense, useMemo } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import BlogListingLayout from '@/components/templates/layouts/BlogListingLayout'
import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import { Spiner } from '@/components/molecules/Spiner'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  blogs: BlogFrontmatter[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allBlogs = await getAllFilesFrontMatter('blog')
  const blogs = allBlogs.filter((blog) => !blog.draft)
  return {
    props: { blogs },
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
      <Suspense fallback={<Spiner />}>
        <BlogListingLayout blogs={localizedBlogs} title={'Blogs'} onClickListItem={handleClick} />
      </Suspense>
    </>
  )
}

export default Index
