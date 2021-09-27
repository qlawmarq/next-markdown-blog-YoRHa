import { css } from '@emotion/react'

import { theme } from '@/theme/index'

export const style = css`
  font-size: ${theme.fontSizes.L};
  padding-top: 1rem;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: lighter;
  border: solid ${theme.colors.secondaryColor};
  border-width: 0.1rem 0;
  padding: 0.1rem 1rem;
  letter-spacing: 0.25rem;
`
