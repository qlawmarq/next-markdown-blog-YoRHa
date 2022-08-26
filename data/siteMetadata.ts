export const DEFAULT_SEO = {
  titleTemplate: 'Next.js Blog | %s',
  defaultTitle: 'Next.js Blog',
  description:
    'Blog template with Next.js.',
  canonical: 'https://next-playground.vercel.app/',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://next-playground.vercel.app/',
    title: 'Next.js Blog',
    description:
      'Blog template with Next.js.',
    site_name: 'Next.js Blog',
    images: [
      {
        url: 'https://next-playground.vercel.app/static/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Og Image',
      },
    ],
  },
  twitter: {
    handle: '@cymagix',
    cardType: 'summary',
  },
}
