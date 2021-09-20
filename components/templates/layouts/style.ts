import { css, keyframes } from '@emotion/react'
import { fontSize } from '@/constants/styles'
import { H1Style, H2Style, H3Style, AnchorStyle } from '@/components/atoms/Typography'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const commonLayoutStyle = css`
  animation: ${fadeIn} 0.5s ease-in-out 0s 1 normal;
`

export const PostLayoutStyle = css`
  ${commonLayoutStyle}
  .post-contents {
    padding: 1rem;
  }

  .post-contents img {
    margin: auto;
    display: flex;
  }

  .post-contents p {
    font-size: ${fontSize.M};
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
    font-size: ${fontSize.M};
    font-weight: bold;
    padding-left: 0.5rem;
    padding-top: 1rem;
    margin-bottom: 0.25rem;
    letter-spacing: 0.15rem;
  }

  .post-contents a {
    ${AnchorStyle}
  }

  .post-contents strong {
    font-weight: bold;
  }

  .post-contents blockquote {
    position: relative;
    margin: 1rem 0;
    padding: 0.5rem 1.5rem;
    box-sizing: border-box;
    font-style: italic;
  }

  .post-contents blockquote::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 0.3rem;
    padding: 0.15rem;
    border: solid #bab5a1;
    border-width: 0 0.2rem 0 0.6rem;
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
    border-bottom: 0.1rem solid #454138;
  }

  .post-contents table th,
  .post-contents table td {
    padding: 0.5rem;
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
