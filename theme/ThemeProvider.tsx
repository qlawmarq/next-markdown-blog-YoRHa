import React from 'react'
import { ThemeProvider as EmotionThemeProvider, Global, css } from '@emotion/react'
import { theme, ResetStyle, PrismStyle } from '@/theme/index'

export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <Global
        styles={css`
          ${ResetStyle}
          ${PrismStyle}
          :root {
            font-family: ${theme.font};
            letter-spacing: 0.03rem;
            font-weight: lighter;
            background-color: ${theme.colors.backgroundColor};
            color: ${theme.colors.secondaryColor};
            background-size: 0.3rem 0.3rem;
            background-image: linear-gradient(to right, #ccc8b1 1px, rgba(204, 200, 177, 0) 1px),
              linear-gradient(to bottom, #ccc8b1 1px, rgba(204, 200, 177, 0) 1px);
            box-shadow: inset 0 0 150px rgba(77, 73, 62, 0.4), inset 0 0 150px rgba(77, 73, 62, 0.3);
          }
        `}
      />
      {children}
    </EmotionThemeProvider>
  )
}
