import React from 'react'

const Card = ({ heading, children }) => {
    return (
        <div className="px-8 py-6 my-8 bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-4xl lg:min-w-4xl md:min-w-xl">
            <h2 className="text-xl font-semibold mb-2">{heading}</h2>
            {children}
        </div>
    )
}

export default Card
