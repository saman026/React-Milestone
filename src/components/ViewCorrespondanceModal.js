import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputBase, makeStyles, NativeSelect, TableBody, TableCell, TableRow, Typography, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { pxToRem, pxToVw } from '../utils/theme'
import Controls from './controls/Controls'
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CustomTableHeader from './TableHeader'
import { formatter } from '../utils/formatter';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'

// Styling
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        fontFamily: 'Ubuntu, sans-serif',
        fontSize: pxToRem(20),
        backgroundColor: '#2A3E4C',
        color: '#C0C6CA',
    },
    leftAlignDialogActions: {
        paddingLeft: pxToRem(50),
    },
    margin: {
        marginLeft: pxToRem(20),
        marginRight: pxToRem(45)
    } 
}))

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': { 
            marginTop: theme.spacing(3),  
        },
    },
    input: {
        width: pxToRem(140),
        border: '1px solid #14AFF1',
        borderRadius: '10px',
        opacity: '1',
        backgroundColor: '#283A46',
        paddingLeft: '1rem',
        paddingRight: '2rem',
        color: 'white',

        '&:focus': {
            borderRadius: 10,
        },
    },
}))(InputBase);
  

const CustomArrow = withStyles({
    root: {
        color: '#97A1A9',
        paddingRight: '0.5rem'
    }
})(KeyboardArrowDownIcon)


// Styling TableCell
const CustomTableCell = withStyles(theme => ({     
    root: {
        borderBottom: 'none',
        paddingTop: '0.4rem'
    },
    body: {
        fontSize: pxToRem(20),       
        fontFamily: 'Ubuntu, sans-serif',   
        lineHeight: pxToRem(24),     
        letterSpacing: '0px',     
        color: '#FFFFFF',     
        opacity: 1,     
        paddingLeft: '3vw'      
    },

}))(TableCell);


// Styling TableRow
const StyledTableRow = withStyles((theme) => ({    
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: '#283A46',
        },
    },
}))(TableRow);
  
