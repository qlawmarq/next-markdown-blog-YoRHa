import React, { OlHTMLAttributes } from 'react'
import { orderedListStyle } from './style'

export const OrderedList: React.FC<OlHTMLAttributes<HTMLOListElement>> = ({ ...props }) => {
  return <ol css={orderedListStyle} {...props} />
}
