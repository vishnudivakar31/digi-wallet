import React, { useMemo } from 'react'
import { useTable, usePagination} from 'react-table'

export default function Table(props) {
    const data = props.tableData
    const columns = useMemo(
        () => props.tableColumns
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex }
      } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 14 } }, usePagination)

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th 
                            {...column.getHeaderProps()}
                            style={{
                                padding: '10px 15px',
                                background: '#192a56',
                                color: 'white',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                                fontSize: '16px'
                            }}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td 
                                    {...cell.getCellProps()}
                                    style={{
                                        padding: '10px 15px',
                                        background: '#dfe4ea',
                                        textAlign: 'center',
                                        fontSize: '14px'
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
            <div className="pagination" style={{ marginTop: '1%' }}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
                </button>{' '}
                <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
                </span>
                <span>
                | Go to page:{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
                </span>
            </div>
        </div>
    )
}
