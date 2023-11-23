import React from 'react'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { BottomRightCircleStyle, InnerStyle, OuterStyle, UpLeftCircleStyle } from './style'
import { Container } from '@/components/atoms/Container'

type PropsType = {
  children: React.ReactNode
  // eslint-disable-next-line no-unused-vars
  onClickMenuItem: (item: string) => void
}

const BaseLayout: React.FC<PropsType> = ({ children, onClickMenuItem }) => {
  return (
    <div css={OuterStyle}>
      <div css={UpLeftCircleStyle} />
      <div css={BottomRightCircleStyle} />
      <Header onClickMenuItem={onClickMenuItem} />
      <main css={InnerStyle}>
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  )
}

export default BaseLayout
