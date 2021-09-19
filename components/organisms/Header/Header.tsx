import React from 'react'
import { Link } from '@/components/atoms/Link'
import { HeaderStyle, InnerStyle } from './style'
import Logo from './moon_logo.svg'

const Header: React.FC = () => {
  return (
    <header css={HeaderStyle}>
      <div css={InnerStyle}>
        <Link href="/">
          <Logo width="120" height="120" />
        </Link>
      </div>
    </header>
  )
}

export default Header
