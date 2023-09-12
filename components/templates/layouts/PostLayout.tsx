import React from 'react'
import { PostLayoutStyle } from './style'
import { H1, Paragraph } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { Figure } from '@/components/molecules/Figure'
import { UnorderedList, ListItem } from '@/components/atoms/List'
import Tag from '@/components/molecules/Tag'
import { BlogFrontmatter } from '@/types/blog'
import formatDateString from '@/lib/utils/formatDateString'

type PropsType = {
  frontmatter: BlogFrontmatter
  relatedPosts?: BlogFrontmatter[]
  children: React.ReactNode
}

const PostLayout: React.FC<PropsType> = ({ frontmatter, relatedPosts, children }) => {
  const { date, title, tags } = frontmatter

  return (
    <div css={PostLayoutStyle}>
      <article>
        <div className="post-contents">
          <div>
            <H1>{title}</H1>
          </div>
          {date && (
            <Paragraph>
              <time dateTime={date}>{formatDateString(String(date))}</time>
            </Paragraph>
          )}
          <hr />
          <div>
            <div className="post-contents">{children}</div>
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
        {!!relatedPosts?.length && (
          <Figure figcaption={'Related Posts'}>
            <UnorderedList>
              {relatedPosts.map((rPost, idx) => (
                <ListItem key={idx}>
                  <Anchor href={`/blog/${rPost.slug}`}>
                    {rPost.title}
                  </Anchor>
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
export default PostLayout
