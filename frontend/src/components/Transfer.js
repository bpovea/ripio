import { useState, useEffect, Fragment } from 'react';

import Cookies from 'universal-cookie';
import axios from "axios";

const urlTransfer = process.env.REACT_APP_RIPIO_API.concat("/transactions/");

// Here is the dashboard's main area.
function Transfer() {

    const cookies = new Cookies();

    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        axios.get(urlTransfer, {
            headers: {
                Authorization: "Token".concat(' ', cookies.get('token'))
            }
        }).then(response => {
            console.log(response.data);
            setTransfers(
                response.data
            );
        }).catch(error => {
            console.log(error.message);
        })
    }, []);

    return (
        <Fragment>
            <h2>Transfers</h2>
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
                            <td>{transfer.sender.first_name}</td>
                            <td>{transfer.receiver.first_name}</td>
                            <td>{transfer.currency_id.code}</td>
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

export default Transfer;