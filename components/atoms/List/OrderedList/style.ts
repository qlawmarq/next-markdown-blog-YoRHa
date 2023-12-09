import { css } from '@emotion/react'

export const orderedListStyle = css`
  list-style-type: decimal;
  margin: 1rem 0;
  padding-left: 1.5rem;
  // If nested ol then remove margin
  ol & {
    margin: 0;
  }
`
