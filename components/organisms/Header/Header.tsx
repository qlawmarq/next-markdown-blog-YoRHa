import React from 'react'
import { TwitterIcon, MailIcon } from '@/components/atoms/SocialIcons'
import { HeaderStyle, MenuAreaStyle, IconStyle } from './style'
import { siteMetadata } from '@/data/siteMetadata'

const Header: React.FC = () => {
  return (
    <header css={HeaderStyle}>
      <div css={MenuAreaStyle}>
        <div>
          {siteMetadata.twitter && <TwitterIcon href={siteMetadata.twitter} />}
          {siteMetadata.email && <MailIcon href={`mailto:${siteMetadata.email}`} />}
        </div>
      </div>
    </header>
  )
}

export default Header
