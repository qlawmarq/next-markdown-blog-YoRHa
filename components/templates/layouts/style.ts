import { css, keyframes } from '@emotion/react'
import { theme, breakpoints } from '@/theme/index'
import { unorderedListStyle } from '@/components/molecules/UnorderedList'
import { orderedListStyle } from '@/components/molecules/OrderedList'
import {
  H1Style,
  H2Style,
  H3Style,
  H4Style,
  BlockquoteStyle,
  ParagraphStyle,
} from '@/components/atoms/Typography'
import { AnchorStyle } from '@/components/atoms/Anchor'
import { CardStyle } from '@/components/atoms/Card'

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

  .post-contents .table-of-contents {
    margin: 1rem 0;
    ${CardStyle}
  }

  .post-contents img {
    margin: auto;
    display: flex;
  }

  .post-contents p {
    ${ParagraphStyle}
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
    ${H4Style}
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

  .post-contents ul {
    ${unorderedListStyle}
  }

  .post-contents ol {
    ${orderedListStyle}
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
