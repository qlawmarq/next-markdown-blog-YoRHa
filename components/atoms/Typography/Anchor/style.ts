import { css } from '@emotion/react'
import { colors } from '@/constants//styles'

export const style = css`
  color: ${colors.Gray600};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`
