import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'

export const Badge: React.FC<HtmlHTMLAttributes<HTMLHeadElement>> = ({ ...props }) => {
  return (
    <label css={style} {...props}>
      {props.children}
    </label>
  )
}
