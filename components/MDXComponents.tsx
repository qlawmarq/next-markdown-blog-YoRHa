import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import PostLayout from '@/components/layouts/PostLayout'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  mdxSource: string
  frontMatter: BlogFrontmatter
  next?: BlogFrontmatter
  prev?: BlogFrontmatter
}

const MDXComponents = {
  Image,
  a: CustomLink,
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
