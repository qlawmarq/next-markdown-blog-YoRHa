import { css } from '@emotion/react'
import { breakpoints } from '@/theme/index'

export const ContainerStyle = css`
  margin: auto;
  padding: 0;
  height: 100%;
  width: 100%;
  max-width: 70%;
  @media (${breakpoints.LG}) {
    max-width: 75%;
  }
  @media (${breakpoints.MD}) {
    max-width: 85%;
  }
  @media (${breakpoints.SM}) {
    max-width: 90%;
  }
  @media (${breakpoints.XS}) {
    max-width: 95%;
  }
`
