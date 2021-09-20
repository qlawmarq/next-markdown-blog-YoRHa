import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'

export const Blockquote: React.FC<HtmlHTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <blockquote css={style} {...props}>
      {props.children}
    </blockquote>
  )
}
