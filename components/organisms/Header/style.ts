import { css } from '@emotion/react'
import { colors } from '@/constants/styles'

export const HeaderStyle = css`
  position: relative;
  background-color: ${colors.Gray700};
  margin: auto;
  padding: 1rem 0;
`

export const MenuAreaStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const IconStyle = css`
  padding: 0.25rem;
  width: 1.2rem;
  fill: ${colors.Gray100};
`
