import React from 'react'
import { Menu } from '@/components/molecules/Menu'
import headerNavLinks from '@/data/headerNavLinks'
import { HeaderStyle, borderStyle } from './style'
import Logo from './header_logo.svg'
import Line from '../line.svg'

type PropsType = {
  onClickMenuItem: (item: string) => void
}

const Header: React.FC<PropsType> = ({ onClickMenuItem }) => {
  return (
    <header css={HeaderStyle}>
      <Menu Items={headerNavLinks} onClickItem={onClickMenuItem} />
      <div css={borderStyle}>
        <Line/>
      </div>
    </header>
  )
}

export default Header
