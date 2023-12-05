import { css } from '@emotion/react'
import { theme } from '@/theme/theme'

export const style = css`
  font-size: ${theme.fontSizes.XL};
  margin: 1rem 0;
  font-weight: normal;
  letter-spacing: 0.5rem;
  text-shadow: 0.3rem 0.3rem 0 ${theme.colors.tertiaryColor};
  :not(:first-of-type) {
    margin-top: 3rem;
  }
`
