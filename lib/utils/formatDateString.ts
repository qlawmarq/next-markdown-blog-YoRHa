import { siteMetadata } from '@/data/siteMetadata'

const formatDateString = (dateString: string) =>
  new Date(dateString).toLocaleDateString(siteMetadata.language, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default formatDateString
