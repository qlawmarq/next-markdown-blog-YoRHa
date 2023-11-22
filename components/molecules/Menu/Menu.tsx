import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'
import { Anchor } from '@/components/atoms/Anchor'
import { ListItem, UnorderedList } from '@/components/atoms/List'
import { usePathname } from 'next/navigation'

type PropsType = {
  items: MenuItem[]
  onClickItem: (href: string) => void
}

export interface MenuItem {
  href: string
  label: string
}

export const Menu: React.FC<HtmlHTMLAttributes<HTMLElement> & PropsType> = ({
  items,
  onClickItem,
  ...props
}) => {
  const paths = usePathname()
  return (
    <menu css={style} {...props}>
      <UnorderedList>
        {items.map((item, idx) => (
          <ListItem key={idx}>
            <Anchor
              className={paths == item.href ? 'nav_button active' : 'nav_button'}
              onClick={() => onClickItem(item.href)}
              role="button"
            >
              {item.label}
            </Anchor>
          </ListItem>
        ))}
      </UnorderedList>
    </menu>
  )
}
