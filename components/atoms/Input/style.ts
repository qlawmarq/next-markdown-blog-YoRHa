import { css } from '@emotion/react'
import { theme } from '@/theme/index'

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
    background-color: ${theme.colors.primaryColor};
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
    background-color: ${theme.colors.tertiaryColor};
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    cursor: pointer;
    transition-duration: 0.5s;
    transition-property: color, background-color, box-shadow;
  }
  &[type='submit']:not(:disabled):hover,
  &[type='button']:not(:disabled):hover,
  &[type='reset']:not(:disabled):hover {
    -webkit-box-shadow: 0.2em 0.2em 0.1em 0 ${theme.colors.tertiaryColor};
    box-shadow: 0.2em 0.2em 0.1em 0 ${theme.colors.tertiaryColor};
  }
  &[type='submit']:not(:disabled):hover,
  &[type='button']:not(:disabled):hover,
  &[type='reset']:not(:disabled):hover {
    background-color: ${theme.colors.secondaryColor};
    color: ${theme.colors.primaryColor};
  }
  &[type='submit']:not(:disabled):active,
  &[type='button']:not(:disabled):active,
  &[type='reset']:not(:disabled):active {
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.secondaryColor};
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
    background-color: ${theme.colors.primaryColor};
    color: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    font-weight: inherit;
    color: ${theme.colors.tertiaryColor};
    cursor: not-allowed;
  }
`
