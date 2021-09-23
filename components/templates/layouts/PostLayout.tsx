import React from 'react'
import { PostLayoutStyle } from './style'
import { H1, H2, Anchor } from '@/components/atoms/Typography'
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
    <article css={PostLayoutStyle}>
      <div className="post-contents">
        <header>
          <div>
            <dl>
              {/* <dt>Published on</dt> */}
              <dd>
                <time dateTime={date}>{formatDateString(String(date))}</time>
              </dd>
            </dl>
            <div>
              <H1>{title}</H1>
            </div>
          </div>
        </header>
        <div>
          <div>
            <div>{children}</div>
            <div>
              <Anchor href={discussUrl(slug)} rel="nofollow">
                {'Discuss on Twitter'}
              </Anchor>
            </div>
          </div>
          <footer>
            <div>
              {tags && (
                <div>
                  <H2>Tags</H2>
                  <div>
                    {tags.map((tag) => (
                      <Tag key={tag} href={`/tags/${tag}`} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              {(next || prev) && (
                <div>
                  {prev && (
                    <div>
                      <H2>Previous Article</H2>
                      <div>
                        <Anchor href={`/blog/${prev.slug}`}>{prev.title}</Anchor>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <H2>Next Article</H2>
                      <div>
                        <Anchor href={`/blog/${next.slug}`}>{next.title}</Anchor>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <Anchor href="/blog">&larr; Back to the blog</Anchor>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}
export default PostLayout
