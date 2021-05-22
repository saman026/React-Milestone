import React from 'react'
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { pxToRem } from '../utils/theme';

// Styling
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiAlert-standardWarning': {
            color: "#ffffff",
            width: pxToRem(600),
            backgroundColor: "#21303B",
            borderLeft: `${pxToRem(5)} solid #FF5B5B`,
            boxShadow: `${pxToRem(0)} ${pxToRem(5)} ${pxToRem(20)} #0000004D`,
            borderRadius: pxToRem(10),
            fontFamily: 'Ubuntu, sans-serif',
        },
        '& .MuiAlert-standardWarning .MuiAlert-icon' : {
            color: '#FF5B5B',
          }
    
    }
}))

// Exporting the component
export default function Notification(props) {

    //  Destructuring the props
    const { notify, setNotify } = props;
    
    const classes = useStyles()

    // Handling the event
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}