import React from 'react'
import { useRouter } from 'next/router'
import { Anchor } from '@/components/atoms/Typography'
import { Menu } from '@/components/molecules/Menu'
import headerNavLinks from '@/data/headerNavLinks'
import { HeaderStyle, InnerStyle } from './style'
import Logo from './header_logo.svg'

const Header: React.FC = () => {
  const router = useRouter()
  const handleClick = (href: string) => {
    router.push(`/${href}`)
  }
  return (
    <header css={HeaderStyle}>
      <div>
        <Logo height={64} width={`100%`} />
      </div>
      <div css={InnerStyle}>
        <Menu Items={headerNavLinks} onClickItem={handleClick} />
      </div>
    </header>
  )
}

export default Header
