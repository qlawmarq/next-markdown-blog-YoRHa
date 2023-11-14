import React from 'react'
import { Anchor } from '@/components/atoms/Anchor'
import { style } from './style'

const Tag: React.FC<{ href?: string; text: string }> = ({ href, text }) => {
  if (!href) {
    return <span css={style}>{text}</span>
  }
  return (
    <span css={style}>
      <Anchor href={href}>{text}</Anchor>
    </span>
  )
}

export default Tag
