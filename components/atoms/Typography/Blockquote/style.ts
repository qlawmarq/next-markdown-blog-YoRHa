import { css } from '@emotion/react'

export const style = css`
  position: relative;
  margin: 1rem 0;
  padding: 0.5rem 1.5rem;
  box-sizing: border-box;
  font-style: italic;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 0.3rem;
    padding: 0.15rem;
    border: solid #bab5a1;
    border-width: 0 0.2rem 0 0.6rem;
  }
`
