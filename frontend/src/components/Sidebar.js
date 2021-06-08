import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import './css/Sidebar.css';
import $ from 'jquery';
import LogOut from './LogOut';


class Sidebar extends Component {

    closeSidebar = function () {
        $(".page-wrapper").removeClass("toggled");
    }

    showSidebar = function () {
        $(".page-wrapper").addClass("toggled");
    }

    logOut = function () {
        const cookies = new Cookies();
    }

    render() {

        const cookies = new Cookies();

        return (
            <div>
                <a id="show-sidebar" className="btn btn-sm btn-dark" href="#" onClick={this.showSidebar}>
                    <i className="fas fa-bars"></i>
                </a>
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">
                        <div className="sidebar-brand">
                            <a href="#">Dashboard</a>
                            <div id="close-sidebar" onClick={this.closeSidebar}>
                                <i className="fas fa-times"></i>
                            </div>
                        </div>
                        <div className="sidebar-header">
                            <div className="user-pic">
                                <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                                    alt="User picture" />
                            </div>
                            <div className="user-info">
                                <span className="user-name">
                                    <strong>{cookies.get('name')}</strong>
                                </span>
                                <span className="user-email">{cookies.get('email')}</span>
                                <span className="user-status">
                                    <i className="fa fa-circle"></i>
                                    <span>Online</span>
                                </span>
                            </div>
                        </div>
                        <div className="sidebar-menu">
                            <ul>
                                <li className="header-menu">
                                    <span>General</span>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="/dashboard">
                                        <i className="fa fa-user"></i>
                                        <span>Perfil</span>
                                    </a>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a href="/dashboard/transfers">
                                        <i className="fa fa-info"></i>
                                        <span>Transferencias</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <LogOut />
                </nav>
            </div>
        )
    }
}

export default Sidebar;