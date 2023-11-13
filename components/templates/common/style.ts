import { css } from '@emotion/react'
import { breakpoints } from '@/theme/index'
export const InnerStyle = css`
  position: relative;
  margin: auto;
  padding: 1rem;
  max-width: 70%;
  min-height: calc(100vh - 12rem);

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
    max-width: 97.5%;
  }
`

export const OuterStyle = css`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
`

export const UpLeftCircleStyle = css`
  background-image: url(/static/images/circle_up_left.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
  z-index: -999;
  left: 0;
  top: 0;
  height: 100%;
  width: calc(100vw / 2);
`

export const BottomRightCircleStyle = css`
  background-image: url(/static/images/circle_bottom_right.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
  z-index: -999;
  right: 0;
  bottom: 0;
  height: 100%;
  width: calc(100vw / 2);
`
