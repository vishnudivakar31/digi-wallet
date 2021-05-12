import React, { useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import './login.css'

export default function Login() {
    const [userNameErrorStatus, setUserNameStatus] = useState(false)
    const [passwordErrorStatus, setPasswordStatus] = useState(false)

    const userNameRef = useRef()
    const passwordRef = useRef()

    function onLogin() {
        const username = userNameRef.current.value
        const password = passwordRef.current.value

        if (username.length === 0) {
            setUserNameStatus(true)
        } else {
            setUserNameStatus(false)
        }

        if (password.length === 0) {
            setPasswordStatus(true)
        } else {
            setPasswordStatus(false)
        }
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
                />
                <Button variant="contained" color="primary" onClick={onLogin}>
                    Login
                </Button>
            </Box>
        </Box>
    )
}
