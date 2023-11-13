import React from 'react'
import { H1, Paragraph } from '@/components/atoms/Typography'
import { Anchor } from '@/components/atoms/Anchor'

const NotFoundLayout: React.FC = () => {
  return (
    <div>
      <div>
        <H1>404 NOT FOUND</H1>
      </div>
      <div>
        <Paragraph>Sorry we couldn&apos;t find this page.</Paragraph>
        <Anchor href="/">Back to Home</Anchor>
      </div>
    </div>
  )
}
export default NotFoundLayout
