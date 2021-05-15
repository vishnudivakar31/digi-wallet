import React, { useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './left-pane.css'

export default function LeftPane(props) {

    const {username, accountID, balance} = props
    const [addMoneyErrorStatus, setAddMoneyErrorStatus] = useState(false)

    const addMoneyTxtRef = useRef()

    const onAddMoney = () => {
        const amount = addMoneyTxtRef.current.value
        if (amount === undefined || amount.length === 0) {
            setAddMoneyErrorStatus(true)
        } else {
            props.addMoney(amount)
            addMoneyTxtRef.current.value = ''
        }
    }

    return (
        <div className='left-pane'>
            
            <div className='left-pane-header'>
                <div className='company-logo'>DigiWallet</div>
                <div>{username === undefined ? '' : username}</div>
            </div>
            
            <div className='user-balance'>
                <div className='user-balance-info'>Your Account ID</div>
                <div className='account-number'>{accountID === undefined ? '' : accountID}</div>
            </div>

            <div className='user-balance'>
                <div className='user-balance-info'>You have balance</div>
                <div className='user-balance-amt'>{balance === undefined ? '' : balance}</div>
            </div>

            <div className='transact-container'>
                <div className='user-balance-info'>Transact</div>
                <TextField 
                    placeholder='recipient id'
                    variant="outlined"
                    size='small'
                    className='left-pane-textfield'
                    fullWidth
                />
                <TextField
                    placeholder='amount'
                    type='number'
                    variant="outlined"
                    size='small'
                    className='left-pane-textfield'
                    fullWidth
                />
                <Button variant="contained" color="primary" fullWidth className='left-pane-button'>
                    Send
                </Button>
            </div>

            <div className='transact-container'>
                <div className='user-balance-info'>Add Money</div>
                <TextField
                    placeholder='amount'
                    type='number'
                    variant="outlined"
                    size='small'
                    className='left-pane-textfield'
                    error={addMoneyErrorStatus}
                    inputRef={addMoneyTxtRef}
                    fullWidth
                />
                <Button variant="contained" color="primary" fullWidth className='left-pane-button' onClick={onAddMoney}>
                    Add
                </Button>
            </div>

            <div className='transact-container'>
                <Button color="secondary">Logout</Button>
            </div>
        </div>
    )
}
