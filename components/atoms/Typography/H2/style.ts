import { css } from '@emotion/react'

import { theme } from '@/theme/index'

export const style = css`
  font-size: ${theme.fontSizes.L};
  font-weight: lighter;
  border: solid ${theme.colors.secondaryColor};
  border-width: 0.1rem 0;
  letter-spacing: 0.25rem;
  padding: 0.1rem 1rem;
  :not(:first-of-type) {
    margin-top: 2rem;
  }
`
