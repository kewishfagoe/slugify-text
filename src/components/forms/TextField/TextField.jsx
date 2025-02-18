import React, { useState } from 'react'

const TextField = ({ onChange, className, placeholder }) => {
    const defaultClassNames = "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
    const combinedClassNames = className ? `${defaultClassNames} ${className}` : defaultClassNames

    const defaultPlaceholder = "Enter text"
    const assignedPlaceholder = placeholder ? placeholder : defaultPlaceholder

    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
        onChange(e.target.value)
    }

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={assignedPlaceholder}
            className={combinedClassNames}
        />
    )
}

export default TextField
