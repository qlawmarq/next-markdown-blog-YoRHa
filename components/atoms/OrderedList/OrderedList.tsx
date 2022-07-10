import React, { ReactNode, OlHTMLAttributes } from 'react'
import { orderedListStyle } from './style'

type PropsType = {
  items: ReactNode[]
}

export const OrderedList: React.VFC<OlHTMLAttributes<HTMLOListElement> & PropsType> = ({
  items,
  ...props
}) => {
  return (
    <ol css={orderedListStyle} {...props}>
      {items.map((item, idx)=>{
        return (<li key={idx}>{item}</li>)
      })}
    </ol>
  )
}
