import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@/theme/index'
import Base from '@/components/templates/common/Base'
import { DEFAULT_SEO } from '@/constants/siteMetadata'
import { DefaultSeo } from 'next-seo'

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
