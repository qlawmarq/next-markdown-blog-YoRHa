import { css } from '@emotion/react'

export const PrismStyle = css`
  /**
 * CSS Styles for code highlighting.
 * Feel free to customize token styles 
 * by copying from a prismjs compatible theme:
 * https://github.com/PrismJS/prism-themes
 */

  code[class*='language-'],
  pre {
    background-color: #dcd8c0;
    font-family: monospace;
    width: 100%;
    overflow: scroll;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #586e75;
  }

  .token.punctuation {
    color: #93a1a1;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.keyword,
  .token.tag {
    color: #268bd2;
  }

  .token.class-name {
    color: #586e75;
    text-decoration: underline;
  }

  .token.boolean,
  .token.constant {
    color: #b58900;
  }

  .token.symbol,
  .token.deleted {
    color: #dc322f;
  }

  .token.number {
    color: #859900;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #859900;
  }

  .token.variable {
    color: #268bd2;
  }

  .token.operator {
    color: #586e75;
  }

  .token.function {
    color: #268bd2;
  }

  .token.regex {
    color: #e9c062;
  }

  .token.important {
    color: #fd971f;
  }

  .token.entity {
    color: #586e75;
    cursor: help;
  }

  .token.url {
    color: #96cbfe;
  }

  .language-css .token.string,
  .style .token.string {
    color: #87c38a;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.atrule,
  .token.attr-value {
    color: #f9ee98;
  }
`
