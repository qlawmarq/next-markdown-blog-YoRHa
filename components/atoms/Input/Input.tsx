import React, { InputHTMLAttributes } from 'react'
import { style } from './style'

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input css={style} {...props}>
      {props.children}
    </input>
  )
}
