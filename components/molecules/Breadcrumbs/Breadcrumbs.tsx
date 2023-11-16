import React, { HTMLAttributes } from 'react'
import { BreadcrumbsStyle } from './style'
import { Anchor } from '@/components/atoms/Anchor'
import { ListItem } from '@/components/atoms/List'
import { usePathname } from 'next/navigation'

export const Breadcrumbs: React.FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  const paths = usePathname()
  const pathNames = paths.split('/').filter((path) => path)

  if (pathNames.length <= 0) {
    return <></>
  }

  return (
    <nav css={BreadcrumbsStyle} {...props} aria-label="breadcrumb">
      <ol className="breadcrumb" itemScope itemType="http://schema.org/BreadcrumbList">
        <ListItem
          className="breadcrumb__list"
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <Anchor href={'/'} itemProp="name">
            {'Home'}
          </Anchor>
          <meta itemProp="position" content="1" />
        </ListItem>
        {pathNames.map((link, index) => {
          const href = `/${pathNames
            .slice(0, index + 1)
            .map(encodeURIComponent)
            .join('/')}`
          const itemLink = link.charAt(0).toUpperCase() + link.slice(1)
          const isLast = index + 1 === pathNames.length
          return (
            <ListItem
              key={href}
              className="breadcrumb__list"
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              {isLast ? (
                <span aria-current="page" itemProp="name">
                  {itemLink}
                </span>
              ) : (
                <Anchor href={href} itemProp="name">
                  {itemLink}
                </Anchor>
              )}

              <meta itemProp="position" content={`${index + 2}`} />
            </ListItem>
          )
        })}
      </ol>
    </nav>
  )
}
