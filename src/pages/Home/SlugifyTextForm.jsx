import React, { useState } from 'react'
import Card from '@components/layout/Card'
import TextField from '@components/forms/TextField/TextField'
import RadioButton from '@components/forms/RadioButton/RadioButton'
import Button from '@components/forms/Button/Button'

const SlugifyTextForm = () => {
    const [textFieldInputValue, setTextFieldInputValue] = useState("")
    const [slugifiedTextValue, setSlugifiedTextValue] = useState("")
    const [selectedRadioButtonValue, setSelectedRadioButtonValue] = useState("dash")

    const handleTextFieldChange = (value) => {
        setTextFieldInputValue(value)
    }

    const handleRadioButtonChange = (event) => {
        setSelectedRadioButtonValue(event.target.value)
    }

    const handleSlugifyTextClick = () => {
        // TODO: check input is empty or consists of spaces, if yes, return and display error message

        let separator = " "
        if (selectedRadioButtonValue === "dash") { separator = "-" }
        if (selectedRadioButtonValue === "underscore") { separator = "_" }

        const words = textFieldInputValue.split(" ")

        const slugifiedText = words
                                .map((word) => word.trim())
                                .map((word) => word.toLowerCase())
                                .map((word) => word.replace(/[-_]/g, "")) // Remove hyphens and underscores
                                .map((word) => word.replace(/[^\w\s-]/g, "")) // Remove any special characters except for letters, numbers, spaces, and hyphens
                                .map((word) => word.toLowerCase())
                                .filter((element) => element) // Remove empty array elements
                                // .filter(function (element) { return element }) // Remove empty array elements
                                .join(separator)

        setSlugifiedTextValue(slugifiedText)

        // TODO: store input and output value in localstorage with date
    }

    const handleClearTextFieldClick = () => {
        setTextFieldInputValue("")
        setSlugifiedTextValue("")
    }

    return (
        <>
            <Card heading="Input:">
                <TextField
                    value={textFieldInputValue}
                    onChange={handleTextFieldChange}
                    placeholder="Enter text to slugify..."
                    id="slugifyTextInput"
                />
                {/* TODO: Add error message here */}

                <p className="text-base text-gray-600 mt-4 mb-2">Separate with:</p>
                <RadioButton
                    label="Dash [ - ]"
                    value="dash"
                    name="separateOptions"
                    onChange={handleRadioButtonChange}
                    id="dashRadioButton"
                    checked={selectedRadioButtonValue === "dash"}
                />
                <RadioButton
                    label="Underscore [ _ ]"
                    value="underscore"
                    name="separateOptions"
                    onChange={handleRadioButtonChange}
                    id="underscoreRadioButton"
                    checked={selectedRadioButtonValue === "underscore"}
                />

                <div className="mt-4">
                    <Button
                        onClick={handleSlugifyTextClick}
                        type="primary"
                        className="float-right"
                    >
                        Slugify
                    </Button>
                    <Button
                        onClick={handleClearTextFieldClick}
                        type="secondary"
                        className="mr-4 float-right"
                    >
                        Clear
                    </Button>
                </div>
            </Card>
            <Card heading="Output:">
                <p className="text-lg rounded-lg p-4 bg-gray-50 min-h-15 break-all">{slugifiedTextValue}</p>
                {/* TODO: Add copy button here */}
            </Card>

            <p className="text-sm text-gray-500 px-8">
                Example sentence to test with: <br />
                Hello __Aliens. I STILL believe@ in coMBining #tech and art &#32;&#32;&#32;&#32;&#32;     in 2077. I need - $57B please!
            </p>
            <code className="text-sm text-gray-500 px-8"></code>
        </>
    )
}

export default SlugifyTextForm
