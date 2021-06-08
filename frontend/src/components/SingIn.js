import React from 'react';
import './css/SingIn.css';
import Cookies from 'universal-cookie';
import axios from "axios";

/* 
 * REACT_APP_RIPIO_API, enviroment variable localized in ../../.env file
 * source: https://create-react-app.dev/docs/adding-custom-environment-variables/
 */

const urlAuth = process.env.REACT_APP_RIPIO_API.concat("/token-auth/");
const urlMe = process.env.REACT_APP_RIPIO_API.concat("/me/");


class FormSingIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                username: '',
                password: ''
            },
            token: '',
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {
        const cookies = new Cookies();
        e.preventDefault();

        axios.post(urlAuth, this.state.form).then(response => {
            this.setState({ token: response.data.token });
            axios.get(urlMe, {
                headers: {
                    Authorization: "Token".concat(' ', this.state.token)
                }
            }).then(response => {
                // user data is stored using cookies.
                let user = response.data[0]
                cookies.set('token', this.state.token, { path: '/' });
                cookies.set('id', user.id, { path: '/' });
                cookies.set('name', user.first_name + ' ' + user.last_name, { path: '/' });
                cookies.set('username', user.username, { path: '/' });
                window.location.href = './dashboard';
            }).catch(error => {
                console.log(error.message);
            })
        }).catch(error => {
            console.log(error.message);
            alert("User name or password error, please try again!.");
        })
    }

    render() {
        const { username, password } = this.state.form;

        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="login-form col-md-auto">
                        <form onSubmit={this.handleSubmit}>
                            <h2 className="text-center">Log in</h2>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="username" required="required" name="username" value={username} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" required="required" name="password" value={password} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormSingIn;