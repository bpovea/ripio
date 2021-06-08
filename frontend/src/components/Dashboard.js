import React from 'react';
import Sidebar from './Sidebar';
import Main from './Main';

function Dashboard() {
    return (
        <div className="page-wrapper chiller-theme toggled">
            <Sidebar />
            <Main />
        </div>
    )
}

export default Dashboard;