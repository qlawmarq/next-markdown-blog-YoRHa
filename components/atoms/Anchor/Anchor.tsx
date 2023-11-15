import React, { AnchorHTMLAttributes } from 'react'
import { AnchorLinkStyle } from './style'
import { useRouter } from 'next/router'
import { ButtonStyle } from '../Button/style'

export const Anchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  children,
  role,
  ...rest
}) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  const router = useRouter()
  const style = role === 'button' ? ButtonStyle : AnchorLinkStyle

  if (isInternalLink) {
    return (
      <a css={style} {...rest} onClick={() => router.push({ pathname: href })}>
        {children}
      </a>
    )
  }

  if (isAnchorLink) {
    return (
      <a css={style} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  )
}
