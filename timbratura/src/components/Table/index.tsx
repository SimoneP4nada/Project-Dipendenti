import Button from "../Button"

interface Props{
    columns: {name: string, columnName: string}[]
    data: any[],
    handleEdit?: (item:any) => void

}
const Table = ({columns, data, handleEdit}:Props)=>{

    return  <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
        <tr>
            {columns.map(column=><th key={column.name} className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                {column.name}
            </th>)}
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
        {data.map(user => <tr key={user.id}>{
            columns.map((column)=>
                <td key={column.name} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {user[column.columnName]}
                </td>)
        }
        {handleEdit && <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <Button onClick={()=>handleEdit(user)}>Edit</Button>
        </td>}
        </tr>)}
        </tbody>
    </table>
}

export default Table