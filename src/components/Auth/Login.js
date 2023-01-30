import { useEffect, useRef, useState } from 'react'
import styles from './Login.module.css'

const Login = (props) => {

    const [accountInfo, setAccountInfo] = useState(null)
    const [httpErrorMessage, setHttpErrorMessage] = useState(null)

    const inputLogin = useRef()
    const inputPassword = useRef()

    useEffect(() => {
        props.onTakeAccount(accountInfo)
    }, [accountInfo])

    const submitHandler = async (event) => {
        event.preventDefault()
        const login = inputLogin.current.value
        const password = inputPassword.current.value

        try {
            const response = await fetch('https://jokes-app-d2918-default-rtdb.europe-west1.firebasedatabase.app/accounts.json') // GET
            if (!response.ok) {
                throw new Error('Что-то пошло не так!')
            }
            const data = await response.json()

            let refactorData = []
            for (let key in data) {
                refactorData.push({
                    id: data[key].id,
                    login: data[key].login,
                    password: data[key].password
                })
            }


            const findAccount = refactorData.find((account) => {
                let isFindLogin = account.login === login
                let isFindPassword = account.password === password
                if (isFindLogin && isFindPassword) {
                    return account
                }
            })
            console.log(findAccount)
            if (findAccount) {
                setAccountInfo(findAccount)
                props.loggedInHandler()
            } else {
                throw new Error('Данные неверные! Попробуйте еще раз!')
            }
           
        } catch (err) {
            setHttpErrorMessage(err.message)
        }
    }


    return (
        <form className={styles['form']} onSubmit={submitHandler}>
            <h2 className={styles['login-title']}>Вход</h2>
            <div className={styles['control']}>
                <label htmlFor="login">Логин:</label>
                <input ref={inputLogin} id="login" type='text' placeholder="Введите логин..." />
            </div>
            <div className={styles['control']}>
                <label htmlFor="password">Пароль:</label>
                <input ref={inputPassword} id="password" type='password' placeholder="Введите пароль..." />
            </div>
            <div className={styles['register']}>
                <a href='#' className={styles['register-text']} onClick={props.onChangeRegisterForm}>Ещё не зарегистрированы? Зарегистрироваться</a>
            </div>
            {httpErrorMessage && <p className={styles['error-message']}>{httpErrorMessage}</p>}
            <div className={styles['actions']}>
                <button type='submit'>Вход</button>
                <button type='button' onClick={props.loggedInHandler}>Продолжить без регистрации</button>
            </div>
        </form>
    )
}


export default Login