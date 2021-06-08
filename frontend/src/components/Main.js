import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import UserInfo from './UserInfo';
import Transfer from './Transfer';

// Here is the dashboard's main area.
function Main() {
    return (
        <main className="page-content">
            <Router>
                <Route path="/dashboard/transfers">
                    <Transfer />
                </Route>
                <Route path="/dashboard/" exact="true">
                    <UserInfo />
                </Route>
            </Router>
        </main>
    )
}

export default Main;