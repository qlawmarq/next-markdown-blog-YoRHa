import React, { LiHTMLAttributes } from 'react'
import { listStyle } from './style'

export const List: React.FC<LiHTMLAttributes<HTMLLIElement>> = ({ ...props }) => {
  return <li css={listStyle} {...props} />
}
