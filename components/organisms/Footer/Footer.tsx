import React from 'react'
import { Paragraph } from '@/components/atoms/Typography'
import { FooterStyle, BorderStyle } from './style'
import Line from '../line.svg'
import { DEFAULT_SEO } from '@/data/siteMetadata'

const Footer: React.FC = () => {
  return (
    <footer css={FooterStyle}>
      <div css={BorderStyle}>
        <Line />
      </div>
      <div>
        <Paragraph>{`Copyright © ${new Date().getFullYear()} ${
          DEFAULT_SEO.profile.username
        }. All Rights Reserved.`}</Paragraph>
      </div>
    </footer>
  )
}

export default Footer
