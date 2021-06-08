import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";



class LogOut extends Component{

    state = { redirect: null };

    logOut = () => {
        // Cleaning stored cookies with AUTH information.
        const cookies = new Cookies();
        cookies.set('token',null,{path:'/'});
        cookies.set('id','',{path:'/'});
        cookies.set('name','',{path:'/'});
        cookies.set('email','',{path:'/'});   
        this.setState({ redirect: "/login" });
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return <div className="sidebar-footer">
            <a onClick={this.logOut} className="dropdown">
                Cerrar sesión
            </a>
        </div>
    }
}

export default LogOut;
