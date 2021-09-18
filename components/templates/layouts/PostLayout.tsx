import React from 'react'
import { Link } from '@/components/atoms/Link'
import { H1, H2 } from '@/components/atoms/Typography'
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
    <article>
      <div>
        <header>
          <div>
            <dl>
              <dt>Published on</dt>
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
              <Link href={discussUrl(slug)} rel="nofollow">
                {'Discuss on Twitter'}
              </Link>
            </div>
          </div>
          <footer>
            <div>
              {tags && (
                <div>
                  <H2>Tags</H2>
                  <div>
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
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
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <H2>Next Article</H2>
                      <div>
                        <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              <Link href="/blog">&larr; Back to the blog</Link>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}
export default PostLayout
