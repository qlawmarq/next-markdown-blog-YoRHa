import React from 'react'
import { Anchor } from '@/components/atoms/Anchor'
import { style } from './style'
import { Span } from '@/components/atoms/Typography'

const Tag: React.FC<{ href?: string; text: string }> = ({ href, text }) => {
  if (!href) {
    return <Span css={style}>{text}</Span>
  }
  return (
    <Span css={style}>
      <Anchor href={href}>{text}</Anchor>
    </Span>
  )
}

export default Tag
