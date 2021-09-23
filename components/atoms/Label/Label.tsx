import React, { HtmlHTMLAttributes } from 'react'
import { style } from './style'

export const Label: React.FC<HtmlHTMLAttributes<HTMLLabelElement>> = ({ ...props }) => {
  return (
    <label css={style} {...props}>
      {props.children}
    </label>
  )
}
