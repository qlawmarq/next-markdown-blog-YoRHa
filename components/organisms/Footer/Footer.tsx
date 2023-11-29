import React from 'react'
import { Span } from '@/components/atoms/Typography'
import { FooterStyle } from './style'
import { DEFAULT_SEO } from '@/constants/siteMetadata'
import { Border } from '@/components/atoms/Border'
import { Container } from '@/components/atoms/Container'

const Footer: React.FC = () => {
  return (
    <footer css={FooterStyle}>
      <Border />
      <Container>
        <Span className="footer-text">{`Copyright © ${new Date().getFullYear()} ${
          DEFAULT_SEO.openGraph.profile.firstName + ' ' + DEFAULT_SEO.openGraph.profile.lastName
        }. All Rights Reserved.`}</Span>
      </Container>
    </footer>
  )
}

export default Footer
