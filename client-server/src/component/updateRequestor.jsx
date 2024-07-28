import React from 'react';
import { updateRequestor } from './services';

const UpdateRequestor = ({ selectedPriority, requestId }) => {
    console.log("Selected requestor:", selectedPriority);

    const handleUpdateRequestor = async () => {
        try {
            const success = await updatePriority(requestId, selectedPriority);
            console.log("requestor update success:", success);
        } catch (error) {
            console.log('Failed to update the requestor. Please try again.');
        }
    };

    return (
        <div>
            <button onClick={handleUpdateRequestor}>Update Requestor</button>
        </div>
    );
};

export default UpdateRequestor;
