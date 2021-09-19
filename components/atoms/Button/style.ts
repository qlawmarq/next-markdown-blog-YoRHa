import { css } from '@emotion/react'
import { colors, fontSize } from '@/constants//styles'

export const style = css`
  cursor: pointer;
  position: relative;
  margin: 0.5rem;
  font-size: ${fontSize.M};
  background-color: ${colors.Gray300};
  border: none;
  border-radius: 20%;
  &:hover {
    background-color: ${colors.Gray400};
  }
`
