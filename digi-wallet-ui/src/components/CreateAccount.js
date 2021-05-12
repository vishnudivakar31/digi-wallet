import React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './create-account.css'

export default function CreateAccount() {
    return (
        <Box className='create-account'>
            <h2>Create Account</h2>
            <Box className='input-container'>
                <TextField 
                    label="Username" 
                    variant="outlined"
                    size='small'
                    className='text-field'
                />
            </Box>
            
            <Box className='input-container'>
                <TextField 
                    label="Email" 
                    variant="outlined"
                    size='small'
                    className='text-field'
                />
            </Box>
            
            <Box className='input-container'>
                <TextField 
                    label="Password" 
                    variant="outlined"
                    size='small'
                    className='text-field'
                />
            </Box>
            
            <Box className='input-container'>
                <TextField 
                    label="Confirm Password" 
                    variant="outlined"
                    size='small'
                    className='text-field'
                />
            </Box>

            <Button variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </Box>
    )
}
