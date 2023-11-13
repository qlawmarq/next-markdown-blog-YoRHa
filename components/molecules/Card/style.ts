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
  position: relative;
  flex-direction: column;
  margin: 1rem 0;
  background-color: ${theme.colors.primaryColor};
  padding: 0.5rem;
  padding-left: 1.5rem;
  box-shadow: 0.2em 0.2em ${theme.colors.tertiaryColor};
  animation: ${slideIn} 0.5s ease-in-out 0s 1 normal;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.3rem;
    padding: 0.15rem;
    border: solid ${theme.colors.secondaryColor};
    border-width: 0 0.2rem 0 0.6rem;
  }
`
export const hoverStyle = css`
  &:not(:disabled):before,
  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.3rem;
    padding: 0.15rem;
    border: solid ${theme.colors.secondaryColor};
    border-width: 0 0.2rem 0 0.6rem;
    transition: all 0.25s ease-out;
  }
  &:not(:disabled):after,
  :after {
    content: '';
    transition: all 0.5s;
    transition-timing-function: ease-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    background-color: ${theme.colors.secondaryColor};
    z-index: -1;
  }
  &:not(:disabled):hover,
  :hover {
    background-color: transparent;
    color: ${theme.colors.primaryColor};
  }
  &:not(:disabled):hover:before,
  :hover:before {
    width: 100%;
    top: -0.2rem;
    bottom: -0.2rem;
    border: solid ${theme.colors.secondaryColor};
    border-width: 0.1rem 0;
  }
  &:not(:disabled):hover:after,
  :hover:after {
    width: 100%;
  }
  &:not(:disabled):active,
  :active {
    color: ${theme.colors.secondaryColor};
  }
  &:not(:disabled):active:after,
  :active:after {
    background-color: ${theme.colors.primaryColor};
  }
`
