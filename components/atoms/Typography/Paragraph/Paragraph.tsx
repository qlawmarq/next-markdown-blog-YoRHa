import React, { HtmlHTMLAttributes } from 'react'

export const Paragraph: React.FC<HtmlHTMLAttributes<HTMLParagraphElement>> = ({ ...props }) => {
  return <p {...props}>{props.children}</p>
}
