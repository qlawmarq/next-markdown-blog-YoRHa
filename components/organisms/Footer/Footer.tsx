import React from 'react'
import { Paragraph } from '@/components/atoms/Typography'
import { siteMetadata } from '@/data/siteMetadata'
import { TwitterIcon, MailIcon } from '@/components/atoms/Icon'
import { FooterStyle, BorderStyle } from './style'
import Line from '../line.svg'

const Footer: React.FC = () => {
  return (
    <footer css={FooterStyle}>
      <div css={BorderStyle}>
        <Line />
      </div>
      <div>
        {siteMetadata.twitter && <TwitterIcon href={siteMetadata.twitter} />}
        {siteMetadata.email && <MailIcon href={`mailto:${siteMetadata.email}`} />}
      </div>
      <div>
        <Paragraph>{`© ${new Date().getFullYear()} ${
          siteMetadata.author
        }, All Rights Reserved.`}</Paragraph>
      </div>
    </footer>
  )
}

export default Footer
