import { css } from '@emotion/react'
import { breakpoints } from '@/constants/styles'
export const InnerStyle = css`
  position: relative;
  margin: 1rem auto;
  max-width: 700px;

  @media (${breakpoints.TABLET}) {
    max-width: 500px;
  }

  @media (${breakpoints.SP}) {
    max-width: 320px;
  }
`

export const OuterStyle = css`
  overflow: hidden;
  position: relative;
  width: 100%;
`
