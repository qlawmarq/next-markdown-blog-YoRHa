import React, { ReactNode, HTMLAttributes } from 'react'
import { unorderedListStyle } from './style'

export const UnorderedList: React.FC<HTMLAttributes<HTMLUListElement>> = ({ ...props }) => {
  return <ul css={unorderedListStyle} {...props} />
}
