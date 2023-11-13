import React from 'react'
import { SpinerStyle } from './style'

export const Spiner: React.FC = () => {
  return (
    <div css={SpinerStyle}>
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
