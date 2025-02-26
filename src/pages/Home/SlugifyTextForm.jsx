import React, { useState } from 'react'
import Card from '@components/layout/Card'
import TextField from '@components/forms/TextField/TextField'
import RadioButton from '@components/forms/RadioButton/RadioButton'
import Button from '@components/forms/Button/Button'
import CheckBox from '@components/forms/CheckBox/CheckBox'
import { isWhitespaceString, isEmptyString } from '@utils/helpers/string.helpers'

const SlugifyTextForm = () => {
    const [textFieldInputValue, setTextFieldInputValue] = useState("")
    const [slugifiedTextValue, setSlugifiedTextValue] = useState("")
    const [selectedRadioButtonValue, setSelectedRadioButtonValue] = useState("dash")
    const [removeNumbersIsChecked, setRemoveNumbersIsChecked] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [copyMessage, setCopyMessage] = useState("")

    const handleTextFieldChange = (value) => {
        setTextFieldInputValue(value)
    }

    const handleRadioButtonChange = (event) => {
        setSelectedRadioButtonValue(event.target.value)
    }

    const handleRemoveNumbersCheckBoxClick = (value) => {
        setRemoveNumbersIsChecked(value)
    }

    const handleSlugifyTextClick = () => {
        setShowErrorMessage(false)
        if (isWhitespaceString(textFieldInputValue) || isEmptyString(textFieldInputValue)) {
            setShowErrorMessage(true)
            return
        }

        let separator = " "
        if (selectedRadioButtonValue === "dash") { separator = "-" }
        if (selectedRadioButtonValue === "underscore") { separator = "_" }

        const words = textFieldInputValue.split(" ")
        let processedWords = words
                                .map((word) => word.trim())
                                .map((word) => word.toLowerCase())
                                .map((word) => word.replace(/[-_]/g, "")) // Remove hyphens and underscores
                                .map((word) => word.replace(/[^\w\s-]/g, "")) // Remove any special characters except for letters, numbers, spaces, and hyphens
                                .filter((element) => element) // Remove empty array elements

        if (removeNumbersIsChecked) {
            processedWords = processedWords
                                .map(word => word.replace(/\d+/g, ''))
                                .filter((element) => element) // Remove any empty array elements if a word consisted of just numbers
        }

        const slugifiedText = processedWords.join(separator)

        setSlugifiedTextValue(slugifiedText)
        setCopyMessage("")

        // TODO: store input and output value in localstorage with date
    }

    const handleClearTextFieldClick = () => {
        setTextFieldInputValue("")
        setSlugifiedTextValue("")
        setShowErrorMessage(false)
        setCopyMessage("")
    }

    const handleCopyToClipboardButtonClick = () => {
        if (isWhitespaceString(slugifiedTextValue) || isEmptyString(slugifiedTextValue)) {
            setCopyMessage("Nothing to copy.")
            return
        }

        navigator.clipboard.writeText(slugifiedTextValue)
        setCopyMessage("Copied!")
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
                <p
                    className={
                        showErrorMessage ? "text-sm text-red-500 block" : "hidden"
                    }
                >
                    Input text cannot be empty.
                </p>

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

                <CheckBox
                    label="Remove Numbers"
                    id="removeNumbersCheckbox"
                    className="mt-4"
                    onClick={handleRemoveNumbersCheckBoxClick}
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
                    {/* TODO: Add show history button here */}
                </div>
            </Card>
            <Card heading="Output:">
                <p className="text-lg rounded-lg p-4 bg-gray-50 min-h-15 break-all">{slugifiedTextValue}</p>
                <div className="mt-4">
                    <Button
                        onClick={handleCopyToClipboardButtonClick}
                        type="secondary"
                        className="float-right"
                    >
                        Copy To Clipboard
                    </Button>
                    <p className="text-sm text-gray-600 block float-right mr-2 px-5 py-2.5" >
                        {copyMessage}
                    </p>
                </div>
            </Card>

            <p className="text-sm text-gray-500 px-8 mb-4">
                <strong>Stop words:</strong>  <br />
                Common words that are removed from text during processing because they have little meaning on their own.
            </p>
            <p className="text-sm text-gray-500 px-8">
                <strong>Example sentence to try:</strong> <br />
                Hello __Aliens. I STILL believe@ in coMBining #tech and art &#32;&#32;&#32;&#32;&#32;     in 2077. I need - $57B please!
            </p>
        </>
    )
}

export default SlugifyTextForm
