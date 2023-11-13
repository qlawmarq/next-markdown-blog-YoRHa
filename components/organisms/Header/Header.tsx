import React from 'react'

import { HeaderLogoStyle, HeaderStyle } from './style'
import { Border } from '@/components/atoms/Border'

type PropsType = {
  onClickMenuItem: (item: string) => void
}

const Header: React.FC<PropsType> = ({ onClickMenuItem }) => {
  return (
    <header css={HeaderStyle}>
      <div onClick={() => onClickMenuItem('/')} css={HeaderLogoStyle} />
      <Border />
    </header>
  )
}

export default Header
