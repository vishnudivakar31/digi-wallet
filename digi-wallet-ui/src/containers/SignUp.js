import React, {Component} from 'react'
import Box from '@material-ui/core/Box'
import Login from '../components/Login'
import CreateAccount from '../components/CreateAccount'
import './signup.css'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.onCreate = this.onCreate.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin(username, password) {
        alert('on login')
    }

    onCreate(username, email, password) {
        alert('on creation...')
    }

    render() {
        return(
            <Box className='sign-up'>
                <h1>DigiWallet</h1>
                <Login
                    onLogin={this.onLogin}
                />
                <CreateAccount
                    onCreate={this.onCreate}
                />
            </Box>
        )
    }
}

export default SignUp
