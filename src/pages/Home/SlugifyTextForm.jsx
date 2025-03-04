import React, { useState, useEffect } from 'react'
import Card from '@components/layout/Card'
import TextField from '@components/forms/TextField/TextField'
import RadioButton from '@components/forms/RadioButton/RadioButton'
import Button from '@components/forms/Button/Button'
import CheckBox from '@components/forms/CheckBox/CheckBox'
import { isWhitespaceString, isEmptyString } from '@utils/helpers/string.helpers'
import { STOP_WORDS } from '@utils/constants/stopWords.constants'
import LocalStorageService from '@services/LocalStorage/LocalStorage.service'
import { HISTORY_DATA_KEY } from '@utils/constants/localStorageKeys.constants'
import History from '@components/blocks/History'
import { getLocalISOTime } from '@utils/helpers/date.helpers'

const SlugifyTextForm = () => {
    const [textFieldInputValue, setTextFieldInputValue] = useState("")
    const [slugifiedTextValue, setSlugifiedTextValue] = useState("")
    const [selectedRadioButtonValue, setSelectedRadioButtonValue] = useState("dash")
    const [removeNumbersIsChecked, setRemoveNumbersIsChecked] = useState(false)
    const [removeStopWordsIsChecked, setRemoveStopWordsIsChecked] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [copyMessage, setCopyMessage] = useState("")
    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        const storedHistoryData = LocalStorageService.getItem(HISTORY_DATA_KEY)
        if (storedHistoryData) {
            setHistoryData(storedHistoryData)
        }
    }, []);

    const handleTextFieldChange = (value) => {
        setTextFieldInputValue(value)
    }

    const handleRadioButtonChange = (event) => {
        setSelectedRadioButtonValue(event.target.value)
    }

    const handleRemoveNumbersCheckBoxClick = (value) => {
        setRemoveNumbersIsChecked(value)
    }

    const handleRemoveStopWordsCheckBoxClick = (value) => {
        setRemoveStopWordsIsChecked(value)
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

        if (removeStopWordsIsChecked) {
            processedWords = processedWords
                                .filter(word => !STOP_WORDS.includes(word));
        }

        const slugifiedText = processedWords.join(separator)

        setSlugifiedTextValue(slugifiedText)
        setCopyMessage("")

        // update localStorage data
        addNewEntryToHistoryData(slugifiedText)
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

    const addNewEntryToHistoryData = (slugifiedText) => {
        const newEntry = {
            id: Date.now(), // unique ID based on timestamp
            input: textFieldInputValue,
            output: slugifiedText,
            timestamp: getLocalISOTime()
        }

        const updatedHistoryData = [newEntry, ...historyData]

        LocalStorageService.setItem(HISTORY_DATA_KEY, updatedHistoryData)
        setHistoryData(updatedHistoryData)
    }

    const handleDeleteHistoryButtonClick = () => {
        LocalStorageService.removeItem(HISTORY_DATA_KEY)
        setHistoryData([])
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

                <CheckBox
                    label="Remove Stop Words"
                    id="removeStopWordsCheckbox"
                    className="mt-4"
                    onClick={handleRemoveStopWordsCheckBoxClick}
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

            <History historyData={historyData}  onDeleteClick={handleDeleteHistoryButtonClick} />
        </>
    )
}

export default SlugifyTextForm
