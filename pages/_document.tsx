import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <link href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism.min.css' rel='stylesheet'/>
        <link href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/plugins/line-numbers/prism-line-numbers.min.css' rel='stylesheet'/>
        <link href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/plugins/line-highlight/prism-line-highlight.min.css' rel='stylesheet'/>
        <Head />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/prism.min.js'/>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/plugins/line-numbers/prism-line-numbers.min.js'/>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/plugins/line-highlight/prism-line-highlight.min.js'/>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
