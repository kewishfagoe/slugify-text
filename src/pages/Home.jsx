import React from 'react'
import Header from '../components/blocks/Header'
import { APP_NAME } from '../utils/constants/globals.constants';

const Home = () => {
  return (
    <>
        <Header text={APP_NAME} />
    </>
  )
}

export default Home
