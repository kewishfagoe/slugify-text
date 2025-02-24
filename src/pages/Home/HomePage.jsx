import React from 'react'
import { APP_NAME } from '@utils/constants/globals.constants'
import Header from '@components/blocks/Header'
import Footer from '@components/blocks/Footer'
import CenteredLayout from '@components/layout/CenteredLayout'
import SlugifyTextForm from '@pages/Home/SlugifyTextForm'

const HomePage = () => {
  return (
    <>
        <Header text={APP_NAME} />
        <CenteredLayout>
            <SlugifyTextForm />
        </CenteredLayout>
        <Footer />
    </>
  )
}

export default HomePage
