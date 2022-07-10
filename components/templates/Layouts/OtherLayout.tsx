import React from 'react'
import { commonLayoutStyle } from '@/components/templates/Layouts/style'

const OtherLayout: React.FC = ({ children }) => {
  return <div css={commonLayoutStyle}>{children}</div>
}
export default OtherLayout
