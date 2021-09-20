import { css } from '@emotion/react'
import { fontSize } from '@/constants//styles'

export const style = css`
  cursor: pointer;
  display: inline-block;
  margin: 0 0.15em 0.25em 0;
  padding: 0.25rem;
  line-height: 1;
  text-decoration: none;
  font-size: ${fontSize.S};
  background-color: #bab5a1;
  border: 0.05rem solid #454138;
  border-left: 0.25rem solid #454138;
  transition: all 0.2s ease-out;
  &:hover {
    background-color: #dcd8c0;
  }
`
