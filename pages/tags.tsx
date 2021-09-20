import React from 'react'
import { GetStaticProps } from 'next'
import { PageSEO } from '@/lib/SEO'
import Tag from '@/lib/tags/Tag'
import { siteMetadata } from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags/tags'
import { H1 } from '@/components/atoms/Typography'

type PropsType = {
  tags: {}
}

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getAllTags('blog')
  return { props: { tags } }
}

const Tags: React.FC<PropsType> = ({ tags }) => {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title={`${siteMetadata.title} - Tags`} description="Things I blog about" />
      <div>
        <div>
          <H1>Tags</H1>
        </div>
        <div>
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t}>
                <Tag text={`${t} (${tags[t]})`} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
export default Tags
