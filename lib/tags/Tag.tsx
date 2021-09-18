import React from 'react'
import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag: React.FC<{ text: string }> = ({ text }) => {
  return <Link href={`/tags/${kebabCase(text)}`}>{text.split(' ').join('-')}</Link>
}

export default Tag
