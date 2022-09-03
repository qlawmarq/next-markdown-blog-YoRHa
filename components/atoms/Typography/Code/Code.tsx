import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'

export const Code: React.FC<HtmlHTMLAttributes<HTMLHtmlElement>> = ({ ...props }) => {
  return (
    <code css={style} {...props}>
      {props.children}
    </code>
  )
}
