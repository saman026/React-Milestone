import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { pxToRem } from '../utils/theme';

// Styling
const useStyles = makeStyles({
    typography: {
        fontSize: pxToRem(20),
        letterSpacing: "0.19px",
        opacity: 1,   
    },
    star: {
        color: "#FF5B5B"
    },
})

// Exporting the Component
export default function Labels(props) {

    // Destructuring the props
    const { text } = props;
    
    const classes = useStyles();

    return (
        
        <div>
            <Typography className={classes.root}>                
                {text}{"  "}<span className={classes.star} >{" "}*</span>
            </Typography>      
        </div>
    )
}
