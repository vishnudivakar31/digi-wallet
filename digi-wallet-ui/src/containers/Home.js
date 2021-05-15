import React, {Component} from 'react'
import LeftPane from '../components/LeftPane'
import { instanceOf } from 'prop-types'
import { withRouter } from "react-router"
import { withCookies, Cookies } from 'react-cookie'
import { geolocated } from 'react-geolocated'
import { 
    ACCOUNT_URL,
    BALANCE_URL,
    ADD_MONEY_URL,
    CREATE_TRANSACTION 
} from '../util/Constants'

import './home.css'

class Home extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            balance: {},
            account: {}
        }
        this.fetchAccount = this.fetchAccount.bind(this)
        this.fetchBalance = this.fetchBalance.bind(this)
        this.fetchRequest = this.fetchRequest.bind(this)
        this.addMoney = this.addMoney.bind(this)
        this.createTransaction = this.createTransaction.bind(this)
        this.logout = this.logout.bind(this)
        this.bearerToken = `Bearer ${this.props.cookies.cookies.Authorization}`
    }

    componentDidMount() {
        this.fetchAccount()
        this.fetchBalance()
    }

    async addMoney(amount) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': this.bearerToken}
        }
        const response = await fetch(`${ADD_MONEY_URL}?amount=${parseFloat(amount)}`, requestOptions)
        if (response.ok) {
            this.fetchBalance()
        } else {
            this.props.history.push("/")
        }
    }

    async createTransaction(receiverID, amount) {
        const latitude = this.props.coords.latitude
        const longitude = this.props.coords.longitude

        const payload = {
            receiverID,
            amount: parseFloat(amount),
            latitude,
            longitude
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': this.bearerToken},
            body: JSON.stringify(payload)
        }
        const response = await fetch(CREATE_TRANSACTION, requestOptions)
        if (response.ok) {
            alert('transaction created.')
        } else {
            this.props.history.push("/")
        }
    }

    async fetchAccount() {
        const account = await this.fetchRequest(ACCOUNT_URL)
        if (account) {
            this.setState({ account })
        }
    }

    async fetchBalance() {
        const balance = await this.fetchRequest(BALANCE_URL)
        if (balance) {
            this.setState({ balance })
        }
    }

    async fetchRequest(url) {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': this.bearerToken}
        }
        const response = await fetch(url, requestOptions)
        if (response.ok) {
            return await response.json()
        } else {
            this.props.history.push("/")
        }
    }

    logout() {
        const { cookies } = this.props
        cookies.set('Authorization', '', { path: '/' })
        this.props.history.push("/")
    }

    render() {
        return(
            <div className='home'>
                <LeftPane
                    username={this.state.account.username}
                    accountID={this.state.account.id}
                    balance={this.state.balance.balance}
                    addMoney={this.addMoney}
                    createTransaction={this.createTransaction}
                    logout={this.logout}
                />
            </div>
        )
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(withCookies(withRouter(Home)))
