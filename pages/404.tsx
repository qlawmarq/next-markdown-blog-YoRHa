import React from 'react'
import { H1, Paragraph } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'
import { NextSeo } from 'next-seo'

const FourZeroFour: React.FC = () => {
  return (
    <>
      <NextSeo
        title={'404 NOT FOUND'}
        description={'The link you followed may be broken, or the page may have been removed.'}
        noindex
      />
      <div>
        <div>
          <H1>404 NOT FOUND</H1>
        </div>
        <div>
          <Paragraph>Sorry we couldn't find this page.</Paragraph>
          <Anchor href="/">Back to Home</Anchor>
        </div>
      </div>
    </>
  )
}
export default FourZeroFour
