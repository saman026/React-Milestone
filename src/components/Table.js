import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import CustomTableHeader from './TableHeader';
import { pxToRem, pxToVh } from '../utils/theme';
import { connect } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from '@material-ui/core/Typography';
import ProgressBar from './controls/ProgressBar';
import { formatter } from "../utils/formatter";
import { addSelected, setInvoices } from '../actions/action';
import NoResult from './NoResult';
import { SERVER_URL } from '../utils/constants';
import Moment from 'react-moment';

// Styling TableCell
const CustomTableCell = withStyles(theme => ({
  root: {  
    padding: 0,
    borderBottom: 'none',    
  },
  
  body: {
    fontSize: pxToRem(20),
    fontFamily: 'Ubuntu, sans-serif',
    lineHeight: pxToRem(24),    
    letterSpacing: '0px',    
    color: '#FFFFFF',    
    opacity: 1,
  },
  
}))(TableCell);

// Styling TableRow
const StyledTableRow = withStyles((theme) => ({

  selected: {
    backgroundColor: "#2A5368 !important",
  },
  root: {      
    '&:nth-of-type(even)': {     
      backgroundColor: '#283A46',  
    },
  },

}))(TableRow);
  
// Other Styles
const useStyles = makeStyles((theme) => ({
  root: {       
    '& .MuiCheckbox-colorSecondary': {         
      color: '#97A1A9'      
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {          
      color: '#14AFF1'
    },     
    borderRadius: '10px',        
    backgroundColor: '#273D49CC',       
    opacity: 1,        
    width: '97%',        
    margin: 'auto',   
    marginTop: pxToRem(30),       
    height: '80vh',
  },
  
  paper: {
    width: '100%',   
    marginBottom: theme.spacing(2),       
    backgroundColor: 'transparent',       
    marginLeft: 'auto',      
    elevation: 0 
  },

}));
  

const CustomTableBody = withStyles({
  width: '100vw'
})(TableBody)
  


function EnhancedTable(props) {

  console.log([props, "props"]);
  let [invoice, setInvoice] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);
  let search = [];

  // let [searchInvoice, setSearch] = React.useState([]);
  // Function to call fetch data API
  const fetchData = React.useCallback(async () => {
    try {

      // Data fetching using axios
      axios.get(
        `${SERVER_URL}FetchData?operation=fetchAll&pageCount=${pageCount}&limit=15`
      )
        .then((response) => {
          props.setInvoices([...invoice, ...response.data])
          setInvoice([...invoice, ...response.data]);
          isNextFunc(true);          
        })    
        .catch((error) => {       
          console.log(error);         
        })     
    } catch (error) {     
      console.log(error);      
    }; 
  });

  function fetchMoreData() {
    setCount(pageCount + 1);
  }
  
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })
  
  // Conditional Rendering
  React.useEffect(() => {
    // if search data is present, calling the search API
    if (props.searchData) {
      // let invoice = [];
      try {
        axios.get(
          `${SERVER_URL}FetchData?operation=searchData&invoice_no=${props.searchData}&pageCount=${pageCount}&limit=15`
        ).then((res) => {

          // Setting the result of the API call searchData variable
          props.setInvoices([...search, ...res.data]);
          setInvoice([...search, ...res.data])
          setSearchData(...res.data);
        }).catch(err => {                // Error Handling
          setNotify({
            isOpen: true,
            message: 'Error in searching!',
            type: 'error'
          })
        })
      }
      catch (error){
        console.log(error);
      }
    }
    else fetchData();
    
  }, [pageCount, props.searchData])


  let [searchData, setSearchData] = React.useState([]);
  const classes = useStyles();   
  const [selected, setSelected] = React.useState([]);

  // Function to handle the table head checkbox click event
  const handleSelectAllClick = (event) => {      
    if (event.target.checked) {       
      const newSelecteds = invoice.map((row) => row.doc_id);     
      setSelected(newSelecteds);      
      return;  
    }   
    setSelected([]);   
  };
  
  let newSelected = [];
  
  const [edit, setEdit] = React.useState([]);

  // Handling click for each row checkbox in table
  const handleClick = (event, name, notes, total_open_amount) => {
    
    const selectedIndex = selected.indexOf(name);    
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
       setEdit({
          doc_id: name,
          notes: notes,
          total_open_amount: total_open_amount
       })
      
    } else if (selectedIndex === 0) {      
      newSelected = newSelected.concat(selected.slice(1));

    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));

    } else if (selectedIndex > 0) {      
      newSelected = newSelected.concat(          
        selected.slice(0, selectedIndex),       
        selected.slice(selectedIndex + 1),          
      );
    }
    setSelected(newSelected);     
  };
  
  // passing selected rows doc_id to the store
  props.addSelected(selected, edit);

  // Checking for selected
  const isSelected = (name) => selected.indexOf(name) !== -1
     
  return ( 
    <>     
      <TableContainer >       
        <Table stickyHeader aria-label="sticky table" style={{ opacity: 1, zIndex: 1, }}
          className={classes.table}          
          aria-labelledby="tableTitle"         
        >        
          <InfiniteScroll            
            dataLength={invoice ? invoice.length : search.length}          
            next={fetchMoreData}           
            hasMore={isNext}           
            loader={                 
              <div               
                style={{ marginBottom: pxToRem(89) }}               
              >               
                <ProgressBar />               
              </div>              
            }          
            height={pxToVh(510)}            
          >           
            <CustomTableHeader style={{ zIndex: 20 }}            
              label1="Customer Name"             
              label2="Customer #"             
              label3="Invoice #"             
              label4="Invoice Amount"             
              label5="Due date"             
              label6="Delay"             
              label7="Predicted Aging Bucket"             
              label8="Notes"             
              classes={classes}             
              numSelected={selected.length}             
              onSelectAllClick={handleSelectAllClick}           
              rowCount={invoice.length}              
            />
            
            <CustomTableBody >

              {/* Conditional data display to the table */}
              {/* {props.invoices.length !== 0 ? (               */}
              {props.invoices && props.invoices
                .map((row, index) => {
                 
                  const isItemSelected = isSelected(row.doc_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (<>
                    {props.prediction && props.prediction.map((predicted, indx) => {
                     
                      <>
                        {predicted.doc_id === row.doc_id && (row.prediction = predicted.prediction)}
                        {predicted.doc_id === row.doc_id && (row.bucket = "> 60")}
                      </>
                     
                    })}
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.doc_id, row.notes, row.total_open_amount)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.doc_id}
                      selected={isItemSelected}
                    >
                        
                      <CustomTableCell padding="checkbox" style={{ paddingLeft: '1rem' }}>
                          
                        <Checkbox
                          classes={{
                            checked: classes.checked
                          }}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </CustomTableCell>
                        
                      <CustomTableCell component="th" align="left" id={labelId} scope="row" padding="none">
                        {row.name_customer}
                      </CustomTableCell>
                      <CustomTableCell align="left">{row.cust_number}</CustomTableCell>
                      <CustomTableCell align="left">{row.invoice_id}</CustomTableCell>
                      <CustomTableCell align="center">{formatter(row.total_open_amount)}</CustomTableCell>
                      <CustomTableCell align="left">
                        <Moment format="DD-MMM-YYYY">{row.due_in_date}</Moment>
                      </CustomTableCell>
                      <CustomTableCell align="right" style={{ paddingRight: '2rem' }}>
                        {row.prediction ? row.prediction : "--"}
                      </CustomTableCell>
                      <CustomTableCell align="left" style={{ paddingLeft: '2rem' }}>{row.bucket ? row.bucket : "--"}</CustomTableCell>
                      <CustomTableCell align="left">
                        <div style={{ textOverflow: 'ellipsis', width: '5rem' }}>
                          <Typography noWrap={true}>{row.notes}</Typography>
                        </div>
                      </CustomTableCell>
                    </StyledTableRow>
                  </>
                  );
                })}
                {!searchData &&<NoResult />}
                
                  
              

            </CustomTableBody>          
          </InfiniteScroll>         
        </Table>      
      </TableContainer>   
    </>
  );  
}
  
  
// Extracting state from store
const mapStateToProps = (state) => ({
  invoices: state.invoices,
  k: console.log(state, "srat"),
  searchData: state.searchData,
  prediction: state.prediction
})
    
// Dispatching actions to the store
const mapDispatchToProps = (dispatch) => ({
  setInvoices: (invoice) => {
    dispatch(setInvoices(invoice));    
  },
  
  addSelected: (selected, edit) => {
    dispatch(addSelected(selected, selected.length, edit));
  }
  
})
    
// Connecting to the store
// Exporting the component
export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);