import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography, withStyles } from '@material-ui/core';
import Input from './controls/Input';
import Labels from './Labels';
import Controls from './controls/Controls';
import { pxToRem } from '../utils/theme';
import { connect, useDispatch } from 'react-redux';
import { addDetails, setErrorsAmount, setErrorsDate, setErrorsId, setErrorsName, setErrorsNumber }   from '../actions/action';

// Styling
const useStyles = makeStyles({
    align: {
        alignSelf: 'center'
    },
    margin: {
        marginBottom: pxToRem(28)
    },
})

// Styling the input
const CustomInput = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            height: pxToRem(45),
            backgroundColor: '#283A46 ',
            paddingLeft: pxToRem(20)
        },

        '& .MuiOutlinedInput-input': {
            paddingLeft: 0 
        },
    }
})(Input)


function AddModal(props) {

    //  Destructuring the props
    const { addDetails, error_cust_number, error_customer_name, error_due_in_date, error_total_open_amount, error_invoice_id } = props;

    // Initializing the form fields with empty string
    const [formData, setFormData] = useState({
        name_customer: "",
        cust_number: "",
        invoice_id: "",
        total_open_amount: "",
        due_in_date: "",
        notes: "",
    });
 
    const dispatch = useDispatch();

    //  Destructuring the formData
    const { name_customer, cust_number, invoice_id, total_open_amount, due_in_date, notes } = formData;
    
    // Handling onChange
    const onChange = (e) => {  
        setFormData({
            ...formData, [e.target.name]: e.target.value,             
        })
        dispatch(setErrorsName(false));
        dispatch(setErrorsNumber(false));
        dispatch(setErrorsId(false));
        dispatch(setErrorsDate(false));
        dispatch(setErrorsAmount(false));
    };
 
    const classes = useStyles();

    var user = {
        name_customer,
        cust_number,
        invoice_id,
        total_open_amount,
        due_in_date,  
        notes     
    };

    // Dispatching action to the store for storing user's input
    addDetails(user);
    
      
    return (
        
        <Grid container >
            <Grid item xs={12} sm={7}>
                <Grid container >

                    <Grid item xs={12} container className={classes.margin} >
                        
                        <Grid item xs={4} className={classes.align}>
                            <Labels text="Customer Name" />
                        </Grid>
                        
                        <Grid item xs={6} align="left">      
                            <CustomInput name="name_customer" error={error_customer_name} value={name_customer} onChange={(e) => onChange(e)} />  
                        </Grid>
                        
                    </Grid>
                    
                    <Grid item xs={12} container className={classes.margin}>
                        
                        <Grid item xs={4} className={classes.align}>
                            <Labels text="Customer No." />
                        </Grid>
                        
                        <Grid item xs={6} align="left">
                            <CustomInput name="cust_number" error={error_cust_number} value={cust_number} onChange={(e) => onChange(e)} />
                        </Grid>
                        
                    </Grid>
                    
                    <Grid item xs={12} container className={classes.margin}>
                        
                        <Grid item xs={4} className={classes.align}>
                            <Labels text="Invoice No." /> 
                        </Grid>
                        
                        <Grid item xs={6} align="left">
                            <CustomInput name="invoice_id" error={error_invoice_id} type="number" value={invoice_id} onChange={(e) => onChange(e)}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container>
                        <Grid item xs={4} className={classes.align}>
                            <Labels text="Invoice Amount" />           
                        </Grid>
                        <Grid item xs={6} align="left">
                            <CustomInput name="total_open_amount" error={error_total_open_amount} type="number" value={total_open_amount} onChange={(e) => onChange(e)}/>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>

            <Grid item xs={12} sm={5}>
                <Grid item xs={12} container className={classes.margin}>
                    <Grid item xs={4} className={classes.align}>  
                        <Labels text="Due Date"  />
                    </Grid>
                    <Grid item xs={6} align="left">
                        <CustomInput type="date" name="due_in_date" error={error_due_in_date} value={due_in_date} onChange={(e) => onChange(e)} />
                    </Grid>
                </Grid>

                <Grid item xs={12} container  >
                    <Grid item xs={4} >
                        <Typography className={classes.root} >
                            Notes{"  "}
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={6} align="left" >
                        
                        <Controls.Input name="notes" value={notes} onChange={(e) => onChange(e)} multiline style={{ backgroundColor: '#283A46 ', }} />
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
        
    )
}

// Extracting data from the store
const mapSateToProps = state => ({
    error_cust_number: state.error_cust_number,
    error_customer_name: state.error_customer_name,
    error_invoice_id: state.error_invoice_id,
    error_total_open_amount: state.error_total_open_amount,
    error_due_in_date: state.error_due_in_date
  
})

// Dispatching actions to the store
const mapDispatchToProps = (dispatch) => ({
    addDetails: (user) => {
      dispatch(addDetails(user));
    },
});
  
// Connecting to the store
// Exporting the component
export default connect(mapSateToProps, mapDispatchToProps)(AddModal);

