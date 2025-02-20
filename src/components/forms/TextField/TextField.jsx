import React, { useState } from 'react'

const TextField = ({ onChange, className, placeholder, id, label }) => {
    const defaultClassNames = "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
    const combinedClassNames = className ? `${defaultClassNames} ${className}` : defaultClassNames

    const defaultPlaceholder = "Enter text..."
    const assignedPlaceholder = placeholder ? placeholder : defaultPlaceholder

    const defaultLabel = "Enter text:"
    const assignedLabel = label ? label : defaultLabel

    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
        onChange(e.target.value)
    }

    return (
        <>
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-2"
                >
                    {assignedLabel}
                </label>
            )}
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={assignedPlaceholder}
                className={combinedClassNames}
                id={id}
            />
        </>
    )
}

export default TextField
