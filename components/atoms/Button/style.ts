import { css } from '@emotion/react'
import { theme } from '@/theme/index'

export const ButtonStyle = css`
  padding: 0.5rem;
  font-size: 1em;
  cursor: pointer;
  &:disabled {
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.tertiaryColor};
    cursor: not-allowed;
  }
  &:not(:disabled) {
    background-color: ${theme.colors.tertiaryColor};
    transition-duration: 0.25s;
    transition-property: color, background-color, box-shadow;
    position: relative;
    z-index: 1;
  }
  &:not(:disabled):before {
    content: '';
    transition: all 0.25s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &:not(:disabled):after {
    content: '';
    transition: all 0.25s ease-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    background-color: ${theme.colors.secondaryColor};
    z-index: -1;
  }
  &:not(:disabled):hover {
    background-color: transparent;
    color: ${theme.colors.primaryColor};
  }
  &:not(:disabled):hover:before {
    top: -0.2rem;
    bottom: -0.2rem;
    border: solid ${theme.colors.secondaryColor};
    border-width: 0.1rem 0;
  }
  &:not(:disabled):hover:after {
    width: 100%;
  }
  &:not(:disabled):active {
    color: ${theme.colors.secondaryColor};
  }
  &:not(:disabled):active:after {
    background-color: ${theme.colors.primaryColor};
  }
`
