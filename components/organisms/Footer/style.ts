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

export const FooterStyle = css`
  position: relative;
  margin: auto;
  height: 6rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`
export const BorderStyle = css`
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
`
