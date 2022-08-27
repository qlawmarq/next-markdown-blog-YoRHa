import React from 'react'
import { ThemeProvider as EmotionThemeProvider, Global, css } from '@emotion/react'
import { theme, ResetStyle, PrismStyle } from '@/theme/index'

type PropsType = {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<PropsType> = ({ children }) => {
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
          }
          ::-webkit-scrollbar {
            width: 12px;
            height: 12px;
            background-color: ${theme.colors.backgroundColor};
          }
          ::-webkit-scrollbar-track {
            background-color: ${theme.colors.backgroundColor};
          }
          ::-webkit-scrollbar-thumb {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          }
        `}
      />
      {children}
    </EmotionThemeProvider>
  )
}
