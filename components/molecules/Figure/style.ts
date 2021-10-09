import { css } from '@emotion/react'
import { theme } from '@/theme/theme'

export const style = css`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-bottom: 1rem;
  background-color: ${theme.colors.primaryColor};
  padding: 0.5rem;

  &:not(figcaption) {
    margin: 0.5rem;
  }

  figcaption {
    order: -1;
    margin: -0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    background-color: ${theme.colors.secondaryColor};
    color: ${theme.colors.tertiaryColor};
  }
  hr {
    margin: 1rem 0;
    border-top: solid ${theme.colors.tertiaryColor};
    border-width: 0.1rem 0 0 0;
  }
`
