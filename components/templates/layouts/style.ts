import { css, keyframes } from '@emotion/react'
import { theme, breakpoints } from '@/theme/index'

import {
  H1Style,
  H2Style,
  H3Style,
  AnchorStyle,
  BlockquoteStyle,
} from '@/components/atoms/Typography'

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
    width: 25%;
  }

  @media (${breakpoints.TABLET}) {
    display: block;
    article {
      width: 100%;
    }
    aside {
      width: 100%;
    }
  }

  .post-contents {
    padding: 1rem;
  }

  .post-contents img {
    margin: auto;
    display: flex;
  }

  .post-contents p {
    font-size: ${theme.fontSizes.M};
    margin: 1rem 0;
  }

  .post-contents h1 {
    ${H1Style}
  }

  .post-contents h2 {
    ${H2Style}
  }

  .post-contents h3 {
    ${H3Style}
  }

  .post-contents h4 {
    font-size: ${theme.fontSizes.M};
    font-weight: bold;
    padding-left: 0.5rem;
    padding-top: 1rem;
    margin-bottom: 0.25rem;
    letter-spacing: 0.15rem;
  }

  .post-contents a {
    ${AnchorStyle}
  }

  .post-contents code {
    background-color: ${theme.colors.primaryColor};
    padding: 0.25rem;
  }

  .post-contents strong {
    font-weight: bold;
  }

  .post-contents blockquote {
    ${BlockquoteStyle}
  }

  .post-contents ul,
  .post-contents ol {
    padding: 0.5em 0 0.5em 1.5em;
  }

  .post-contents ul li,
  .post-contents ol li {
    line-height: 1.5;
    padding: 0.5em 0;
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
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style-type: none;
  }
`
