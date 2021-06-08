import { useState, useEffect, Fragment } from 'react';

import Cookies from 'universal-cookie';
import axios from "axios";

const urlTransfer = process.env.REACT_APP_RIPIO_API.concat("/transactions/");
const urlCurrency = process.env.REACT_APP_RIPIO_API.concat("/currencies/");
const urlUser = process.env.REACT_APP_RIPIO_API.concat("/users/");

// Here is the dashboard's main area.
function NewTransfer() {

    const cookies = new Cookies();

    const [transfers, setTransfers] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [users, setUsers] = useState([]);
    const [transfer, setTransfer] = useState({
        'user_to': '',
        'currency_id': '',
        'amount': ''
    });

    const handleSubmit = (e) => {
        const cookies = new Cookies();
        e.preventDefault();
        axios.post(urlTransfer, transfer,
            {
                headers: {
                    Authorization: "Token".concat(' ', cookies.get('token'))
                }
            }
        ).then(response => {
            alert('Transaction created.')
            console.log(response.data);
            setTransfers([
                ...transfers,
                response.data
            ]
            );
        }).catch(error => {
            console.log(error.message);
        });
    }

    const handleInputChange = (event) => {
        console.log(event)
        setTransfer({
            ...transfer,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        axios.get(urlTransfer, {
            headers: {
                Authorization: "Token".concat(' ', cookies.get('token'))
            }
        }).then(response => {
            setTransfers(
                response.data
            );
        }).catch(error => {
            console.log(error.message);
        })
        axios.get(urlCurrency, {
            headers: {
                Authorization: "Token".concat(' ', cookies.get('token'))
            }
        }).then(response => {
            setCurrencies(
                response.data
            );
        }).catch(error => {
            console.log(error.message);
        })
        axios.get(urlUser, {
            headers: {
                Authorization: "Token".concat(' ', cookies.get('token'))
            }
        }).then(response => {
            setUsers(
                response.data
            );
        }).catch(error => {
            console.log(error.message);
        })
    }, []);

    return (
        <Fragment>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <select class="form-control" name="user_to" onChange={handleInputChange}>
                            <option disabled selected value> -- To -- </option>
                            {
                                users ? users.map(user =>
                                    <option value={user.id}>{user.first_name} {user.last_name}</option>
                                ) : <option>No users</option>
                            }

                        </select>
                    </div>
                    <div className="col">
                        <select class="form-control" name="currency_id" onChange={handleInputChange}>
                            <option disabled selected value> -- select a currency -- </option>
                            {
                                currencies ? currencies.map(currency =>
                                    <option value={currency.id}>{currency.code}</option>
                                ) : <option>No currencies</option>
                            }

                        </select>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Amount" name="amount" value={transfer.amount} onChange={handleInputChange} />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">Transfer</button>
                    </div>
                </div>
            </form>
            <br />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transfers ? transfers.map(transfer => <tr>
                            <td>{transfer.id}</td>
                            <td>{transfer.sender.first_name} {transfer.sender.last_name}</td>
                            <td>{transfer.receiver.first_name} {transfer.receiver.last_name}</td>
                            <td>{transfer.currency.code}</td>
                            <td>{transfer.amount}</td>
                        </tr>
                        ) : <tr>
                            No Records
                        </tr>
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default NewTransfer;