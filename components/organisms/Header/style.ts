import { css } from '@emotion/react'
import { colors } from '@/constants/styles'

export const HeaderStyle = css`
  position: relative;
  margin: 1rem;
`

export const IconAreaStyle = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  color: ${colors.Gray400};
`
