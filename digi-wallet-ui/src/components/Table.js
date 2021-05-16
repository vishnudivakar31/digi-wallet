import React, { useMemo } from 'react'
import { useTable } from 'react-table'

export default function Table(props) {
    const data = props.tableData
    const columns = useMemo(
        () => props.tableColumns
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th
                        {...column.getHeaderProps()}
                        style={{
                        borderBottom: 'solid 3px red',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        }}
                    >
                        {column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <td
                            {...cell.getCellProps()}
                            style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'papayawhip',
                            }}
                        >
                            {cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
    )
}
