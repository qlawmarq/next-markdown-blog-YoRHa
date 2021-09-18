import React from 'react'
import { siteMetadata } from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import SectionContainer from '@/components/SectionContainer'
import ThemeSwitch from '@/components/ThemeSwitch'

const LayoutWrapper: React.FC = ({ children }) => {
  return (
    <SectionContainer>
      <header>
        <div>
          <Link href="/" aria-label="Tailwind CSS Blog">
            {siteMetadata.headerTitle}
          </Link>
        </div>
        <div>
          {headerNavLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              {link.title}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div>
          <div>
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
            <SocialIcon kind="github" href={siteMetadata.github} />
            <SocialIcon kind="facebook" href={siteMetadata.facebook} />
            <SocialIcon kind="youtube" href={siteMetadata.youtube} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
            <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          </div>
          <div>
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/">{siteMetadata.title}</Link>
          </div>
        </div>
      </footer>
    </SectionContainer>
  )
}

export default LayoutWrapper
