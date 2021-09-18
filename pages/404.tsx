import React from 'react'
import { Link } from '@/components/atoms/Link'
import { H1, Paragraph } from '@/components/atoms/Typography'

const FourZeroFour: React.FC = () => {
  return (
    <div>
      <div>
        <H1>404</H1>
      </div>
      <div>
        <Paragraph>Sorry we couldn't find this page.</Paragraph>
        <Paragraph>But dont worry, you can find plenty of other things on our homepage.</Paragraph>
        <Link href="/">Back to homepage</Link>
      </div>
    </div>
  )
}
export default FourZeroFour
