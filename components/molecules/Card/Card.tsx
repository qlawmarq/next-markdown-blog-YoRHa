import React, { HTMLAttributes } from 'react'
import { H2 } from '@/components/atoms/Typography'
import { style } from './style'

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ title, ...props }) => {
  return (
    <div css={style} {...props}>
      <div>{props.children}</div>
    </div>
  )
}
