import React from 'react'
import { ArticleLayoutStyle } from './style'
import { H1, Paragraph } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { Figure } from '@/components/molecules/Figure'
import { UnorderedList, ListItem } from '@/components/atoms/List'
import Tag from '@/components/molecules/Tag'
import { ArticleFrontmatter } from '@/types/article'
import formatDateString from '@/lib/utils/formatDateString'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs'

type PropsType = {
  frontmatter: ArticleFrontmatter
  relatedArticles?: ArticleFrontmatter[]
  children: React.ReactNode
}

const ArticleLayout: React.FC<PropsType> = ({ frontmatter, relatedArticles, children }) => {
  const { date, title, tags } = frontmatter

  return (
    <div css={ArticleLayoutStyle}>
      <article>
        <div className="article-contents">
          <Breadcrumbs />
          <div>
            <H1>{title}</H1>
          </div>
          {date && (
            <Paragraph>
              <time dateTime={date}>{formatDateString(String(date))}</time>
            </Paragraph>
          )}
          <hr />
          <div>
            <div className="article-contents">{children}</div>
          </div>
        </div>
      </article>
      <aside>
        {!!tags?.length && (
          <Figure figcaption={'Tags'}>
            <div>
              {tags.map((tag) => (
                <Tag key={tag} href={`/tag/${tag}`} text={tag} />
              ))}
            </div>
          </Figure>
        )}
        {!!relatedArticles?.length && (
          <Figure figcaption={'Related Articles'}>
            <UnorderedList>
              {relatedArticles.map((rArticle, idx) => (
                <ListItem key={idx}>
                  <Anchor href={`/article/${rArticle.slug}`}>{rArticle.title}</Anchor>
                </ListItem>
              ))}
            </UnorderedList>
          </Figure>
        )}
        <div>
          <Anchor href="/">&larr; Back to the Home</Anchor>
        </div>
      </aside>
    </div>
  )
}
export default ArticleLayout
