import { css } from '@emotion/react'
import { theme } from '@/theme/theme'

export const style = css`
  font-size: ${theme.fontSizes.XL};
  font-weight: normal;
  letter-spacing: 0.5rem;
  text-shadow: 0.3rem 0.3rem 0 ${theme.colors.tertiaryColor};
  margin-bottom: 1rem;
  margin-top: 0;
  :not(:first-of-type) {
    margin-top: 3rem;
  }
`
