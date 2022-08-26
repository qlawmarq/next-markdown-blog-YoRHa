import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'
export const Paragraph: React.FC<HtmlHTMLAttributes<HTMLParagraphElement>> = ({ ...props }) => {
  return (
    <p css={style} {...props}>
      {props.children}
    </p>
  )
}
