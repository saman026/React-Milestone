import React from 'react';
import { Typography } from '@material-ui/core';

function DeleteModal() {  

    return (
        <>
            <Typography style={{ fontWeight: 'medium' }}> 
                You'll lose your record(s) after this action. We can't recover them once you delete.
                 
                <p>Are you sure you want to{" "}                  
                    <span style={{ color: "#FF5E5E" }}>permanently delete</span>  them?
                </p>       
            </Typography>  
        </>
    )
}

// Exporting the component
export default DeleteModal;


