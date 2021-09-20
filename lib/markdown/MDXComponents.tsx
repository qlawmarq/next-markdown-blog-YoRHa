import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { Anchor } from '@/components/atoms/Typography'
import Pre from './Pre'
import PostLayout from '@/components/templates/layouts/PostLayout'
import { BlogFrontmatter } from '@/types/blog'
import NextImage from 'next/image'

type PropsType = {
  mdxSource: string
  frontMatter: BlogFrontmatter
  next?: BlogFrontmatter
  prev?: BlogFrontmatter
}

const MDXComponents = {
  image: NextImage,
  a: Anchor,
  pre: Pre,
  wrapper: ({ frontMatter, next, prev, children }) => {
    return (
      <PostLayout frontMatter={frontMatter} next={next} prev={prev}>
        {children}
      </PostLayout>
    )
  },
}

export const MDXLayoutRenderer: React.FC<PropsType> = ({ mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout components={MDXComponents as any} {...rest} />
}
