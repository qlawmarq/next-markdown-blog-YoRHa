import React from 'react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { getAllFilesFrontMatter } from '@/lib/markdown'
import TagListingLayout from '@/components/templates/layouts/TagListingLayout'

type PropsType = {
  tags: string[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allBlogs = await getAllFilesFrontMatter('blog')
  const tags = allBlogs
    .filter((blog) => !blog.draft)
    .map((blog) => blog.tags)
    .flat()
    .filter((tags, index, self) => self.indexOf(tags) === index)
  return {
    props: { tags },
  }
}

const Index: React.FC<PropsType> = ({ tags }) => {
  return (
    <>
      <NextSeo title={'Tag'} description={'List of tag items'} />
      <TagListingLayout tags={tags} title={'Tag'} description={'List of topics'} />
    </>
  )
}

export default Index
