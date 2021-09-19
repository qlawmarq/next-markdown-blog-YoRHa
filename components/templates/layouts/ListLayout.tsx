import React from 'react'
import { Link } from '@/components/atoms/Link'
import Tag from '@/lib/tags/Tag'
import { useState } from 'react'
import { Pagination } from '@/components/molecules/Pagination'
import formatDateString from '@/lib/utils/formatDateString'
import { H1, H3, Paragraph } from '@/components/atoms/Typography'

type PropsType = {
  posts: any
  title: string
  description?: string
  initialDisplayPosts?: any[]
  pagination?: any
}

const ListLayout: React.FC<PropsType> = ({
  posts,
  title,
  description,
  initialDisplayPosts = [],
  pagination,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div>
        <div>
          <H1>{title}</H1>
          <Paragraph>{description}</Paragraph>
          <div>
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
            />
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug}>
                <article>
                  <dl>
                    {/* <dt>Published on</dt> */}
                    <dd>
                      <time dateTime={date}>{formatDateString(date)}</time>
                    </dd>
                  </dl>
                  <div>
                    <div>
                      <H3>
                        <Link href={`/blog/${slug}`}>{title}</Link>
                      </H3>
                      <div>
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div>{summary}</div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}

export default ListLayout
