import React from 'react'
import { Paragraph } from '@/components/atoms/Typography'
import { FooterStyle } from './style'
import { DEFAULT_SEO } from '@/data/siteMetadata'
import { Border } from '@/components/atoms/Border'

const Footer: React.FC = () => {
  return (
    <footer css={FooterStyle}>
      <Border />
      <div>
        <Paragraph>{`Copyright © ${new Date().getFullYear()} ${
          DEFAULT_SEO.profile.username
        }. All Rights Reserved.`}</Paragraph>
      </div>
    </footer>
  )
}

export default Footer
