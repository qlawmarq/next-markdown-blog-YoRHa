import React from 'react'
import { commonLayoutStyle } from './commonStyles'

const OtherLayout: React.FC = ({ children }) => {
  return <div css={commonLayoutStyle}>{children}</div>
}
export default OtherLayout
