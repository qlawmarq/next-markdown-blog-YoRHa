import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'
export const Span: React.FC<HtmlHTMLAttributes<HTMLSpanElement>> = ({ ...props }) => {
  return (
    <span css={style} {...props}>
      {props.children}
    </span>
  )
}
