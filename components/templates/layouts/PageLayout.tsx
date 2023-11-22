import React from 'react'
import { BlogLayoutStyle } from './style'
import { H1 } from '@/components/atoms/Typography'
import { BlogFrontmatter } from '@/types/blog'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs'

type PropsType = {
  frontmatter: BlogFrontmatter
  children: React.ReactNode
}

const PageLayout: React.FC<PropsType> = ({ frontmatter, children }) => {
  const { title } = frontmatter

  return (
    <div css={BlogLayoutStyle}>
      <article>
        <div className="blog_content__inner">
          <Breadcrumbs />
          <H1>{title}</H1>
          <hr />
          <div>
            <div className="blog_content__inner">{children}</div>
          </div>
        </div>
      </article>
    </div>
  )
}
export default PageLayout
