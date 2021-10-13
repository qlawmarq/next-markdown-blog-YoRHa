import React from 'react'
import { PostLayoutStyle } from './style'
import { H1, H2, Anchor } from '@/components/atoms/Typography'
import { Figure } from '@/components/molecules/Figure'
import Tag from '@/lib/tags/Tag'
import { siteMetadata } from '@/data/siteMetadata'
import formatDateString from '@/lib/utils/formatDateString'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  frontMatter: BlogFrontmatter
  next?: BlogFrontmatter
  prev?: BlogFrontmatter
}

const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const PostLayout: React.FC<PropsType> = ({ frontMatter, next, prev, children }) => {
  const { slug, date, title, tags } = frontMatter

  return (
    <div css={PostLayoutStyle}>
      <article>
        <div className="post-contents">
          <dl>
            {/* <dt>Published on</dt> */}
            <dd>
              <time dateTime={date}>{formatDateString(String(date))}</time>
            </dd>
          </dl>
          <div>
            <H1>{title}</H1>
          </div>
          <div>
            <div>{children}</div>
            <div>
              <Anchor href={discussUrl(slug)} rel="nofollow">
                {'Discuss on Twitter'}
              </Anchor>
            </div>
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
        {(next || prev) && (
          <div>
            <Figure figcaption={'Next & Previous Article'}>
              {prev && (
                <div>
                  <Anchor href={`/blog/${prev.slug}`}>{prev.title}</Anchor>
                </div>
              )}
              {next && (
                <div>
                  <Anchor href={`/blog/${next.slug}`}>{next.title}</Anchor>
                </div>
              )}
            </Figure>
          </div>
        )}
        <div>
          <Anchor href="/blog">&larr; Back to the blog</Anchor>
        </div>
      </aside>
    </div>
  )
}
export default PostLayout
