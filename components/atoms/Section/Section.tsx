import React, { HTMLAttributes } from 'react'
import { H2 } from '@/components/atoms/Typography'
import { style } from './style'

export const Section: React.FC<HTMLAttributes<HTMLElement>> = ({ title, onClick, ...props }) => {
  const cursor = onClick ? 'pointer' : 'default'
  return (
    <section css={style} onClick={onClick} {...props} style={{ cursor: cursor }} aria-hidden="true">
      <div>{props.children}</div>
    </section>
  )
}
