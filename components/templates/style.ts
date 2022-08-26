import { css } from '@emotion/react'
import { breakpoints } from '@/theme/index'
export const InnerStyle = css`
  position: relative;
  margin: auto;
  padding: 1rem;
  max-width: 70%;
  min-height: calc(100vh - 12rem);

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

export const UpLeftCircleStyle = css`
  position: absolute;
  left: 0;
  top: 0;
`

export const DownRightCircleStyle = css`
  position: absolute;
  right: 0;
  bottom: 0;
`
