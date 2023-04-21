import {useEffect, useState} from "react"
import Table from '../../components/Table'
import Button from "../../components/Button"
import Form from "./Form"
import { Customer } from "../../utils/models"

const COLUMNS: {name: string, columnName: string}[] =
    [
        {name: 'First name', columnName: 'firstName'},
        {name: 'Last name',columnName: 'lastName'},
        {name: 'Email', columnName: 'email'},
        {name: 'Edit', columnName: 'edit'}
    ]

const Customers = () =>
{
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer| null>(null);

  const fetchCustomers = async () =>
  {
      const response = await fetch("http://localhost:3004/customers");
      const responseJson = await response?.json();
      setCustomers(responseJson);
  };

  useEffect(() =>
  {
    fetchCustomers()
  }, [])

  const onClickNew = () =>
  {
    setOpen(true);
  }

  const onClickClose = () =>
  {
    setCustomer(null);
    setOpen(false);
  }

  const HandleEdit = (item: any) =>
  {
    setCustomer(item);
    setOpen(true);
  }

  return (
      <div>
          <div className="m-6">Customers</div>
          <div className="p-6">
            <Button onClick={onClickNew}>Nuovo</Button>
            <Table columns={COLUMNS} data={customers} handleEdit={HandleEdit}/>
            <Form customer={customer} open={open} HandleClose={onClickClose} fetchCustomers={fetchCustomers}/>
          </div>
      </div>
  )
}

export default Customers
