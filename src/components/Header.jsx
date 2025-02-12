import React from 'react'

const Header = ({ text }) => {
  return (
    <header className="bg-primary">
        <h1 className="text-3xl font-bold underline text-white p-5">
            {text}
        </h1>
    </header>
  )
}

export default Header
