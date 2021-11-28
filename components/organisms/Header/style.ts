import { css, keyframes } from '@emotion/react'
import { breakpoints } from '@/theme/index'

const expand = keyframes`
    0% {
        opacity: 0;
        width: 0%;
    }
    100% {
        opacity: 1;
        width: 100%;
    }
`

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

export const borderStyle = css`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
`
