import NextImage from 'next/image'

const Image = ({ src, ...rest }) => <NextImage src={src} {...rest} />

export default Image
