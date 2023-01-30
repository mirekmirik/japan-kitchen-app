import { useRef, useState } from 'react'
import useInput from '../../hooks/use-input'
import styles from './Register.module.css'

const Register = (props) => {

    const [httpErrorMessage, setHttpErrorMessage] = useState(null)

    const {
        value: inputLogin,
        isValidValue: isValidLogin,
        isWasTouchValue: isWasTouchLogin,
        inputValueChangeHandler: inputLoginChangeHandler,
        focusInputValueHandler: focusInputLoginHandler,
        classesValidOrInvalidValue: classesValidOrInvalidLogin,
        resetValues: resetLogin
    } = useInput((data) => data.trim().length >= 4)

    const {
        value: inputPassword,
        isValidValue: isValidPassword,
        isWasTouchValue: isWasTouchPassword,
        inputValueChangeHandler: inputPasswordChangeHandler,
        focusInputValueHandler: focusInputPasswordHandler,
        classesValidOrInvalidValue: classesValidOrInvalidPassword,
        resetValues: resetPassword
    } = useInput((data) => data.trim().length >= 7)

    const submitRegisterHandler = async (event) => {
        event.preventDefault()
        try {
            if (!isValidLogin && !isValidPassword) {
                throw new Error('Вы неправильно ввели данные!')
            }

            const getResponse = await fetch('https://jokes-app-d2918-default-rtdb.europe-west1.firebasedatabase.app/accounts.json')

            const getData = await getResponse.json()

            let refactorData = []
            for (let key in getData) {
                refactorData.push({
                    id: getData[key].id,
                    login: getData[key].login,
                    password: getData[key].password
                })
            }

            const findAccount = refactorData.find((account) => account.login === inputLogin)

            console.log(findAccount)

            if (findAccount) {
                throw new Error('Пользователь с данным логином уже существует!')
            }

            const response = await fetch('https://jokes-app-d2918-default-rtdb.europe-west1.firebasedatabase.app/accounts.json', {
                method: 'POST',
                body: JSON.stringify({
                    id: Math.random(),
                    login: inputLogin,
                    password: inputPassword
                })
            })


            if (!response.ok) {
                throw new Error("Что-то пошло не так...")
            }

        } catch (err) {
            setHttpErrorMessage(err.message)
        }
        resetLogin()
        resetPassword()
    }

    const inputLoginClasses = classesValidOrInvalidLogin(styles, 'control', 'invalid')
    const inputPasswordClasses = classesValidOrInvalidPassword(styles, 'control', 'invalid')

    return (
        <form className={styles['form']} onSubmit={submitRegisterHandler}>
            <h2 className={styles['register-title']}>Регистрация</h2>
            <div className={styles['inputs-inner']}>
                <div className={inputLoginClasses}>
                    <span>Логин должен содержать как минимум 4 символа</span>
                    <label htmlFor="login">Логин:</label>
                    <input onChange={inputLoginChangeHandler}
                        onBlur={focusInputLoginHandler}
                        value={inputLogin}
                        id="login"
                        type='text'
                        placeholder="Введите логин..." />
                </div>
                <div className={inputPasswordClasses}>
                    <span>Пароль должен содержать как минимум 7 символов</span>
                    <label htmlFor="password">Пароль:</label>
                    <input
                        onChange={inputPasswordChangeHandler}
                        onBlur={focusInputPasswordHandler}
                        value={inputPassword}
                        id="password"
                        type='password'
                        placeholder="Введите пароль..." />
                </div>
                {httpErrorMessage && <p className={styles['error-message']}>{httpErrorMessage}</p>}
            </div>
            <div className={styles['actions']}>
                <button type='submit'>Зарегистрироваться</button>
                <button onClick={props.onChangeLoginForm}>Назад</button>
            </div>
        </form>
    )
}


export default Register