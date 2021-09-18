import { AppProps } from 'next/app'
import '@/css/prism.css'
import '@/css/reset.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import BaseLayout from '@/components/templates/BaseLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  )
}
