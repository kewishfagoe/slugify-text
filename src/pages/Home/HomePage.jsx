import React from 'react'
import { APP_NAME } from '@utils/constants/globals.constants'
import Header from '@components/blocks/Header'
import Footer from '@components/blocks/Footer'

const HomePage = () => {
  return (
    <>
        <Header text={APP_NAME} />
        <Footer />
    </>
  )
}

export default HomePage
