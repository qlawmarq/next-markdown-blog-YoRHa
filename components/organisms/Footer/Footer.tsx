import React from 'react'
import { Paragraph } from '@/components/atoms/Typography'
import { FooterStyle, BorderStyle } from './style'
import Line from '../line.svg'

const Footer: React.FC = () => {
  return (
    <footer css={FooterStyle}>
      <div css={BorderStyle}>
        <Line />
      </div>
      <div>
        <Paragraph>{`© ${new Date().getFullYear()} YawnMonday, All Rights Reserved.`}</Paragraph>
      </div>
    </footer>
  )
}

export default Footer
