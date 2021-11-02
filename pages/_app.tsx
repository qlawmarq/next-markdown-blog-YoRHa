import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@/theme/index'

import Head from 'next/head'
import Base from '@/components/templates/Base'

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
      <Base onClickMenuItem={handleClick}>
        <Component {...pageProps} />
      </Base>
    </ThemeProvider>
  )
}
