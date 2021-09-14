import React from 'react'
import NextImage from 'next/image'

type PropsType = {
  src: string
}

const Image: React.FC<PropsType> = ({ src, ...rest }) => <NextImage src={src} {...rest} />

export default Image
