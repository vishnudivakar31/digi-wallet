import React, {Component} from 'react'
import Box from '@material-ui/core/Box'
import Login from '../components/Login'
import CreateAccount from '../components/CreateAccount'
import './signup.css'

class SignUp extends Component {
    render() {
        return(
            <Box className='sign-up'>
                <h1>DigiWallet</h1>
                <Login />
                <CreateAccount />
            </Box>
        )
    }
}

export default SignUp
