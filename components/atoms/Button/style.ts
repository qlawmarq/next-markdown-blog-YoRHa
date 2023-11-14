import { css } from '@emotion/react'
import { theme } from '@/theme/index'

export const ButtonStyle = css`
  &:disabled {
    padding: 0.5rem;
    font-size: 1em;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 0;
    background-color: ${theme.colors.primaryColor};
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    color: ${theme.colors.tertiaryColor};
    cursor: not-allowed;
  }
  &:not(:disabled) {
    padding: 0.5rem;
    font-size: 1em;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 0;
    background-color: ${theme.colors.tertiaryColor};
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    cursor: pointer;
    transition-duration: 0.25s;
    transition-property: color, background-color, box-shadow;
    position: relative;
    z-index: 1;
  }
  &:not(:disabled):before,
  :before {
    content: '';
    transition: all 0.25s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &:not(:disabled):after,
  :after {
    content: '';
    transition: all 0.25s;
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
