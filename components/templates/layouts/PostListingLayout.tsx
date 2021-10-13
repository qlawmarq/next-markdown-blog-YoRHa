import React from 'react'
import Tag from '@/lib/tags/Tag'
import { useState } from 'react'
import { Pagination } from '@/components/molecules/Pagination'
import { Card } from '@/components/molecules/Card'
import formatDateString from '@/lib/utils/formatDateString'
import { H1, H2, Paragraph, Anchor } from '@/components/atoms/Typography'
import { Input } from '@/components/atoms/Input'
import { ListLayoutStyle } from './style'

type PropsType = {
  posts: any
  title: string
  description?: string
  initialDisplayPosts?: any[]
  pagination?: any
  onClickListItem: (item: string) => void
}

const PostListingLayout: React.FC<PropsType> = ({
  posts,
  title,
  description,
  initialDisplayPosts = [],
  pagination,
  onClickListItem,
}) => {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.description + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div css={ListLayoutStyle}>
        <div>
          <H1>{title}</H1>
          <Paragraph>{description}</Paragraph>
          <div>
            <Input
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
            const { slug, date, title, description, tags } = frontMatter
            return (
              <li key={slug}>
                <Card onClick={() => onClickListItem(slug)}>
                  <div>
                    <H2>{title}</H2>
                    <dl>
                      {/* <dt>Published on</dt> */}
                      <dd>
                        <time dateTime={date}>{formatDateString(date)}</time>
                      </dd>
                    </dl>
                    <div>
                      {tags.map((tag) => (
                        <Tag key={tag} href={`/tags/${tag}`} text={tag} />
                      ))}
                    </div>
                  </div>
                  <div>{description}</div>
                </Card>
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

export default PostListingLayout
