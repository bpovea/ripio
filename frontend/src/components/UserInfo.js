import { useState, useEffect, Fragment } from 'react';

import Cookies from 'universal-cookie';
import axios from "axios";

const urlMe = process.env.REACT_APP_RIPIO_API.concat("/me/");

// Here is the dashboard's main area.
function UserInfo() {

    const cookies = new Cookies();


    const [userData, setUserData] = useState({
        'first_name': '',
        'last_name': '',
        'username': '',
        'email': '',
        'balance': '',

    });

    useEffect(() => {
        axios.get(urlMe, {
            headers: {
                Authorization: "Token".concat(' ', cookies.get('token'))
            }
        }).then(response => {
            // user data is stored using cookies.
            let user = response.data[0];
            console.log(user);
            setUserData({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'username': user.username,
                'balance': user.balance,
                'email': user.email,
            });

        }).catch(error => {
            console.log(error.message);
        })
    }, []);

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const uploadUserData = (event) => {
        event.preventDefault()
        axios.put(urlMe + cookies.get('id') + "/", userData,
            {
                headers: {
                    Authorization: "Token".concat(' ', cookies.get('token'))
                }
            }
        ).then(response => {
            // user data is stored using cookies.
            let user = response.data[0];
            console.log(user);
            setUserData({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'username': user.username,
                'balance': user.balance,
                'email': user.email,
            });
        }).catch(error => {
            console.log(error.message);
        })
        // Todo launch succesfull with modal no alert
        alert('User Update.');
    }

    return (
        <div>
            <Fragment>
                <h1>Datos</h1>
                <form onSubmit={uploadUserData}>
                    <div className="form-group">
                        <label for="exampleInputUserName">User Name</label>
                        <input type="text" placeholder="UserName" className="form-control" onChange={handleInputChange} name="username" value={userData.username}></input>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputFirstName">First Name</label>
                        <input type="text" placeholder="FirstName" className="form-control" onChange={handleInputChange} name="first_name" value={userData.first_name}></input>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputLastName">Last Name</label>
                        <input type="text" placeholder="LastName" className="form-control" onChange={handleInputChange} name="last_name" value={userData.last_name}></input>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail">Email</label>
                        <input type="text" placeholder="Email" className="form-control" onChange={handleInputChange} name="email" value={userData.email}></input>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputBalance">Balance</label>
                        <input type="text" placeholder="Balance" className="form-control" value={userData.balance} readOnly></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </Fragment>
        </div>
    );
}

export default UserInfo;