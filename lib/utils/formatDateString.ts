const formatDateString = (dateString: string, locale: Intl.LocalesArgument = 'en') =>
  new Date(dateString).toLocaleDateString(locale, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export default formatDateString
