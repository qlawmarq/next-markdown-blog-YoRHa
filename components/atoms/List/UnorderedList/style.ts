import { css } from '@emotion/react'

export const unorderedListStyle = css`
  list-style-type: disc;
  margin: 1rem 0;
  padding-left: 1.5rem;
  // If nested ul then remove margin
  ul & {
    margin: 0;
  }
`
