import React from 'react'
import NextImage from 'next/image'
import { ImageProps } from 'next/image'

const Image: React.FC<ImageProps> = ({ src, alt, ...rest }) => (
  <NextImage src={src} alt={alt} {...rest} />
)

export default Image
