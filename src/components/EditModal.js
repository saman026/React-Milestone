import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography, withStyles } from '@material-ui/core';
import Input from './controls/Input';
import Labels from './Labels';
import Controls from './controls/Controls';
import { pxToRem } from '../utils/theme';
import { connect } from 'react-redux';
import { editDetails, } from '../actions/action';
import { getData } from '../services/services';

// Styling Input
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

// Other stylings
const useStyles = makeStyles({
    align: {
        alignSelf: 'center'
    },
    margin: {
        marginBottom: pxToRem(28)
    },   
})



function EditModal(props) {
    
    //  Destructuring the props
    const { editDetails, edit } = props;

    
    // Initializing the state
    const [formData, setFormData] = useState({       
        total_open_amount: edit.total_open_amount,     
        notes: edit.notes,       
    });
    
    //  Destructuring formData
    const { total_open_amount, notes } = formData;
    
    // Handling onChange event
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const classes = useStyles();

    // Dispatching the formData values to store using editdetails function
    editDetails(formData);

    return (
        <Grid >
            <Grid item xs={12}>
                
                <Grid item xs={12} container>       
                    <Grid item xs={5} className={classes.align}>                    
                        <Labels text="Invoice Amount" />                  
                    </Grid>
                                   
                    <Grid item xs={6} align="left">                    
                        <CustomInput name="total_open_amount" value={total_open_amount} type="number" onChange={(e) => onChange(e)} />
                    </Grid>                         
                </Grid>

                <Grid item xs={12} container style={{ marginTop: pxToRem(28) }} >
                    <Grid item xs={5} >           
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
const mapStateToProps = state => ({
    edit: state.details,
    selected: state.selected,
})

// Dispatching actions to the store
const mapDispatchToProps = (dispatch) => ({
    editDetails: (user) => {
      dispatch(editDetails(user));
    },
   
});
  
// Connecting to the store
// Exporting the component
export default connect(mapStateToProps, mapDispatchToProps)(EditModal);

