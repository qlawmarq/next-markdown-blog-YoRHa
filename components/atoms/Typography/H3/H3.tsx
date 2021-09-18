import React, { HTMLAttributes } from 'react'
import { style } from './style'
export const H3: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ ...props }) => {
  return (
    <h3 css={style} {...props}>
      {props.children}
    </h3>
  )
}
