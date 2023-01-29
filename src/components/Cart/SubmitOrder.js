import { useState, useReducer } from 'react'
import useInput from '../../hooks/use-input'
import styles from './SubmitOrder.module.css'

const SubmitOrder = (props) => {

    const {
        value: inputName,
        isValidValue: validName,
        isWasTouchValue: isWasTouchName,
        inputValueChangeHandler: inputNameChangeHandler,
        focusInputValueHandler: focusInputNameHandler,
        classesValidOrInvalidValue: classesValidOrInvalidName,
        resetValues: resetName
    } = useInput((data) => data.trim().length > 0)

    const {
        value: inputCity,
        isValidValue: validCity,
        isWasTouchValue: isWasTouchCity,
        inputValueChangeHandler: inputCityChangeHandler,
        focusInputValueHandler: focusInputCityHandler,
        classesValidOrInvalidValue: classesValidOrInvalidCity,
        resetValues: resetCity
    } = useInput((data) => data.trim().length > 1)

    const {
        value: inputAddress,
        isValidValue: validAddress,
        isWasTouchValue: isWasTouchAddress,
        inputValueChangeHandler: inputAddressChangeHandler,
        focusInputValueHandler: focusInputAddressHandler,
        classesValidOrInvalidValue: classesValidOrInvalidAddress,
        resetValues: resetAddress
    } = useInput((data) => data.trim().length > 0)

    let formIsValid = false;
    if (validName && validCity && validAddress) {
        formIsValid = true
    };

    const submitOrderHandler = (event) => {
        event.preventDefault()
        if (!formIsValid) {
            return;
        }

        // Отправка данных на сервер
        props.onSubmit({
            name: inputName,
            city: inputCity,
            address: inputAddress
        })
        resetName()
        resetCity()
        resetAddress()
    }



    const nameInputClasses = classesValidOrInvalidName(styles, 'control', 'invalid')
    const cityInputClasses = classesValidOrInvalidCity(styles, 'control', 'invalid')
    const addressInputClasses = classesValidOrInvalidAddress(styles, 'control', 'invalid')


    return (
        <form onSubmit={submitOrderHandler} className={styles['form']}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Имя</label>
                <input type="text" id="name" onChange={inputNameChangeHandler} value={inputName} onBlur={focusInputNameHandler} />
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">Город:</label>
                <input type="text" id="city" onChange={inputCityChangeHandler} value={inputCity} onBlur={focusInputCityHandler} />
            </div>
            <div className={addressInputClasses}>
                <label htmlFor="address">Улица:</label>
                <input type="text" id="address" onChange={inputAddressChangeHandler} value={inputAddress} onBlur={focusInputAddressHandler} />
            </div>
            <div className={styles['actions']}>
                <button disabled={!formIsValid} type='submit' className={styles['submit']}>Подтвердить заказ</button>
                <button type='button' className={styles['button']} onClick={props.onHideCart}>Отмена</button>
            </div>

        </form>
    )
}

export default SubmitOrder







// const nameInputClasses = `${styles['control']} ${!validName && isWasTouchName && styles['invalid']}`
// const cityInputClasses = `${styles['control']} ${!validCity && isWasTouchCity && styles['invalid']}`
// const addressInputClasses = `${styles['control']} ${!validAddress && isWasTouchAddress && styles['invalid']}`