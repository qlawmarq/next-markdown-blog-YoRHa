import { css } from '@emotion/react'
import { colors, fontSize } from '@/constants//styles'

export const style = css`
  cursor: pointer;
  position: relative;
  margin: 0.5rem;
  padding: 1rem 2rem;
  font-size: ${fontSize.M};
  border: none;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 12% 100%, 0 70%);
  &:hover {
    background-color: ${colors.Gray400};
  }
`
