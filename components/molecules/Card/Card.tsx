import React, { HTMLAttributes } from 'react'
import { H2 } from '@/components/atoms/Typography'
import { style } from './style'

type Props = {
  title: string
}

export const Card: React.FC<HTMLAttributes<HTMLDivElement> & Props> = ({ title, ...props }) => {
  return (
    <div css={style} {...props}>
      <H2>{title}</H2>
      <div>{props.children}</div>
    </div>
  )
}
