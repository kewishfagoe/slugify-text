import React from 'react'

const Button = ({ onClick, children, className }) => {

    const defaultClassNames = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none cursor-pointer";

    const combinedClassNames = className ? `${defaultClassNames} ${className}` : defaultClassNames;

    return (
        <button
            onClick={onClick}
            className={combinedClassNames}
        >
            {children}
        </button>
    )
}

export default Button;
