import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { APP_NAME } from './utils/constants/general.constants';

function App() {

  return (
    <>
        <Header text={APP_NAME} />
    </>
  )
}

export default App