function ViewCorrespondanceModal(props) {

    // Defining initial state
    const [type, setType] = useState('1');

    // Handling state change
    const handleChange = (event) => {
      setType(event.target.value);
    };

    let totalAmount = 0;

    const classes = useStyles();   

    // Handling the Download button clicked event
    const handleClick = () => {
        let rows = [];
        props.invoice.forEach((row, index) => {
            let temp = [
                row.invoice_id,
                row.doc_id,
                row.posting_date,
                row.due_in_date,
                row.invoice_currency,
                row.total_open_amount
            ];
            rows.push(temp);
        });
        
        let cols = [
            "Invoice number",
            "PO Number",
            "Invoice Date",
            "Due Date",
            "Invoice Currency",
            "Invoice Amount",
        ];

        // Initializing jsPDF
        const doc = new jsPDF();
        
        // Content of the pdf
        doc.autoTable(cols, rows, { startY: 10 })
        
        // Downloading the pdf
        doc.save("Correspondance.pdf");
    }

    return (           
        <>
            <Dialog open={props.openPopup} maxWidth="lg" classes={{ paper: classes.dialogWrapper }} >       
                <DialogTitle>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1, color: 'white' }}>
                            <span style={{ fontSize: pxToRem(28), lineHeight: pxToRem(32), fontFamily: 'Ubuntu, sans-serif' }}>View Correspondance{" "}({props.number})</span>
                        </Typography>
                       
                        <Typography style={{ alignItems: 'center' }}>View:</Typography>
                        <FormControl className={classes.margin}>                                 
                            <NativeSelect                               
                                IconComponent={CustomArrow}                               
                                value={type}                               
                                onChange={handleChange}                               
                                input={<BootstrapInput />}                               
                            >                               
                                <option value={1}>Template 1</option>                                
                                <option value={2}>Template 2</option>
                                
                            </NativeSelect>                            
                        </FormControl>
                        
                        <Controls.ActionButton
                            background="none"
                            onClick={()=>{props.setOpenPopup(false)}}>
                            <CloseIcon />
                        </Controls.ActionButton>
                        
                    </div>
                </DialogTitle>
                <DialogContent dividers id="divToPrint" style={{ backgroundColor: '#2A3E4C' }} >                   
                    <p>Subject: <span style={{ color: '#FFFFFF' }}>Invoice Details - Account Name</span></p>                   
                    <div>Dear Sir/Madam,</div>
                    
                    {/* Redering on the basis of template type 1 or 2 */}
                    {type === '1' && (
                        <>
                            <div>Greetings</div>
                            <p>This is to remind you that there are one or more open invoices on your account. Please provide at your earliest convenience an update on the payment details or clarify the reason for the delay. If you have any specific issue with the invoice(s), please let us know so that we can address it to the correct Department.</p>
                        </>
                    )}
                    {type === '2' && (   
                        <p>Gentle reminder that you have one or more open invoices on your account. Please get back to us with an expected date of payment. If you have any specific issue with the invoice(s), please let us know so that we can address it at the earliest.</p>                                             
                    )}
                    <p>Please find the details of the invoices below:</p>
                    
                    <div style={{ paddingLeft: '2rem' }}>
                        <CustomTableHeader
                            label1="Invoice number"
                            label2="PO Number"
                            label3="Invoice Date"
                            label4="Due Date"
                            label5="Currency"
                            label6="Open Amount($)"
                        />
                    </div>
                    
                    <TableBody>                
                        {props.invoice && props.invoice    
                            .map((row, index) => {                        
                                totalAmount += row.total_open_amount
                                
                                return (                         
                                    <StyledTableRow                                        
                                        hover                                       
                                    >                                   
                                        <CustomTableCell component="th" align="center" scope="row" padding="none">                                          
                                            {row.invoice_id}
                                        </CustomTableCell>                                        
                                        <CustomTableCell style={{ paddingLeft: '5vw' }} align="center" >{row.doc_id}</CustomTableCell>                                       
                                        <CustomTableCell style={{ paddingLeft: '5vw' }} align="center">{row.posting_date}</CustomTableCell>                
                                        <CustomTableCell style={{ marginLeft: '4vw' }} align="center">{row.due_in_date}</CustomTableCell>                     
                                        <CustomTableCell style={{ paddingLeft: '5vw' }} align="center">{row.invoice_currency}</CustomTableCell>         
                                        <CustomTableCell style={{ paddingLeft: '13vw' }} align="right">{formatter(row.total_open_amount)}</CustomTableCell>                                     
                                    </StyledTableRow>                                 
                                );
                            })                           
                        }                       
                    </TableBody>
                    
                    {type === '1' && (                       
                        <p><br></br>Total Amount to be paid: $ <span style={{ color: '#FFFFFF' }}>{formatter(totalAmount)}</span> </p>                       
                    )}
                    
                    <p> <br></br>In case you have already made a payment for the above items, please send us the details to ensure the payment is posted. <br></br>Let us know if we can be of any further assistance.                      
                        Looking forward to hearing from you.</p><br></br>                  
                    <div>Kind Regards,</div>                   
                            
                    <div style={{ color: '#FFFFFF' }}>[Sender’s First Name][Sender’s Last Name]</div>                   
                    <div>Phone : <span style={{ color: '#FFFFFF' }}>[Sender’s contact number]</span></div>
                    <div>Fax : <span style={{ color: '#FFFFFF' }}>[If any]</span></div>
                    <div>Email :<span style={{ color: '#FFFFFF' }}>[Sender’s Email Address]</span></div>
                    <div style={{ color: '#FFFFFF' }}>Company Name[Sender’s Company Name]</div>

                </DialogContent>
                <DialogActions >
              
                    <Controls.Button text="Cancel" variant="text" style={{ color: '#14AFF1', paddingRight: pxToRem(25) }} onClick={() => { props.setOpenPopup(false) }} />                   
                    <Controls.Button text="Download" variant="contained" style={{ marginRight: pxToVw(25) }} onClick={handleClick} />
                    
                </DialogActions>
            </Dialog>
        </>
    ) 
}

// Extracting data from the store
const mapSateToProps = state => ({
    number: state.number,
    selected: state.selected,
        
})

// Connecting to the store
// Exporting the component
export default connect(mapSateToProps)(ViewCorrespondanceModal)