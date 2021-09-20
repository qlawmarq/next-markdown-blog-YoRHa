import { css } from '@emotion/react'
import { colors, fontSize } from '@/constants//styles'

export const style = css`
  &[type='text'],
  &[type='password'],
  &[type='url'],
  &[type='email'],
  &[type='tel'],
  &[type='search'],
  &[type='number'],
  &[type='color'],
  &[type='date'],
  &[type='month'],
  &[type='week'],
  &[type='datetime'],
  &[type='datetime-local'] {
    padding: 0.5rem;
    font-size: 1em;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    background-color: #dcd8c0;
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
  }
  &[type='submit']:not(:disabled),
  &[type='button']:not(:disabled),
  &[type='reset']:not(:disabled) {
    padding: 0.5rem;
    font-size: 1em;
    border: none;
    outline: none;
    appearance: none;
    border-radius: 0;
    background-color: #bab5a1;
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    cursor: pointer;
    transition-duration: 0.2s;
    transition-property: color, background-color, box-shadow;
  }
  &[type='submit']:not(:disabled):hover,
  &[type='button']:not(:disabled):hover,
  &[type='reset']:not(:disabled):hover {
    -webkit-box-shadow: 0.2em 0.2em 0.1em 0 #bab5a1;
    box-shadow: 0.2em 0.2em 0.1em 0 #bab5a1;
  }
  &[type='submit']:not(:disabled):hover,
  &[type='button']:not(:disabled):hover,
  &[type='reset']:not(:disabled):hover {
    background-color: #454138;
    color: #dcd8c0;
  }
  &[type='submit']:not(:disabled):active,
  &[type='button']:not(:disabled):active,
  &[type='reset']:not(:disabled):active {
    background-color: #dcd8c0;
    color: #454138;
  }
  &:disabled {
    padding: 0.5rem;
    font-size: 1em;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    background-color: #dcd8c0;
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    color: #bab5a1;
    cursor: not-allowed;
  }
`
