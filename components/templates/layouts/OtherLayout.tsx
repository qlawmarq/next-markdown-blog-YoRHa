import React from 'react'
import { commonLayoutStyle } from './lStyle'

const OtherLayout: React.FC = ({ children }) => {
  return <div css={commonLayoutStyle}>{children}</div>
}
export default OtherLayout
