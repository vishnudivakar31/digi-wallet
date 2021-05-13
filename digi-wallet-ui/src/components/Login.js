import React, { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import './login.css'

export default function Login(props) {
    const [userNameErrorStatus, setUserNameStatus] = useState(false)
    const [passwordErrorStatus, setPasswordStatus] = useState(false)
    const [safeToLogin, setSafeToLogin] = useState(false)

    const userNameRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        if (safeToLogin) {
            const username = userNameRef.current.value
            const password = passwordRef.current.value
            props.onLogin(username, password)
            setSafeToLogin(false)
        }
    })

    function onLogin() {
        let safeToLogin = true
        const username = userNameRef.current.value
        const password = passwordRef.current.value

        if (username.length === 0) {
            setUserNameStatus(true)
            safeToLogin = safeToLogin && false
        } else {
            setUserNameStatus(false)
        }

        if (password.length === 0) {
            setPasswordStatus(true)
            safeToLogin = safeToLogin && false
        } else {
            setPasswordStatus(false)
        }
        setSafeToLogin(safeToLogin)
    }

    return (
        <Box className='login'>
            <Box>
                <h2>Login</h2>
            </Box>
            <Box className='input-container'>
                <TextField 
                    label="Username" 
                    variant="outlined"
                    size='small'
                    className='textfield'
                    inputRef={userNameRef}
                    error={userNameErrorStatus}
                />
                <TextField 
                    label="Password"
                    variant="outlined" 
                    size='small'
                    className='textfield'
                    inputRef={passwordRef}
                    error={passwordErrorStatus}
                    type='password'
                />
                <Button variant="contained" color="primary" onClick={onLogin}>
                    Login
                </Button>
            </Box>
        </Box>
    )
}
