import React, { useRef, useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './create-account.css'

export default function CreateAccount() {

    const [usernameErrorStatus, setUsernameErrorStatus] = useState(false)
    const [emailErrorStatus, setEmailErrorStatus] = useState(false)
    const [passwordErrorStatus, setPasswordErrorStatus] = useState(false)
    const [confirmPasswordErrorStatus, setConfirmPasswordErrorStatus] = useState(false)

    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    function validateEmailFormat(email) {
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            setEmailErrorStatus(true)
        }
    }

    function validate(username, email, password, confirmPassword) {
        if (username.length === 0) {
            setUsernameErrorStatus(true)
        } else {
            setUsernameErrorStatus(false) 
        }

        if (email.length === 0) {
            setEmailErrorStatus(true)
        } else {
            setEmailErrorStatus(false)
        }

        if (password.length === 0) {
            setPasswordErrorStatus(true)
        } else {
            setPasswordErrorStatus(false)
        }

        if (confirmPassword.length === 0) {
            setConfirmPasswordErrorStatus(true)
        } else {
            setConfirmPasswordErrorStatus(false)
        }

        if (password !== confirmPassword) {
            setConfirmPasswordErrorStatus(true)
        }

        if (!emailErrorStatus) {
            validateEmailFormat(email)
        }
    }

    function onSubmit() {
        const username = userNameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        validate(username, email, password, confirmPassword)
    }

    return (
        <Box className='create-account'>
            <h2>Create Account</h2>
            <Box className='input-container'>
                <TextField 
                    label="Username" 
                    variant="outlined"
                    size='small'
                    className='text-field'
                    error={usernameErrorStatus}
                    inputRef={userNameRef}
                />
            </Box>
            
            <Box className='input-container'>
                <TextField 
                    label="Email" 
                    variant="outlined"
                    size='small'
                    className='text-field'
                    error={emailErrorStatus}
                    inputRef={emailRef}
                    type='email'
                />
            </Box>
            
            <Box className='input-container'>
                <TextField 
                    label="Password" 
                    variant="outlined"
                    size='small'
                    className='text-field'
                    error={passwordErrorStatus}
                    inputRef={passwordRef}
                    type='password'
                />
            </Box>
            
            <Box className='input-container'>
                <TextField 
                    label="Confirm Password" 
                    variant="outlined"
                    size='small'
                    className='text-field'
                    error={confirmPasswordErrorStatus}
                    inputRef={confirmPasswordRef}
                    type='password'
                />
            </Box>

            <Button variant="contained" color="primary" fullWidth onClick={onSubmit}>
                Submit
            </Button>
        </Box>
    )
}
