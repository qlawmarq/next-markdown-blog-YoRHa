import React, { HTMLAttributes } from 'react'
import { style } from './style'

export const H1: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ ...props }) => {
  return (
    <h1 css={style} {...props}>
      {props.children}
    </h1>
  )
}
