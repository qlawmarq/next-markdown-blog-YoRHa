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

export const PostLayoutStyle = css`
  ${commonLayoutStyle}
  display: flex;
  article {
    width: 75%;
  }
  aside {
    padding: 1rem 0 0 1rem;
    width: 25%;
  }

  @media (${breakpoints.TABLET}) {
    display: block;
    article {
      width: 100%;
    }
    aside {
      padding: 1rem 0;
      width: 100%;
    }
  }

  .post-contents .toc {
    margin: 1rem 0;
    ${CardStyle}
  }

  .post-contents img {
    margin: auto;
    display: flex;
  }

  .post-contents table {
    width: 100%;
    border-collapse: collapse;
  }

  .post-contents table th {
    font-weight: normal;
    border-bottom: 0.1rem solid ${theme.colors.secondaryColor};
  }

  .post-contents table th,
  .post-contents table td {
    padding: 0.5rem;
  }

  .post-contents hr {
    margin: 1rem 0;
    border-top: solid ${theme.colors.tertiaryColor};
    border-width: 0.1rem 0 0 0;
  }
`

export const ListLayoutStyle = css`
  ${commonLayoutStyle}
`
