import React from 'react'
import { PageSEO } from '@/lib/SEO'
import { siteMetadata } from '@/data/siteMetadata'
import { H1, Paragraph, Anchor } from '@/components/atoms/Typography'

const FourZeroFour: React.FC = () => {
  return (
    <>
      <PageSEO title={`${siteMetadata.title} - 404 NOT FOUND`} description={`404 NOT FOUND`} />
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
