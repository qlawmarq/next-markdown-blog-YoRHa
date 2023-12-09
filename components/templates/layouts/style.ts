import { css, keyframes } from '@emotion/react'
import { theme, breakpoints } from '@/theme/index'
import { CardStyle } from '@/components/molecules/Card'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const commonLayoutStyle = css`
  animation: ${fadeIn} 0.5s ease-in-out 0s 1 normal;
`

export const BlogLayoutStyle = css`
  ${commonLayoutStyle}
  display: flex;
  article {
    width: 75%;
  }
  aside {
    padding: 1rem 0 0 1rem;
    width: 25%;
  }
  @media (${breakpoints.MD}) {
    display: block;
    article {
      width: 100%;
    }
    aside {
      padding: 1rem 0;
      width: 100%;
    }
  }
  .blog_content__inner {
    margin: 1rem 0;
    .toc {
      margin: 1rem 0;
      ${CardStyle}
    }
    img {
      margin: auto;
      display: flex;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table th {
      font-weight: normal;
      border-bottom: 0.1rem solid ${theme.colors.secondaryColor};
    }
    table th,
    table td {
      padding: 0.5rem;
    }
    hr {
      margin: 1rem 0;
      border-top: solid ${theme.colors.tertiaryColor};
      border-width: 0.1rem 0 0 0;
    }
  }
`

export const ListLayoutStyle = css`
  ${commonLayoutStyle}
`
