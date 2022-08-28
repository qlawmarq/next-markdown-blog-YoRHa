import React, { useEffect } from 'react'
import Tag from '@/components/molecules/Tag'
import { useState } from 'react'
import { Card } from '@/components/atoms/Card'
import formatDateString from '@/lib/utils/formatDateString'
import { H1, H2, Paragraph } from '@/components/atoms/Typography'
// import { Anchor } from '@/components/atoms/Anchor'
import { Input } from '@/components/atoms/Input'
import { ListLayoutStyle } from './style'
import { BlogFrontmatter } from '@/types/blog'
import { Select } from '@/components/atoms/Select'
import { useRouter } from 'next/router'

type PropsType = {
  posts: BlogFrontmatter[]
  title: string
  description?: string
  onClickListItem: (item: string) => void
}

const PostListingLayout: React.FC<PropsType> = ({ posts, title, description, onClickListItem }) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<BlogFrontmatter[]>()

  useEffect(() => {
    const filteredPosts = posts?.filter((frontMatter) => {
      const searchContent =
        frontMatter.title + frontMatter.description + frontMatter.tags?.join(' ')
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
    setFilteredPosts(filteredPosts)
  }, [posts, searchValue])

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
              <Select
                options={[
                  { value: 'en', text: 'EN' },
                  { value: 'ja', text: 'JP' },
                ]}
                value={router.locale}
                onChange={(e) =>
                  router.push(router.pathname, router.asPath, { locale: e.target.value })
                }
              />
              <Input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
              />
              {!filteredPosts?.length && <Paragraph>No posts found.</Paragraph>}
            </div>
            <ul>
              {filteredPosts?.map((frontMatter) => {
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
