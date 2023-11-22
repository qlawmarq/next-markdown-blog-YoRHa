import React from 'react'
import { H1, Paragraph } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { NextSeo } from 'next-seo'

const NotFoundLayout: React.FC = () => {
  return (
    <>
      <NextSeo title="404 NOT FOUND" noindex nofollow />
      <div>
        <H1>404 NOT FOUND</H1>
        <Paragraph>Sorry we couldn&apos;t find this page.</Paragraph>
        <Anchor href="/">Back to Home</Anchor>
      </div>
    </>
  )
}
export default NotFoundLayout
