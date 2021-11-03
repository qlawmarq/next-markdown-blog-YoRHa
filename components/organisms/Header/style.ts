import { css, keyframes } from '@emotion/react'
import { theme } from '@/theme/index'

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
  height: 5rem;
`

export const borderStyle = css`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
`
