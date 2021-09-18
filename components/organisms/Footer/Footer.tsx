import React from 'react'
import { Paragraph } from '@/components/atoms/Typography'
import { siteMetadata } from '@/data/siteMetadata'
import { FooterStyle } from './style'

const Footer: React.FC = () => {
  return (
    <footer css={FooterStyle}>
      <div>
        <Paragraph>{`© ${new Date().getFullYear()} ${
          siteMetadata.author
        }, All Rights Reserved.`}</Paragraph>
      </div>
    </footer>
  )
}

export default Footer
