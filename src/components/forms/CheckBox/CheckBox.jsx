import React from 'react'

const CheckBox = ({ label, id, className, onClick }) => {
    const defaultClassNames = "flex items-center"
    const combinedClassNames = className ? `${defaultClassNames} ${className}` : defaultClassNames

    const defaultLabel = "Default checkbox"
    const assignedLabel = label ? label : defaultLabel

    const handleClick = (e) => {
        onClick(e.target.checked)
    }

    return (
        <div className={combinedClassNames}>
            <input
                id={id}
                type="checkbox"
                onClick={handleClick}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 "
            />
            <label
                htmlFor={id}
                className="ml-2 block text-base text-gray-900"
            >
                {assignedLabel}
            </label>
        </div>
    )
}

export default CheckBox
