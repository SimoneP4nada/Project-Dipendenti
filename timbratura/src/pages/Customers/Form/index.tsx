import { useState, ChangeEvent, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import { validateEmail } from "../../../utils/costants";
import { Customer } from "../../../utils/models";

interface Props
{
    open: boolean;
    HandleClose: () => void;
    fetchCustomers: () => void;
    customer: Customer | null;
}

const Form = ({open, HandleClose, fetchCustomers, customer}: Props) =>
{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLasetName, setErrorLastName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");

    const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setErrorFirstName("");
        return setFirstName(event.target.value);
    }

    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setLastName("");
        return setLastName(event.target.value);
    }

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setErrorEmail("");
        return setEmail(event.target.value);
    }
  
    const HandleSave = async () =>
    {
      const body = JSON.stringify({firstName, lastName, email});

      if (firstName === "")
      {
        setErrorFirstName("Obbligatorio");
      }

      if (lastName === "")
      {
        setErrorLastName("Obbligatorio");
      }

      if (!validateEmail.test(email.toLowerCase()))
      {
        setErrorEmail("Obbligatorio");
      }

      else
      {
        const response = await fetch("http://localhost:3004/customers",
        {
          headers:
          {
            Accept: "application/json", "Content-Type": "application/json",
          },
  
          method: "POST",
          body
        });

        fetchCustomers();
        HandleClose();
      }
    }

    useEffect(() =>
    {
        if(customer)
        {
            setFirstName(customer.firstName);
            setLastName(customer.lastName);
            setEmail(customer.email);
        }

        else
        {
            setFirstName("");
            setLastName("");
            setEmail("");
        }
    },[customer]);

    return <div>
                    <Modal show={open}>
              <div>
                <Input name="firstName" label="First name" onChange={handleChangeFirstName} value={firstName} error={errorFirstName}/>
                <Input name="lastName" label="Last name" onChange={handleChangeLastName} value={lastName} error={errorLasetName}/>
                <Input name="email" label="Email" onChange={handleChangeEmail} value={email} error={errorEmail}/>

                <div className="flex justify-end mt-5">
                  <Button onClick={HandleClose}>Chiudi</Button>
                  <div className="ml-5"></div>
                  <Button onClick={HandleSave}>Salva</Button>
                </div>

              </div>
            </Modal>
    </div>
}

export default Form;