import { css, keyframes } from '@emotion/react'
import { theme } from '@/theme/theme'

const slideIn = keyframes`
    0% {
        opacity: 0;
        transform: translateX(25px);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
`

export const style = css`
  padding: 0.5rem;
  font-size: 1em;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  background-color: ${theme.colors.primaryColor};
  color: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  cursor: pointer;
`
