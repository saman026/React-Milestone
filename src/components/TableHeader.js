import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { pxToRem } from '../utils/theme';

// Styling
const StyledTableCell = withStyles({
  head: {
    background: 'none',
    color: '#97A1A9',
    borderBottom: '1px solid #283A46',
    width: '100vw',
    fontSize: pxToRem(18),
    fontFamily: 'Ubuntu, sans-serif',
    zIndex: 10,
    paddingLeft: '1rem'
  },
  
})(TableCell);
  

// Exporting the Component
export default function CustomTableHeader(props) {

  //  Destructuring the props
  const { onSelectAllClick, numSelected, rowCount, label1, label2, label3, label4, label5, label6, label7, label8 } = props;
  
  // Labels to be displayed in header
  const headCells = [ 
    { id: 'cust_name', numeric: true, disablePadding: true,  label: label1 },
    { id: 'cust_number', numeric: true, disablePadding: false, label: label2 },
    { id: 'invoice_number', numeric: true, disablePadding: false, label: label3 },
    { id: 'invoice_amount', numeric: true, disablePadding: false, label: label4 },
    { id: 'due_date', numeric: true, disablePadding: false, label: label5 },
    { id: 'delay', numeric: false, label: label6 },
    { id: 'predicted_aging_bucket', numeric: true, label: label7 },
    { id: 'notes', numeric: true,  label: label8 },
  ];  
  
  return (      
    <TableHead>     
      <TableRow>
        
        {/* If label7 is present then the checjbox will be visible */}
        {label7 && (          
          <StyledTableCell padding="checkbox">            
            <Checkbox 
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all invoices' }}
            />
          </StyledTableCell>          
        )}
        
        {headCells.map((headCell) => (            
          <StyledTableCell              
            key={headCell.id}            
            align={headCell.numeric ? 'left' : 'right'}
          >           
            {headCell.label}              
          </StyledTableCell>         
        ))}
        
      </TableRow>     
    </TableHead>
  ); 
}
  
  