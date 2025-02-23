import React from 'react'

const RadioButton = ({ label, value, id, name, onChange, checked }) => {
    return (
        <div className="flex items-center">
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
                className="h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <label
                htmlFor={id}
                className="ml-2 block text-base text-gray-900"
            >
                {label}
            </label>
        </div>
    )
}

export default RadioButton
