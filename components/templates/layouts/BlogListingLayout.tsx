import React, { useEffect } from 'react'
import Tag from '@/components/molecules/Tag'
import { useState } from 'react'
import { Card } from '@/components/molecules/Card'
import formatDateString from '@/lib/utils/formatDateString'
import { H1, H2, Paragraph } from '@/components/atoms/Typography'
// import { Anchor } from '@/components/atoms/Anchor'
import { Input } from '@/components/atoms/Input'
import { ListLayoutStyle } from './style'
import { Select } from '@/components/atoms/Select'
import { useRouter } from 'next/router'
import { BlogFrontmatter } from '@/types/blog'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs'

type PropsType = {
  blogs: BlogFrontmatter[]
  title: string
  description?: string
  onClickListItem: (item: string) => void
}

const BlogListingLayout: React.FC<PropsType> = ({ blogs, title, description, onClickListItem }) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [filteredBlogs, setFilteredBlogs] = useState<BlogFrontmatter[]>()

  useEffect(() => {
    const filteredBlogs = blogs?.filter((frontmatter) => {
      const searchContent =
        frontmatter.title + frontmatter.description + frontmatter.tags?.join(' ')
      return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })
    setFilteredBlogs(filteredBlogs)
  }, [blogs, searchValue])

  return (
    <>
      <div css={ListLayoutStyle}>
        <Breadcrumbs />
        <H1>{title}</H1>
        <Paragraph>{description}</Paragraph>
        {blogs?.length > 0 ? (
          <>
            <div>
              <Select
                id="locale"
                name="locale"
                aria-label="Select language"
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
                id="search"
                name="search"
                aria-label="Search blogs"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search blogs"
              />
              {!filteredBlogs?.length && <Paragraph>No blogs found.</Paragraph>}
            </div>
            <ul>
              {filteredBlogs?.map((frontmatter) => {
                const { slug, date, title, description, tags } = frontmatter
                return (
                  <li key={slug}>
                    <Card onClick={() => onClickListItem(slug)}>
                      <H2>{title}</H2>
                      <Paragraph>
                        <time dateTime={date}>{formatDateString(date)}</time>
                      </Paragraph>
                      {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                      <Paragraph>{description}</Paragraph>
                    </Card>
                  </li>
                )
              })}
            </ul>
          </>
        ) : (
          <>
            <Paragraph>Coming soon...</Paragraph>
          </>
        )}
      </div>
    </>
  )
}

export default BlogListingLayout
