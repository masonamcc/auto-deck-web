export default function Table({tableData, tableName, tableColumns}) {


    return (
        <table className={'table'}>
            <thead>
                <tr>
                    {tableColumns?.map((column, index) => (
                        <th key={index}>
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    )
}