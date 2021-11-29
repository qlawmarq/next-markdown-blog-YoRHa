import React from 'react'
import { Anchor, Paragraph } from '@/components/atoms/Typography'
import { Label } from '@/components/atoms/Label'

const Tag: React.FC<{ href?: string; text: string }> = ({ href, text }) => {
  if(!href){
    <Label>
      <Paragraph>{text}</Paragraph>
    </Label>
  }
  return (
    <Label>
      <Anchor href={href}>{text}</Anchor>
    </Label>
  )
}

export default Tag
