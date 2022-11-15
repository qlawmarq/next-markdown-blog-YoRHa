import React, { HTMLAttributes } from 'react'
import { css } from '@emotion/react'
import { style, hoverStyle } from './style'

export const PostCard: React.FC<HTMLAttributes<HTMLElement>> = ({ title, onClick, ...props }) => {
  const cursor = onClick ? 'pointer' : 'default'
  return (
    <section
      css={css`
        ${style} ${hoverStyle}
      `}
      onClick={onClick}
      {...props}
      style={{ cursor: cursor }}
      aria-hidden="true"
    >
      <div>{props.children}</div>
    </section>
  )
}
