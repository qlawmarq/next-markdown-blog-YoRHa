import { css } from '@emotion/react'
import { theme } from '@/theme/index'
import { ButtonStyle } from '@/components/atoms/Button/style'

export const style = css`
  width: 100%;
  margin: 0;
  padding: 0;
  ul {
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    li {
      list-style-type: none;
      width: 100%;
      .nav_button {
        ${ButtonStyle}
        &:not(:disabled) {
          background-color: transparent;
          display: flex;
          justify-content: center;
          margin: auto;
          font-size: ${theme.fontSizes.S};
          width: 100%;
        }
        &.active {
          color: ${theme.colors.primaryColor};
          background-color: ${theme.colors.secondaryColor};
          &:before {
            bottom: -0.5rem;
            border: solid ${theme.colors.secondaryColor};
            border-width: 0.1rem 0;
          }
        }
      }
    }
  }
`
