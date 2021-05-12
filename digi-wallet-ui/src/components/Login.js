import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import './login.css'

export default function Login() {
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
                />
                <TextField 
                    label="Password"
                    variant="outlined" 
                    size='small'
                    className='textfield'
                />
                <Button variant="contained" color="primary">
                    Login
                </Button>
            </Box>
        </Box>
    )
}
