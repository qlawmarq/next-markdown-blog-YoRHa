import { siteMetadata } from '@/data/siteMetadata'

const formatDateString = (dateString: string) =>
  new Date(dateString).toLocaleDateString(siteMetadata.locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default formatDateString
