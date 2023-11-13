import React, { HTMLAttributes } from 'react'
import { BorderStyle } from './style'

export const Border: React.FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => {
  return (
    <div css={BorderStyle} {...props}>
      <span />
    </div>
  )
}
