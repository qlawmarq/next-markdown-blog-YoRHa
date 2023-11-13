import React, { ButtonHTMLAttributes } from 'react'
import { ButtonStyle } from './style'

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <button css={ButtonStyle} {...props}>
      {props.children}
    </button>
  )
}
