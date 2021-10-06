import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@/theme/index'

import Head from 'next/head'
import BaseLayout from '@/components/templates/BaseLayout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/${href}`)
  }
  return (
    <ThemeProvider>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <BaseLayout onClickMenuItem={handleClick}>
        <Component {...pageProps} />
      </BaseLayout>
    </ThemeProvider>
  )
}
