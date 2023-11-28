import React from 'react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import TagListingLayout from '@/components/templates/layouts/TagListingLayout'
import { getAllTags } from '@/lib/tags/tags'

type PropsType = {
  tags: string[]
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const tags = await getAllTags('blog')
    return {
      props: { tags },
    }
  } catch (error) {
    console.error('Error in getStaticProps', error)
    return { notFound: true }
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
