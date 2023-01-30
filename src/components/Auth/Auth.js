import React, { useState } from 'react'
import Login from "./Login"
import Register from './Register'

const Auth = (props) => {
    const [isRegister, setIsRegistered] = useState(false)

    const changeIntoRegisterFormHandler = () => {
        setIsRegistered(true)
    }

    const changeIntoLoginFormHandler = () => {
        setIsRegistered(false)
    }

    const takeAccountHandler = (account) => {
        props.onCheckAccount(account)
    }

    return (
        <React.Fragment>
            {!isRegister && <Login onTakeAccount={takeAccountHandler} loggedInHandler={props.loggedInHandler} onChangeRegisterForm={changeIntoRegisterFormHandler} />}
            {isRegister && <Register onChangeLoginForm={changeIntoLoginFormHandler} />}
        </React.Fragment>
    )
}


export default Auth