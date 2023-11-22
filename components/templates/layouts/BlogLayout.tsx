import React from 'react'
import { BlogLayoutStyle } from './style'
import { H1, Paragraph } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { Figure } from '@/components/molecules/Figure'
import { UnorderedList, ListItem } from '@/components/atoms/List'
import Tag from '@/components/molecules/Tag'
import { BlogFrontmatter } from '@/types/blog'
import formatDateString from '@/lib/utils/formatDateString'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs'

type PropsType = {
  frontmatter: BlogFrontmatter
  relatedBlogs?: BlogFrontmatter[]
  children: React.ReactNode
}

const BlogLayout: React.FC<PropsType> = ({ frontmatter, relatedBlogs, children }) => {
  const { date, title, tags } = frontmatter

  return (
    <div css={BlogLayoutStyle}>
      <article>
        <div className="blog-contents">
          <Breadcrumbs />
          <H1>{title}</H1>
          {date && (
            <Paragraph>
              <time dateTime={date}>{formatDateString(String(date))}</time>
            </Paragraph>
          )}
          <hr />
          <div>
            <div className="blog-contents">{children}</div>
          </div>
        </div>
      </article>
      <aside>
        {!!tags?.length && (
          <Figure figcaption={'Tags'}>
            <div>
              {tags.map((tag) => (
                <Tag key={tag} href={`/tag/${tag}`} text={tag} />
              ))}
            </div>
          </Figure>
        )}
        {!!relatedBlogs?.length && (
          <Figure figcaption={'Related Blogs'}>
            <UnorderedList>
              {relatedBlogs.map((rBlog, idx) => (
                <ListItem key={idx}>
                  <Anchor href={`/blog/${rBlog.slug}`}>{rBlog.title}</Anchor>
                </ListItem>
              ))}
            </UnorderedList>
          </Figure>
        )}
        <div>
          <Anchor href="/">&larr; Back to the Home</Anchor>
        </div>
      </aside>
    </div>
  )
}
export default BlogLayout
