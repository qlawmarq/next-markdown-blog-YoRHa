import React, { ButtonHTMLAttributes } from 'react'
import { style } from './style'

export const NormalButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <button css={style} {...props}>
      {props.children}
    </button>
  )
}
