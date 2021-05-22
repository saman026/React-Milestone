import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { pxToVh, pxToVw } from '../utils/theme'
import CompanyLogo from '../assets/companyLogo.svg'
import HRCLogo from '../assets/logo.svg'

// Styling
const styles = makeStyles({
    text: {
        paddingLeft: pxToVw(12),
        position: 'fixed',
        width: pxToVw(255),
        height: pxToVh(50),
        fontSize: pxToVw(39),
        lineHeight: pxToVh(50),
        fontFamily: "Futura PT",
        fontStyle: "normal",
         fontVariant : "normal",
        fontWeight: 'bold',
        letterSpacing: '0px',
        color: '#FFFFFF',
        opacity: 1,
    },
    imageCompany: {
        width: pxToVw(44),
        marginLeft: pxToVw(30),                      
        height: pxToVh(46),                           
    },
    imageHRC: {
        width: pxToVw(235),
        height: pxToVh(50),                    
        paddingLeft: pxToVw(9),                    
    }
})

function Header() {

    const classes = styles();

    return (
        <div>
            <Grid container>

                <Grid item xs={5} style={{paddingTop: pxToVh(20)}}>
                    
                    <img src={CompanyLogo} alt="Company Logo" className={classes.imageCompany} />
                    <span className={classes.text}>                       
                        ABC Products
                    </span>
                    
                </Grid>

                <Grid item xs={7} style={{paddingTop: pxToVh(22)}}>
                    <img src={HRCLogo} alt="HRC Logo" className={classes.imageHRC} />
                </Grid>
            </Grid>

        </div>     
    )
}

// Exporting the component
export default Header

