import React from 'react'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { InnerStyle, OuterStyle } from './style'

type PropsType = {
  onClickMenuItem: (item: string) => void
}

const BaseLayout: React.FC<PropsType> = ({ children, onClickMenuItem }) => {
  return (
    <div css={OuterStyle}>
      <Header onClickMenuItem={onClickMenuItem} />
      <main css={InnerStyle}>{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
