import React from 'react'
import { BlogLayoutStyle } from './style'
import { H1 } from '@/components/atoms/Typography'
import { BlogFrontmatter } from '@/types/blog'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs'

type PropsType = {
  frontmatter: BlogFrontmatter
  children: React.ReactNode
}

const BlogLayout: React.FC<PropsType> = ({ frontmatter, children }) => {
  const { title } = frontmatter

  return (
    <div css={BlogLayoutStyle}>
      <article>
        <div className="blog-contents">
          <Breadcrumbs />
          <H1>{title}</H1>
          {/* {date && (
            <Paragraph>
              <time dateTime={date}>{formatDateString(String(date))}</time>
            </Paragraph>
          )} */}
          <hr />
          <div>
            <div className="blog-contents">{children}</div>
          </div>
        </div>
      </article>
    </div>
  )
}
export default BlogLayout
