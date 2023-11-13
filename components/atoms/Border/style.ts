import { css } from '@emotion/react'
import { theme } from '@/theme/index'

export const BorderStyle = css`
  border-top: 1px solid ${theme.colors.secondaryColor};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 0.125fr 4fr 0.125fr;
  grid-template-areas: '. background .';
  span {
    grid-area: background;
    display: block;
    background-image: url(/static/images/border.png);
    background-repeat: repeat-x;
  }
`
