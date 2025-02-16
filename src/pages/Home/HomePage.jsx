import React from 'react'
import Header from '@components/blocks/Header'
import { APP_NAME } from '@utils/constants/globals.constants'

const HomePage = () => {
  return (
    <>
        <Header text={APP_NAME} />
    </>
  )
}

export default HomePage
