import React from 'react'
import { PostLayoutStyle } from './style'
import { H1, Anchor, Paragraph } from '@/components/atoms/Typography'
import { Figure } from '@/components/atoms/Figure'
import { UnorderedList } from '@/components/atoms/UnorderedList'
import Tag from '@/lib/tags/Tag'
import { siteMetadata } from '@/data/siteMetadata'
import formatDateString from '@/lib/utils/formatDateString'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  frontMatter: BlogFrontmatter
  relatedPosts?: BlogFrontmatter[]
}

// const discussUrl = (slug) =>
//   `https://mobile.twitter.com/search?q=${encodeURIComponent(
//     `${siteMetadata.siteUrl}/blog/${slug}`
//   )}`

const PostLayout: React.FC<PropsType> = ({ frontMatter, relatedPosts, children }) => {
  const { slug, date, title, tags } = frontMatter

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
                <Tag key={tag} href={`/tags/${tag}`} text={tag} />
              ))}
            </div>
          </Figure>
        )}
        {!!relatedPosts?.length && (
          <Figure figcaption={'Related Posts'}>
            <UnorderedList
              items={relatedPosts.map((rPost, idx) => (
                <Anchor key={idx} href={`/blog/${rPost.slug}`}>
                  {rPost.title}
                </Anchor>
              ))}
            />
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
