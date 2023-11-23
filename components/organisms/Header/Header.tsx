import React from 'react'
import { HeaderStyle } from './style'
import { Border } from '@/components/atoms/Border'
import { Menu } from '@/components/molecules/Menu'
import { menuItems as items } from '@/constants/menu'
import { Container } from '@/components/atoms/Container'

type PropsType = {
  onClickMenuItem: (_item: string) => void
}

const Header: React.FC<PropsType> = ({ onClickMenuItem }) => {
  return (
    <header css={HeaderStyle}>
      <Container>
        <Menu onClickMenuItem={onClickMenuItem} items={items} />
      </Container>
      <Border />
    </header>
  )
}

export default Header
