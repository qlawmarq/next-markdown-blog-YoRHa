import React from 'react'
import { Anchor } from '@/components/atoms/Typography'
import kebabCase from '@/lib/utils/kebabCase'
import { Label } from '@/components/atoms/Label'

const Tag: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Label>
      <Anchor href={`/tags/${kebabCase(text)}`}>{text.split(' ').join('-')}</Anchor>
    </Label>
  )
}

export default Tag
