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
  &:after {
    content: '';
    background: ${theme.colors.secondaryColor};
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    animation: ${expand} 0.5s ease-in-out 0s 1 normal;
  }
`

export const InnerStyle = css``
