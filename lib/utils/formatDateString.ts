import { DEFAULT_SEO } from '@/data/siteMetadata'

const formatDateString = (dateString: string) =>
  new Date(dateString).toLocaleDateString(DEFAULT_SEO.openGraph?.locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default formatDateString
