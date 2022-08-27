import React, { useState, useRef } from 'react'
import { Button } from '@/components/atoms/Button'

type PropsType = {
  children: React.ReactNode
}

const Pre: React.FC<PropsType> = (props) => {
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
          Copy
        </Button>
      )}

      <pre>{props.children}</pre>
    </div>
  )
}

export default Pre
