import { Fragment } from 'react';

import NewTransfer from './NewTransferForm';

// Here is the dashboard's main area.
function Transfer() {

    return (
        <Fragment>
            <h2>Transfers</h2>
            <NewTransfer />
        </Fragment>
    )
}

export default Transfer;