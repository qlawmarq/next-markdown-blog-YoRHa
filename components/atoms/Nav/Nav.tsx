import React, { useEffect, useState, HtmlHTMLAttributes } from 'react'
import { style } from './style'
import { Button } from '@/components/atoms/Button'

type PropsType = {
  Items: Item[]
  onClickItem: (href: string) => void
}

interface Item {
  href: string
  title: string
}

export const Nav: React.FC<HtmlHTMLAttributes<HTMLElement> & PropsType> = ({
  Items,
  onClickItem,
  ...props
}) => {
  return (
    <nav css={style} {...props}>
      <ul>
        {Items.map((item, idx) => (
          <li key={idx}>
            <Button className="nav_button" onClick={() => onClickItem(item.href)}>
              {item.title}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
