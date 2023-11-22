import React from 'react'
import Tag from '@/components/molecules/Tag'
import { H1, Paragraph } from '@/components/atoms/Typography'
import { ListLayoutStyle } from './style'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs'

type PropsType = {
  tags: string[]
  title: string
  description?: string
}

const TagListingLayout: React.FC<PropsType> = ({ tags, title, description }) => {
  return (
    <div css={ListLayoutStyle}>
      <Breadcrumbs />
      <H1>{title}</H1>
      <Paragraph>{description}</Paragraph>
      <div>
        {tags.map((tag) => (
          <Tag key={tag} href={`/tag/${tag}`} text={tag} />
        ))}
      </div>
    </div>
  )
}

export default TagListingLayout
