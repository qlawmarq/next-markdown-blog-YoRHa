import React, { AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { style } from './style'
import { useRouter } from 'next/router'

export const Anchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  children,
  ...rest
}) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  const router = useRouter()

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
