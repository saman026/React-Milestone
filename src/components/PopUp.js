import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, DialogActions } from '@material-ui/core';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import { pxToRem, pxToVw } from '../utils/theme';
import { addInvoice, editInvoice, deleteInvoice, setErrorsName, setErrorsNumber, setErrorsAmount, setErrorsId,setErrorsDate, addSelected } from "../actions/action";
import { connect, useDispatch } from 'react-redux';
import { addInvo, editInvo, deleteInvo } from '../services/services';
import Notification from './Notification';

// Styling
const useStyles = makeStyles(theme => ({
    
    dialogWrapper: {
        width: pxToRem(1106),
        margin: 'auto',
        backgroundColor: '#2A3E4C',
        color: '#97A1A9',
        position: 'absolute',
    },
    
    leftAlignDialogActions: {
        paddingLeft: pxToRem(50),
    },
    
}))

function Popup(props) {

    const dispatch = useDispatch();

    // Destructuring the props
    const { title, children, openPopup, setOpenPopup, type, name_customer, cust_number, total_open_amount, invoice_id, due_in_date, notes, details } = props;

    const classes = useStyles();

    // State for snackbar
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    // Object 'user' containing all the values as per user input
    const user = {
        name_customer: name_customer,
        cust_number: cust_number,
        invoice_id: invoice_id,
        doc_id: invoice_id,
        total_open_amount: total_open_amount,
        due_in_date: due_in_date,
        notes:notes,
    }

    const reset = () => ({
        k: console.log('restfor', props.details.total_open_amount),
        total_open_amount: details.total_open_amount,
        due_in_date: details.notes,
    })


    const clear = () => ({

    })

    // Function to handle Submit on the basis of type i.e; ADD, EDIT, DELETE
    // Type 1 => ADD; Type 2 => EDIT; Type 3 => DELETE
    const onSubmit = async (e) => {

        // Handling Add
        if (type === 1) {
            
            // Checking and setting for errors
            if (name_customer === "" || cust_number === "" || invoice_id === "" || total_open_amount === "" || due_in_date === "") {
                if (name_customer === "") {
                    
                    dispatch(setErrorsName(true))
                }
                if (cust_number === "") {
                    
                    dispatch(setErrorsNumber(true))
                }
                if (invoice_id === "") {
                    
                    dispatch(setErrorsId(true ))
                }
                if (total_open_amount === "") {
                    
                    dispatch(setErrorsAmount( true))
                }
                if (due_in_date === "") {
                    
                    dispatch(setErrorsDate(true ))
                }
                setNotify({
                    isOpen: true,
                    message: 'Mandatory fields can\'t be empty',
                    type: 'warning'
                })

            }
            else {
                addInvo(user).then(res => {
                    console.log("addInvoice")
                    props.addInvoice(user)
                        setNotify({
                            isOpen: true,
                            message: 'Added Successfully',
                            type: 'success'
                        })
                    
                        setOpenPopup(false)
                    
                }).catch(err => {
                    setNotify({
                        isOpen: true,
                        message: 'Please check the given inputs!!',
                        type: 'error'
                    })  
                })
            }
        };

        // Handling Edit 
        if (type === 2) {
            const user = {
               total_open_amount: total_open_amount,
                notes: notes,
                doc_id: details.doc_id 
            }
            editInvo(user).then(res => {
                props.editInvoice(user);
                setNotify({
                    isOpen: true,
                    message: 'Edited Successfully',
                    type: 'success'
                })
                setOpenPopup(false)

            }).catch(err => {
                setNotify({
                    isOpen: true,
                    message: 'Invoice Amount can\'t be empty!',
                    type: 'error'
                })
            })
        }


        // Handling Delete
        if (type === 3) {
            console.log(props.selected, "selected in popup")
            deleteInvo(props.selected).then(res => {
                props.deleteInvoice(props.selected)
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'success'
                })
                let selected = [];
                let number = 0;
                props.addSelected(selected, number);
                setOpenPopup(false)

            }).catch(err => {
                setNotify({
                    isOpen: true,
                    message: 'Error in deleting! Please try again!!',
                    type: 'error'
                })
            })
        }
        
    }
    
    return (
        <>
            {/* Snackbar Component */}
            <Notification notify={notify} setNotify={setNotify} />

            {/* Dialog Starts */}
            <Dialog open={openPopup} maxWidth={props.maxWidth} classes={{ paper: classes.dialogWrapper }}>
                
                <DialogTitle className={classes.dialogTitle}>                   
                    <div style={{ display: 'flex' }}>
                        
                        <Typography variant="h6" component="div" style={{ flexGrow: 1, color: 'white' }}>                           
                            {title}                            
                        </Typography>
                        
                        <Controls.ActionButton                           
                            background="none"                           
                            onClick={() => { setOpenPopup(false) }}>                            
                            <CloseIcon />                            
                        </Controls.ActionButton>
                        
                    </div>
                </DialogTitle>
                
                <DialogContent dividers>   
                    {children}    
                </DialogContent>
                
                <DialogActions className={classes.leftAlignDialogActions}>
                    
                    {/* Add */}
                    {type === 1 && (
                        <>
                        
                            <Controls.Button text="Cancel" variant="text" style={{ color: '#14AFF1', marginLeft: 0, paddingLeft: 0 }} onClick={() => { setOpenPopup(false) }} />                           
                            <div style={{ flex: '1 0 0' }} />
                            <Controls.Button text='Clear' onClick={clear} /> 
                            <Controls.Button text="Add" variant="contained" onClick={(e) => onSubmit()} style={{ marginRight: pxToVw(25) }} />                         
                        </>
                    )}

                    {/* Edit */}
                    {type === 2 && (
                        <>
                            <Controls.Button text="Cancel" variant="text" style={{ color: '#14AFF1', marginLeft: 0, paddingLeft: 0 }} onClick={() => { setOpenPopup(false) }} />                           
                            <div style={{ flex: '1 0 0' }} />                         
                            <Controls.Button text='Reset' onClick={reset} />                            
                            <Controls.Button text="Save" variant="contained" onClick={(e) => onSubmit()} style={{ marginRight: pxToVw(25) }} />  
                        </>
                    )}

                    {/* Delete */}
                    {type === 3 && (
                        <>
                            <Controls.Button text='Cancel' onClick={() => { setOpenPopup(false) }} />                          
                            <Controls.Button text="Delete" variant="contained" onClick={(e) => onSubmit()} style={{ marginRight: pxToVw(25) }} />                       
                        </>
                    )}

                </DialogActions>
                
            </Dialog>
            {/* Dialog Ends */}
   </> )
}

