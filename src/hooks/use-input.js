import React, { useState } from 'react'

const useInput = (checkError) => {
    const [inputValue, setInputValue] = useState('');
    const [isWasTouchValue, setIsWasTouchValue] = useState(false)
    const isValidValue = checkError(inputValue);

    const inputValueChangeHandler = (event) => {
        setInputValue(event.target.value)
        if (event.target.value.trim().length === 0) {
            setIsWasTouchValue(false)
        }
    }

    const focusInputValueHandler = () => {
        setIsWasTouchValue(true)
    }



    const classesValidOrInvalidValue = (styles, defaultClass, invalidClass) => {
        const classes = `${styles[defaultClass]} ${!isValidValue && isWasTouchValue ? styles[invalidClass] : ''}`
        return classes
    }


    const resetValues = () => {
        setInputValue('')
        setIsWasTouchValue(false)
    }

    return {
        value: inputValue,
        isValidValue: isValidValue,
        isWasTouchValue,
        inputValueChangeHandler,
        focusInputValueHandler,
        classesValidOrInvalidValue,
        resetValues
    }
}

export default useInput