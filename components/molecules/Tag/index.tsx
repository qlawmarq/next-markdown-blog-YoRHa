import React from 'react'
import { Anchor } from '@/components/atoms/Anchor'
import { Label } from '@/components/atoms/Label'

const Tag: React.FC<{ href?: string; text: string }> = ({ href, text }) => {
  return (
    <Label>
      <Anchor href={href}>{text}</Anchor>
    </Label>
  )
}

export default Tag
