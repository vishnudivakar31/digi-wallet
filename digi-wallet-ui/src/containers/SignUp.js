import React, {Component} from 'react'
import Box from '@material-ui/core/Box'
import Login from '../components/Login'
import CreateAccount from '../components/CreateAccount'
import { geolocated } from 'react-geolocated'
import { SIGNUP_URL, LOGIN_URL } from '../util/Constants'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { withRouter } from "react-router"
import './signup.css'

class SignUp extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props)
        this.onCreate = this.onCreate.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    async onLogin(username, password) {
        const payload = {
            username,
            password
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }

        const response = await fetch(LOGIN_URL, requestOptions)
        if (!response.ok) {
            alert(response.statusText)
        } else {
            const { cookies } = this.props
            const data = await response.json()
            const bearerToken = data['Authorization'].replace('Bearer ', '')
            cookies.set('Authorization', bearerToken, { path: '/' })
            this.props.history.push("/home")
        }
    }

    async onCreate(username, email, password) {
        const latitude = this.props.coords.latitude
        const longitude = this.props.coords.longitude
        
        const payload = {
            username,
            email,
            password,
            latitude,
            longitude
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }

        try {
            const response = await fetch(SIGNUP_URL, requestOptions)
            if (!response.ok) {
                alert(response.statusText)
            } else {
                const data = await response.json()
                alert('Account created successfully. Welcome ' + data.username)
            }
        } catch (ex) {
            alert(ex)
        }
        
    }

    render() {
        return(
            <Box className='sign-up'>
                {!this.props.isGeolocationAvailable && alert('Your browser does not support geolocation')}
                {!this.props.isGeolocationEnabled && alert('Geo-location not enabled. Refresh and enable to continue.')}
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

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(withCookies(withRouter(SignUp)))
