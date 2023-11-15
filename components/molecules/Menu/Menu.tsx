import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'
import { Anchor } from '@/components/atoms/Anchor'

type PropsType = {
  Items: Item[]
  onClickItem: (href: string) => void
}

interface Item {
  href: string
  title: string
}

export const Menu: React.FC<HtmlHTMLAttributes<HTMLElement> & PropsType> = ({
  Items,
  onClickItem,
  ...props
}) => {
  return (
    <menu css={style} {...props}>
      <ul>
        {Items.map((item, idx) => (
          <li key={idx}>
            <Anchor className="nav_button" onClick={() => onClickItem(item.href)} role="button">
              {item.title}
            </Anchor>
          </li>
        ))}
      </ul>
    </menu>
  )
}
