import React, { HTMLAttributes } from 'react'
import { style } from './style'

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  return (
    <div css={style} {...props}>
      {props.children}
      <span aria-hidden className="glitch" />
    </div>
  )
}
