import React from 'react'
import { TwitterIcon, MailIcon } from '@/components/atoms/SocialIcons'
import { Link } from '@/components/atoms/Link'
import { HeaderStyle, IconAreaStyle } from './style'
import { siteMetadata } from '@/data/siteMetadata'

const Header: React.FC = () => {
  return (
    <header css={HeaderStyle}>
      <div css={IconAreaStyle}>
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        {siteMetadata.twitter && <TwitterIcon href={siteMetadata.twitter} />}
        {siteMetadata.email && <MailIcon href={`mailto:${siteMetadata.email}`} />}
      </div>
    </header>
  )
}

export default Header
