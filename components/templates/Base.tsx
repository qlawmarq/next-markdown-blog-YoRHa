import React from 'react'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { InnerStyle, OuterStyle, UpLeftCircleStyle, DownRightCircleStyle } from './style'
import DownRightCircle from './svg/down_right_circle.svg'
import UpLeftCircle from './svg/up_left_circle.svg'

type PropsType = {
  onClickMenuItem: (item: string) => void
}

const BaseLayout: React.FC<PropsType> = ({ children, onClickMenuItem }) => {
  return (
    <div css={OuterStyle}>
      <UpLeftCircle css={UpLeftCircleStyle} />
      <DownRightCircle css={DownRightCircleStyle}/>
      <Header onClickMenuItem={onClickMenuItem} />
      <main css={InnerStyle}>{children}</main>
      <Footer />
    </div>
  )
}

export default BaseLayout
