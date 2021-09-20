import React from 'react'
import { Anchor } from '@/components/atoms/Typography'
import kebabCase from '@/lib/utils/kebabCase'
import { Badge } from '@/components/atoms/Badge'

const Tag: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Badge>
      <Anchor href={`/tags/${kebabCase(text)}`}>{text.split(' ').join('-')}</Anchor>
    </Badge>
  )
}

export default Tag
