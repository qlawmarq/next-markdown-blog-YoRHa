import { css } from '@emotion/react'
import { theme } from '@/theme/theme'

export const style = css`
  cursor: pointer;
  display: inline-block;
  margin: 0 0.5rem 0 0;
  padding: 0.25rem;
  line-height: 1;
  text-decoration: none;
  font-size: ${theme.fontSizes.S};
  background-color: ${theme.colors.tertiaryColor};
  border: 0.05rem solid ${theme.colors.secondaryColor};
  border-left: 0.25rem solid ${theme.colors.secondaryColor};
  transition: all 0.2s ease-out;
  &:hover {
    background-color: ${theme.colors.primaryColor};
  }
`
