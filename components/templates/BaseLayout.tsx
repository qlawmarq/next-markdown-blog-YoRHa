import React from 'react'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { InnerStyle, OuterStyle } from './style'

const BaseLayout: React.FC = ({ children }) => {
  return (
    <div css={OuterStyle}>
      <Header />
      <main css={InnerStyle}>{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
