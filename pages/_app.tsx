import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@/theme/index'
import Base from '@/components/templates/Base'
import { DefaultSeo } from 'next-seo'
import { DEFAULT_SEO } from '@/data/siteMetadata'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(href)
  }
  return (
    <ThemeProvider>
      <DefaultSeo {...DEFAULT_SEO} />
      <Base onClickMenuItem={handleClick}>
        <Component {...pageProps} />
      </Base>
    </ThemeProvider>
  )
}
