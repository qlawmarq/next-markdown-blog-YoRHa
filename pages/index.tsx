import React from 'react'
import { GetStaticProps } from 'next'
import { Link } from '@/components/atoms/Link'
import { PageSEO } from '@/lib/SEO'
import { H1, H2, Paragraph } from '@/components/atoms/Typography'
import Tag from '@/lib/tags/Tag'
import { siteMetadata } from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/markdown/mdx'
import formatDateString from '@/lib/utils/formatDateString'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  posts: BlogFrontmatter[]
}

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

const Index: React.FC<PropsType> = ({ posts }) => {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <div>
          <H1>Posts</H1>
          <Paragraph>{siteMetadata.description}</Paragraph>
        </div>
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug}>
                <article>
                  <div>
                    <dl>
                      <dt>Published on</dt>
                      <dd>
                        <time dateTime={date}>{formatDateString(String(date))}</time>
                      </dd>
                    </dl>
                    <div>
                      <div>
                        <div>
                          <H2>
                            <Link href={`/blog/${slug}`}>{title}</Link>
                          </H2>
                          <div>
                            {tags?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div>{summary}</div>
                      </div>
                      <div>
                        <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`}>
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div>
          <Link href="/blog" aria-label="all posts">
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}

export default Index
