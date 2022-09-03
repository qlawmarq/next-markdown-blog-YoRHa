import React from 'react'
import { Anchor } from '@/components/atoms/Anchor'
import { Label } from '@/components/atoms/Typography'
import { style } from './style'

const Tag: React.FC<{ href?: string; text: string }> = ({ href, text }) => {
  return (
    <Label css={style}>
      <Anchor href={href}>{text}</Anchor>
    </Label>
  )
}

export default Tag
