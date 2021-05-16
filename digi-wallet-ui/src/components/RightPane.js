import React from 'react'
import Table from './Table'
import Button from '@material-ui/core/Button'
import moment from 'moment'

import './right-pane.css'

export default function RightPane(props) {
    const tableData = props.tableData
    const columns = [
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            Header: 'Sender ID',
            accessor: 'senderID'
        },
        {
            Header: 'Receiver ID',
            accessor: 'receiverID'
        },
        {
            Header: 'Type',
            accessor: 'transaction_type',
            Cell: ({cell}) => {
                const value = cell.value
                let color = '#833471'
                if (value === 'Receive') color = '#009432'
                return (
                    <div style={{ color, fontWeight: 'bold' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            Header: 'Amount',
            accessor: 'amount'
        },
        {
            Header: 'Status',
            accessor: 'transaction_status',
            Cell: ({cell}) => {
                const value = cell.value
                let color = '#c23616'
                if (value === 'PENDING') color = '#273c75'
                else if (value === 'APPROVED') color = '#009432'
                return (
                    <div style={{ color, fontWeight: 'bold' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            Header: 'Initial Date',
            accessor: 'transactionDate',
            Cell: ({cell}) => {
                const value = moment(cell.value).format('ddd DD-MMM-YYYY, hh:mm A')
                return (
                    <div>
                        {value}
                    </div>
                )
            }
        },
        {
            Header: 'Updated Date',
            accessor: 'updatedDate',
            Cell: ({cell}) => {
                const value = cell.value ? moment(cell.value).format('ddd DD-MMM-YYYY, hh:mm A') : ''
                return (
                    <div>
                        {value}
                    </div>
                )
            }
        },
        {
            Header: 'Status Message',
            accessor: 'statusMessage'
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ cell }) => {
                const shouldShow = cell.value
                const render = shouldShow ? 
                (
                    <Button variant="contained" color="secondary" onClick={() => props.cancelTransaction(cell.row.original.id)}>
                        Cancel
                    </Button>
                )
                :
                (<div />)
                return render
            }
        }
    ]
    return (
        <div className='right-pane'>
            <div className='title'>Transactions</div>
            <Table
                tableData={tableData}
                tableColumns={columns}
            />
        </div>
    )
}
