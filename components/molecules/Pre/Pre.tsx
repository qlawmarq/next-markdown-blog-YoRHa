import React, { useState, useRef, HtmlHTMLAttributes } from 'react'
import { Button } from '@/components/atoms/Button'

export const Pre: React.FC<HtmlHTMLAttributes<HTMLPreElement>> = (props) => {
  const textInput = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      style={{ position: 'relative', lineHeight: '1rem' }}
    >
      {hovered && (
        <Button
          aria-label="Copy code"
          type="button"
          onClick={onCopy}
          style={{ position: 'absolute', right: 0 }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      )}

      <pre {...props}>{props.children}</pre>
    </div>
  )
}
