import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { pxToRem } from '../utils/theme';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CustomButton from '../components/controls/Button';
const styles = makeStyles({
    root:{
        marginLeft: '39vw',
        textAlign: 'center',
        position: 'absolute',
        marginTop: '20vh',
    }  
})

// Exporting the component
export default function NoResult() {

    const classes = styles();

    return (
        <div className={classes.root} >
            <ErrorOutlineIcon style={{height: pxToRem(39), width:pxToRem(39), color: '#CD7925'}} />
            <Typography style={{ fontSize: pxToRem(22), fontFamily: 'Ubuntu, sans-serif', color: 'white' }}>No results found</Typography>
            <p style={{ color: '#C0C6CA', fontSize: pxToRem(16) }}>Try readjusting your search to find what you are looking for.</p>

            <CustomButton text="Clear Serach" variant="text" style={{ color: '#14AFF1' }}></CustomButton>
        </div>
    )
}
