import { css } from '@emotion/react'

export const HeaderStyle = css`
  position: relative;
  margin: auto;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

export const HeaderLogoStyle = css`
  height: 6rem;
  width: 6rem;
  cursor: pointer;
  background-image: url(/static/images/logo.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`
