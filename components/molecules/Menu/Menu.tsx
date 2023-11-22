import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'
import { Anchor } from '@/components/atoms/Anchor'
import { ListItem, UnorderedList } from '@/components/atoms/List'
import { usePathname } from 'next/navigation'

type PropsType = {
  items: MenuItem[]
  onClickMenuItem: (href: string) => void
}

export interface MenuItem {
  href: string
  label: string
}

export const Menu: React.FC<HtmlHTMLAttributes<HTMLElement> & PropsType> = ({
  items,
  onClickMenuItem,
  ...props
}) => {
  const path = usePathname()
  return (
    <menu css={style} {...props}>
      <UnorderedList>
        {items.map((item) => (
          <ListItem key={item.href}>
            <Anchor
              className={path === item.href ? 'nav_button active' : 'nav_button'}
              onClick={() => onClickMenuItem(item.href)}
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
