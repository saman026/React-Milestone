import React from 'react'
import { Button as MuiButton, withStyles } from "@material-ui/core";
import { pxToRem } from '../../utils/theme';

// Styling 
const CustomButton = withStyles(theme => ({
    
    root: {
        '&.MuiButton-contained': {
            backgroundColor: '#97A1A9',
            '&:disabled': {
                color: '#FFFFFF'
            },
            '&:enabled': {
                backgroundColor: '#14AFF1'
            }
        },
        '&:disabled': {
            color: '#97A1A9',
            borderColor: '#97A1A9',
        },
        '&:enabled': {
            color: '#FFFFFF'
        },
        margin: theme.spacing(0.5),
        height: pxToRem(45),
        borderRadius: pxToRem(10),
        borderColor: '#14AFF1',
    },
    
    label: {
        textTransform: 'none',
    },
   
}))(MuiButton);

function Button(props) {

    // Destructuring the props
    const { text, size, color, variant, onClick, widthCustom, ...other } = props;

    return (
                  
        <CustomButton
            style={{width: pxToRem(widthCustom)}}
            variant={variant || "outlined"}
            size={size}
            color={color}
            onClick={onClick}
            {...other}
        >
            {text}
        </CustomButton>
    )
}

// Exporting the Component
export default Button;
  
  