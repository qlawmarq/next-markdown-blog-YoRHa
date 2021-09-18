import { css } from '@emotion/react'
import { colors, fontSize } from '@/constants/styles'

export const blogStyle = css`
  padding: 1rem;
  .post-contents {
    color: ${colors.Gray700};
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
    font-size: ${fontSize.L};
    font-weight: bold;
    padding-top: 1rem;
    margin-bottom: 0.5rem;
    border-bottom: solid 0.3rem ${colors.Blue};
  }

  .post-contents h2 {
    font-size: ${fontSize.L};
    font-weight: bold;
    padding-top: 1rem;
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: solid 0.25rem ${colors.Blue};
  }

  .post-contents h3 {
    font-size: ${fontSize.M};
    font-weight: bold;
    padding-left: 0.25rem;
    padding-top: 1rem;
    margin-bottom: 0.25rem;
    border-bottom: solid 0.1rem ${colors.Blue};
  }

  .post-contents h4 {
    font-size: ${fontSize.M};
    font-weight: bold;
    padding-left: 0.5rem;
    padding-top: 1rem;
    margin-bottom: 0.25rem;
  }

  .post-contents strong {
    font-weight: bold;
  }

  .post-contents blockquote {
    position: relative;
    padding: 1rem 2.2rem;
    box-sizing: border-box;
    font-style: italic;
    background: ${colors.Gray80};
    color: #555;
  }

  .post-contents blockquote::before {
    display: inline-block;
    position: absolute;
    left: 0;
    content: '“';
    color: ${colors.Gray50};
    font-size: ${fontSize.XL};
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
    border-spacing: 0;
  }

  .post-contents table th {
    background-color: ${colors.Gray300};
  }

  .post-contents table th,
  .post-contents table td {
    padding: 10px 0;
    text-align: center;
  }

  .post-contents table tr:nth-of-type(even) {
    background-color: ${colors.Gray100};
  }
`