// Extracting values from store
const mapStateToProps = state => ({
    name_customer: state.name_customer,
    cust_number: state.cust_number,
    total_open_amount: state.total_open_amount,
    invoice_id: state.invoice_id,
    due_in_date: state.due_in_date,
    notes: state.notes,
    details: state.details,
    selected: state.selected,
    invoices: state.invoices,
})

// Dispatching actions to store
const mapDispatchToProps = dispatch => ({
    
    addInvoice: (user) => {
        dispatch(addInvoice(user));
    },

    editInvoice: (details) => {
        dispatch(editInvoice(details));
    },

    deleteInvoice: (selected) => {
        dispatch(deleteInvoice(selected));
    },

    setErrorsName: (data) => {
        dispatch(setErrorsName(data));
    },
    setErrorsNumber: (data) => {
        dispatch(setErrorsNumber(data));
    },
    setErrorsId: (data) => {
        dispatch(setErrorsId(data));
    },
    setErrorsAmount: (data) => {
        dispatch(setErrorsAmount(data));
    },
    setErrorsDate: (data) => {
        dispatch(setErrorsDate(data));
    },

    addSelected: (selected, edit) => {
        dispatch(addSelected(selected, selected.length, edit));
      }
})

// Connecting with the store
// Exporting the Component
export default connect(mapStateToProps, mapDispatchToProps)(Popup)