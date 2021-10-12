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
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  &:after {
    content: '';
    background: ${theme.colors.secondaryColor};
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 100%;
    animation: ${expand} 0.5s ease-in-out 0s 1 normal;
  }
`
