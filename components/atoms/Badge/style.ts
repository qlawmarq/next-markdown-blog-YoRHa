import { css } from '@emotion/react'
import { colors, fontSize } from '@/constants//styles'

export const style = css`
  cursor: pointer;
  display: inline-block;
  margin: 0 0.15em 0.25em 0;
  padding: 0.25rem;
  line-height: 1;
  text-decoration: none;
  font-size: ${fontSize.S};
  color: ${colors.Gray600};
  background-color: ${colors.Gray100};
  border: 0.05rem solid ${colors.Gray600};
  border-left: 0.25rem solid ${colors.Gray700};
  border-radius: 20%;
  &:hover {
    color: ${colors.Gray100};
    background-color: ${colors.Gray700};
  }
`
