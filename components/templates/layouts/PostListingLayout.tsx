import React from 'react'
import Tag from '@/components/molecules/Tag'
import { useState } from 'react'
import { Card } from '@/components/molecules/Card'
import formatDateString from '@/lib/utils/formatDateString'
import { H1, H2, Paragraph, Anchor } from '@/components/atoms/Typography'
import { Input } from '@/components/atoms/Input'
import { ListLayoutStyle } from './style'
import { BlogFrontmatter } from '@/types/blog'

type PropsType = {
  posts: BlogFrontmatter[]
  title: string
  description?: string
  onClickListItem: (item: string) => void
}

const PostListingLayout: React.FC<PropsType> = ({ posts, title, description, onClickListItem }) => {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts?.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.description + frontMatter.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <>
      <div css={ListLayoutStyle}>
        <div>
          <H1>{title}</H1>
          <Paragraph>{description}</Paragraph>
        </div>
        {!posts?.length && (
          <>
            <Paragraph>Coming soon...</Paragraph>
          </>
        )}
        {posts?.length > 0 && (
          <>
            <div>
              <Input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
              />
              {!filteredBlogPosts?.length && <Paragraph>No posts found.</Paragraph>}
            </div>
            <ul>
              {filteredBlogPosts?.map((frontMatter) => {
                const { slug, date, title, description, tags } = frontMatter
                return (
                  <li key={slug}>
                    <Card onClick={() => onClickListItem(slug)}>
                      <H2>{title}</H2>
                      <Paragraph>
                        <time dateTime={date}>{formatDateString(date)}</time>
                      </Paragraph>
                      {tags?.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                      <Paragraph>{description}</Paragraph>
                    </Card>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default PostListingLayout
