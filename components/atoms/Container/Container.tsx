import React, { HTMLAttributes } from 'react'
import { ContainerStyle } from './style'

export const Container: React.FC<HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return (
    <section css={ContainerStyle} {...props}>
      {children}
    </section>
  )
}
