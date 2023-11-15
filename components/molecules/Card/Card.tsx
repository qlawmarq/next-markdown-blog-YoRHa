import React, { HTMLAttributes } from 'react'
import { hoverStyle, style } from './style'
import { css } from '@emotion/react'

export const Card: React.FC<HTMLAttributes<HTMLElement>> = ({ onClick, ...props }) => {
  const cursor = onClick ? 'pointer' : 'default'
  const cardStyle = onClick
    ? css`
        ${style} ${hoverStyle}
      `
    : css`
        ${style}
      `
  return (
    <section
      css={cardStyle}
      onClick={onClick}
      {...props}
      style={{ cursor: cursor }}
      aria-hidden="true"
    >
      <div>{props.children}</div>
    </section>
  )
}
