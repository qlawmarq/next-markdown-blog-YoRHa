import React from 'react'
import { Anchor } from '@/components/atoms/Typography'
import { HeaderStyle, InnerStyle } from './style'
import Logo from './moon_logo.svg'

const Header: React.FC = () => {
  return (
    <header css={HeaderStyle}>
      <div css={InnerStyle}>
        <Anchor href="/">
          <Logo width="120" height="120" />
        </Anchor>
      </div>
    </header>
  )
}

export default Header
