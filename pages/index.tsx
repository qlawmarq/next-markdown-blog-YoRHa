import { GetStaticProps } from 'next'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import { siteMetadata } from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDateString from '@/lib/utils/formatDateString'

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

const Index = ({ posts }) => {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <div>
          <h1>Posts</h1>
          <p>{siteMetadata.description}</p>
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
                        <time dateTime={date}>{formatDateString(date)}</time>
                      </dd>
                    </dl>
                    <div>
                      <div>
                        <div>
                          <h2>
                            <Link href={`/blog/${slug}`}>{title}</Link>
                          </h2>
                          <div>
                            {tags.map((tag) => (
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
