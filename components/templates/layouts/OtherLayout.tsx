import React from 'react'
import { commonLayoutStyle } from './style'

type PropsType = {
  children: React.ReactNode
}

const OtherLayout: React.FC<PropsType> = ({ children }) => {
  return <div css={commonLayoutStyle}>{children}</div>
}
export default OtherLayout
