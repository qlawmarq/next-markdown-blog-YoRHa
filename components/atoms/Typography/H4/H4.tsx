import React, { HTMLAttributes } from 'react'
import { style } from './style'
export const H4: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ ...props }) => {
  return (
    <h4 css={style} {...props}>
      {props.children}
    </h4>
  )
}
