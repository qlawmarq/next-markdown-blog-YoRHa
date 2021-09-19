import { css, keyframes } from '@emotion/react'
import { colors } from '@/constants//styles'

const glitch = keyframes`
    0% {
      clip-path: polygon(
        0 2%,
        100% 2%,
        100% 95%,
        95% 95%,
        95% 90%,
        85% 90%,
        85% 95%,
        12% 95%,
        0 70%
      );
    }

    2%,
    12% {
      clip-path: polygon(
        0 78%,
        100% 78%,
        100% 100%,
        95% 100%,
        95% 90%,
        85% 90%,
        85% 100%,
        12% 100%,
        0 78%
      );
      transform: translate(calc(5 * -1%), 0);
    }

    6% {
      clip-path: polygon(
        0 78%,
        100% 78%,
        100% 100%,
        95% 100%,
        95% 90%,
        85% 90%,
        85% 100%,
        12% 100%,
        0 78%
      );
      transform: translate(calc(5 * 1%), 0);
    }

    9% {
      clip-path: polygon(
        0 78%,
        100% 78%,
        100% 100%,
        95% 100%,
        95% 90%,
        85% 90%,
        85% 100%,
        12% 100%,
        0 78%
      );
      transform: translate(0, 0);
    }

    10% {
      clip-path: polygon(
        0 44%,
        100% 44%,
        100% 54%,
        95% 54%,
        95% 54%,
        85% 54%,
        85% 54%,
        12% 54%,
        0 54%
      );
      transform: translate(calc(5 * 1%), 0);
    }

    13% {
      clip-path: polygon(
        0 44%,
        100% 44%,
        100% 54%,
        95% 54%,
        95% 54%,
        85% 54%,
        85% 54%,
        12% 54%,
        0 54%
      );
      transform: translate(0, 0);
    }

    14%,
    21% {
      clip-path: polygon(
        0 0,
        100% 0,
        100% 0,
        95% 0,
        95% 0,
        85% 0,
        85% 0,
        12% 0,
        0 0
      );
      transform: translate(calc(5 * 1%), 0);
    }

    25% {
      clip-path: polygon(
        0 0,
        100% 0,
        100% 0,
        95% 0,
        95% 0,
        85% 0,
        85% 0,
        12% 0,
        0 0
      );
      transform: translate(calc(5 * 1%), 0);
    }

    30% {
      clip-path: polygon(
        0 0,
        100% 0,
        100% 0,
        95% 0,
        95% 0,
        85% 0,
        85% 0,
        12% 0,
        0 0
      );
      transform: translate(calc(5 * -1%), 0);
    }

    35%,
    45% {
      clip-path: polygon(
        0 40%,
        100% 40%,
        100% 85%,
        95% 85%,
        95% 85%,
        85% 85%,
        85% 85%,
        12% 85%,
        0 70%
      );
      transform: translate(calc(5 * -1%));
    }

    40% {
      clip-path: polygon(
        0 40%,
        100% 40%,
        100% 85%,
        95% 85%,
        95% 85%,
        85% 85%,
        85% 85%,
        12% 85%,
        0 70%
      );
      transform: translate(calc(5 * 1%));
    }

    50% {
      clip-path: polygon(
        0 40%,
        100% 40%,
        100% 85%,
        95% 85%,
        95% 85%,
        85% 85%,
        85% 85%,
        12% 85%,
        0 70%
      );
      transform: translate(0, 0);
    }

    55% {
      clip-path: polygon(
        0 63%,
        100% 63%,
        100% 80%,
        95% 80%,
        95% 80%,
        85% 80%,
        85% 80%,
        12% 80%,
        0 70%
      );
      transform: translate(calc(5 * 1%), 0);
    }

    60% {
      clip-path: polygon(
        0 63%,
        100% 63%,
        100% 80%,
        95% 80%,
        95% 80%,
        85% 80%,
        85% 80%,
        12% 80%,
        0 70%
      );
      transform: translate(0, 0);
    }

    31%,
    61%,
    100% {
      clip-path: polygon(
        0 0,
        100% 0,
        100% 0,
        95% 0,
        95% 0,
        85% 0,
        85% 0,
        12% 0,
        0 0
      );
    }
`

export const style = css`
  box-shadow: 0 0 1rem 1rem ${colors.Gray100} inset;
  position: relative;
  margin: 1rem;
  padding: 1rem;
  opacity: 0.9;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 95% 100%, 95% 90%, 85% 90%, 85% 100%, 12% 100%, 0 70%);

  .glitch {
    position: absolute;
    top: calc(0.25rem * -1);
    left: calc(0.25rem * -1);
    right: calc(0.25rem * -1);
    bottom: calc(0.25rem * -1);
    background: ${colors.Orange};
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      95% 100%,
      95% 90%,
      85% 90%,
      85% 100%,
      12% 100%,
      0 70%
    );
    opacity: 0.5;
    animation: ${glitch} 1.5s infinite;
    display: none;
  }

  &:hover .glitch {
    display: block;
  }

  .glitch::before {
    content: '';
    position: absolute;
    top: calc(0.25rem * 1);
    right: calc(0.25rem * 1);
    bottom: calc(0.25rem * 1);
    left: calc(0.25rem * 1);
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      95% 100%,
      95% 90%,
      85% 90%,
      85% 100%,
      12% 100%,
      0 70%
    );
    background: ${colors.Gray100};
    opacity: 0.75;
    z-index: -1;
  }
`
