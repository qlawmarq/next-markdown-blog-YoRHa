import React, { LiHTMLAttributes } from 'react'
import { listItemStyle } from './style'

export const ListItem: React.FC<LiHTMLAttributes<HTMLLIElement>> = ({ ...props }) => {
  return <li css={listItemStyle} {...props} />
}
