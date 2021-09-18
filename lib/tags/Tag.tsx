import React from 'react'
import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import { Badge } from '@/components/atoms/Badge'

const Tag: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Badge>
      <Link href={`/tags/${kebabCase(text)}`}>{text.split(' ').join('-')}</Link>
    </Badge>
  )
}

export default Tag
