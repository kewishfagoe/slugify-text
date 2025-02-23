import React from 'react'

const Button = ({ onClick, children, className, type }) => {

    const baseClassNames = "focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none cursor-pointer";
    const primaryClassNames = "text-white bg-blue-700 hover:bg-blue-800";
    const secondaryClassNames = "text-white bg-gray-500 hover:bg-gray-700";

    const defaultClassNames = type === "secondary" ? `${baseClassNames} ${secondaryClassNames}` : `${baseClassNames} ${primaryClassNames}`

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
