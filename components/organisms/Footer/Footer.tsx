import React from 'react'
import { Span } from '@/components/atoms/Typography'
import { FooterStyle } from './style'
import { DEFAULT_SEO } from '@/constants/siteMetadata'
import { Border } from '@/components/atoms/Border'

const Footer: React.FC = () => {
  return (
    <footer css={FooterStyle}>
      <Border />
      <Span style={{ marginBottom: '1rem' }}>{`Copyright © ${new Date().getFullYear()} ${
        DEFAULT_SEO.profile.username
      }. All Rights Reserved.`}</Span>
    </footer>
  )
}

export default Footer
