import React, { SelectHTMLAttributes } from 'react'
import { style } from './style'

type OptionType = {
  value: string | number
  text?: string | number
}

type SelectCustomProps = {
  options?: OptionType[] | string[]
}
export const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement> & SelectCustomProps> = (
  props
) => {
  return (
    <select {...props} css={style}>
      {props.options?.map((option, index) => (
        <option key={index} value={typeof option === 'string' ? option : option.value}>
          {typeof option === 'string' ? option : option?.text ? option.text : option.value}
        </option>
      ))}
    </select>
  )
}
