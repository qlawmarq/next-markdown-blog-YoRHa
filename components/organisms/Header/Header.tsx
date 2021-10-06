import React from 'react'
import { Menu } from '@/components/molecules/Menu'
import headerNavLinks from '@/data/headerNavLinks'
import { HeaderStyle, InnerStyle } from './style'
import Logo from './header_logo.svg'

type PropsType = {
  onClickMenuItem: (item: string) => void
}

const Header: React.FC<PropsType> = ({ onClickMenuItem }) => {
  return (
    <header css={HeaderStyle}>
      <div>
        <Logo height={64} width={`100%`} />
      </div>
      <div css={InnerStyle}>
        <Menu Items={headerNavLinks} onClickItem={onClickMenuItem} />
      </div>
    </header>
  )
}

export default Header
