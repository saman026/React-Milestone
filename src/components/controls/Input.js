import React from 'react'
import { TextField, withStyles } from '@material-ui/core';
import { pxToRem, pxToVh} from '../../utils/theme';

// Customizing the TextField
const CustomInput = withStyles({
  root: {
    '& .MuiInputBase-input': {
      fontSize: pxToRem(18),
      lineHeight: pxToVh(21),
      letterSpacing: '0',
      color: '#97A1A9',   
    },
           
    '& .MuiOutlinedInput-multiline': {
      paddingTop: 0,
      height: pxToRem(191),          
    },
    
    '& .MuiOutlinedInput-root': {
      width: pxToRem(300),
      borderRadius: pxToRem(10), 
      '& fieldset': {
        borderColor: '#356680',
      },
      
      '&:hover fieldset': {
        borderColor: 'white',
      },
      
      '&.Mui-focused fieldset': {
        borderColor: '#14AFF1',
      },
      

      '&:error fieldset': {
        borderColor: 'red'
      }
    },
  },
})(TextField)

// Exporting the Component
export default function Input(props) {

  // Destructuring of props passed from the Parent Component
  const { name, label, value, flag, onChange, ...other } = props;
  
  return (
  
    <CustomInput
      variant="outlined"
      label={label || ''}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      {...other}
    />
  )
}
