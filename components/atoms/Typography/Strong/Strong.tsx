import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'

export const Strong: React.FC<HtmlHTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <strong css={style} {...props}>
      {props.children}
    </strong>
  )
}
