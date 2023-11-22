import React from 'react'
import { SpinnerStyle } from './style'

export const Spinner: React.FC = () => {
  return (
    <div css={SpinnerStyle}>
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
