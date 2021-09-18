import React from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
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
    <SectionContainer>
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
                <PageTitle>{title}</PageTitle>
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
                    <h2>Tags</h2>
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
                        <h2>Previous Article</h2>
                        <div>
                          <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2>Next Article</h2>
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
    </SectionContainer>
  )
}
export default PostLayout
