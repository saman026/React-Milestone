import React from 'react'
import { Button, makeStyles } from '@material-ui/core';

// Styling
const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        color: '#ffffff'
    },
    secondary: {
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    primary: {
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
}))


// Exporting the Component
export default function ActionButton(props) {

    // Destructring the props
    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
        </Button>
    )
}