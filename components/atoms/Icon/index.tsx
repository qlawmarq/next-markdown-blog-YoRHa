import { IconStyle } from './style'
import Mail from './mail.svg'
import Twitter from './twitter.svg'

// Icons taken from: https://simpleicons.org/

export const TwitterIcon = ({ href }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <Twitter css={IconStyle} />
  </a>
)
export const MailIcon = ({ href }) => (
  <a href={href}>
    <Mail css={IconStyle} />
  </a>
)
