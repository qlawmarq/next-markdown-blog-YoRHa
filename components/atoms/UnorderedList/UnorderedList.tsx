import React, { ReactNode, HTMLAttributes } from 'react'
import { unorderedListStyle } from './style'

type PropsType = {
  items: ReactNode[]
}

export const UnorderedList: React.VFC<HTMLAttributes<HTMLUListElement> & PropsType> = ({
  items,
  ...props
}) => {
  return (
    <ul css={unorderedListStyle} {...props}>
      {items.map((item, idx)=>{
        return (<li key={idx}>{item}</li>)
      })}
    </ul>
  )
}
