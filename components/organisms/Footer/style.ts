import { css } from '@emotion/react'
import { theme } from '@/theme/index'

export const FooterStyle = css`
  position: relative;
  border-top: 1px solid ${theme.colors.secondaryColor};
  margin: auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
