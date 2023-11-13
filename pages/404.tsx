import React from 'react'
import { NextSeo } from 'next-seo'
import NotFoundLayout from '@/components/templates/layouts/NotFoundLayout'

const FourZeroFour: React.FC = () => {
  return (
    <>
      <NextSeo
        title={'404 NOT FOUND'}
        description={'The link you followed may be broken, or the page may have been removed.'}
        noindex
      />
      <NotFoundLayout />
    </>
  )
}
export default FourZeroFour
