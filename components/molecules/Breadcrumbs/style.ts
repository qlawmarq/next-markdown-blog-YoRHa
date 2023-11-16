import { css } from '@emotion/react'
import { theme } from '@/theme/theme'

export const BreadcrumbsStyle = css`
  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    color: ${theme.colors.secondaryColor};
    font-size: ${theme.fontSizes.S};
  }
  .breadcrumb__list:not(:last-of-type)::after {
    content: '>';
    margin: 0 0.5rem;
  }
`
