import { css } from '@emotion/react'
import { colors, fontSize } from '@/constants//styles'

export const style = css`
  &:disabled {
    padding: 0.5rem;
    font-size: 1em;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 0;
    background-color: #dcd8c0;
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    color: #bab5a1;
    cursor: not-allowed;
  }
  &:not(:disabled) {
    padding: 0.5rem;
    font-size: 1em;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 0;
    background-color: #bab5a1;
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    cursor: pointer;
    transition-duration: 0.2s;
    transition-property: color, background-color, box-shadow;
    position: relative;
    z-index: 1;
  }
  &:not(:disabled):hover,
  :hover {
    box-shadow: 0.2em 0.2em 0.1em 0 #bab5a1;
  }
  &:not(:disabled):before,
  :before {
    content: '';
    transition: all 0.2s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  &:not(:disabled):after,
  :after {
    content: '';
    transition: all 0.2s;
    transition-timing-function: ease-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    background-color: #454138;
    z-index: -1;
  }
  &:not(:disabled):hover,
  :hover {
    background-color: transparent;
    color: #dcd8c0;
  }
  &:not(:disabled):hover:before,
  :hover:before {
    top: -0.2rem;
    bottom: -0.2rem;
    border: solid #454138;
    border-width: 0.1rem 0;
  }
  &:not(:disabled):hover:after,
  :hover:after {
    width: 100%;
  }
  &:not(:disabled):active,
  :active {
    color: #454138;
  }
  &:not(:disabled):active:after,
  :active:after {
    background-color: #dcd8c0;
  }
`
