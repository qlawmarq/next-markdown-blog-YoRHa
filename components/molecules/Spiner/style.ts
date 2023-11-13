import { css } from '@emotion/react'
import { theme } from '@/theme/index'
export const SpinerStyle = css`
  .loading {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .loading div {
    position: absolute;
    width: 16px;
    height: 16px;
    background: ${theme.colors.secondaryColor};
    animation: loading 1.2s linear infinite;
  }
  .loading div:nth-child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }
  .loading div:nth-child(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }
  .loading div:nth-child(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }
  .loading div:nth-child(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }
  .loading div:nth-child(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }
  .loading div:nth-child(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }
  .loading div:nth-child(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  .loading div:nth-child(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }
  .loading div:nth-child(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }
  @keyframes loading {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.25;
    }
  }
`
