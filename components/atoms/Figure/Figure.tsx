import React, { Children, HTMLAttributes } from 'react'
import { style } from './style'

type PropsType = {
  figcaption: string
}

export const Figure: React.FC<HTMLAttributes<HTMLElement> & PropsType> = ({
  figcaption,
  children,
  ...props
}) => {
  return (
    <figure css={style}>
      <figcaption>{figcaption}</figcaption>
      {children}
    </figure>
  )
}
