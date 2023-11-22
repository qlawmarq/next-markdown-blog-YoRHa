import React, { useEffect } from 'react'
import Tag from '@/components/molecules/Tag'
import { useState } from 'react'
import { Card } from '@/components/molecules/Card'
import formatDateString from '@/lib/utils/formatDateString'
import { H1, H2, Paragraph } from '@/components/atoms/Typography'
// import { Anchor } from '@/components/atoms/Anchor'
import { Input } from '@/components/atoms/Input'
import { ListLayoutStyle } from './style'
import { Select } from '@/components/atoms/Select'
import { useRouter } from 'next/router'
import { BlogFrontmatter } from '@/types/blog'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs'
import { Figure } from '@/components/molecules/Figure'

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
