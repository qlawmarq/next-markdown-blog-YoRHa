import React from 'react'
import { HeaderStyle } from './style'
import { Border } from '@/components/atoms/Border'
import { Menu } from '@/components/molecules/Menu'
import { menuItems as items } from '@/constants/menu'

type PropsType = {
  onClickMenuItem: (item: string) => void
}

const Header: React.FC<PropsType> = ({ onClickMenuItem }) => {
  return (
    <header css={HeaderStyle}>
      <Menu onClickMenuItem={onClickMenuItem} items={items} />
      <Border />
    </header>
  )
}

export default Header
