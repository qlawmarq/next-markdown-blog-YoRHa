import { css } from '@emotion/react'
import { theme } from '@/theme/theme'

export const style = css`
  font-size: ${theme.fontSizes.M};
  font-weight: bold;
  padding-left: 0.5rem;
  margin: 1rem 0;
  letter-spacing: 0.15rem;
  :not(:first-of-type) {
    margin-top: 1.25rem;
  }
`
