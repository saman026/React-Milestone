import React, { useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Controls from './controls/Controls'
import { pxToRem } from '../utils/theme';
import Grid from '@material-ui/core/Grid';
import { InputAdornment, withStyles } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import AddIcon  from '@material-ui/icons/Add';
import RemoveIcon  from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import Popup from './PopUp';
import AddModal from './AddModal';
import Input from './controls/Input'
import EditModal from './EditModal';
import Delete from './DeleteModal';
import { connect, useDispatch } from 'react-redux';
import {handleSearchData} from '../actions/action'
import ViewCorrespondanceModal from './ViewCorrespondanceModal';
import { getData } from '../services/services';
import Notification from './Notification';
import { prediction } from '../services/services';
import { setPrediction } from '../actions/action';
// Styling
const useToolbarStyles = makeStyles((theme) => ({

  title: { 
    flex: '1 1 100%',
  },
  icon: {
    width: pxToRem(20),
    height: pxToRem(20),
  }
}));

// Styling search input
const CustomSearch = withStyles({

  root: {     
    '& .MuiOutlinedInput-root': {     
      height: pxToRem(45),
    }
  }
})(Input)

const TableToolbar = (props) => {
  
  // Defining initial state
  const [openPopupAdd, setOpenPopupAdd] = useState(false)
  const [openPopupEdit, setOpenPopupEdit] = useState(false)
  const [openPopupDelete, setOpenPopupDelete] = useState(false)
  const [openPopupViewCorrespondance, setOpenPopupViewCorrespondance] = useState(false)
  
  const classes = useToolbarStyles();

  //  Destructuring the props
  const { number, selected } = props;

  // Debounce function
  const debounce = (func, delay) => {
    let timeID;
    return () => {
      clearTimeout(timeID);
      timeID = setTimeout(func, delay);
    };
  };

  const dispatch = useDispatch();

  let search_data;
  const handleChange = (e) => {
    const time = debounce(() => {      
      search_data = e.target.value;

      // Dispatching action to the store
      dispatch (handleSearchData(search_data));

    }, 6000);
    time();  
  }

  // Defining the initial state
  const [invoice, setInvoice] = useState([])
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  
  // Handling view correspondance 
  const handleClick = () => {
    setOpenPopupViewCorrespondance(true);
    getData(selected).then(res => {
      setInvoice(res.data);
      
    }).catch(err => {                      // Handling errors
      setNotify({
        isOpen: true,        
        message: 'Something went wrong! Please try again',                   
        type: 'error'                    
      })      
    })
  }

  const [predicted, setPredicted] = useState([]);
  const handlePredict = () => {
    getData(selected).then(res => {
      console.log(res.data, "predict res data");
      prediction(res.data).then(res => {
        console.log(res.data, "data")
        setPredicted(res.data)
      })
    }).catch(err => {
      console.log("not correct");
    })
  }

  console.log(predicted, "predictd not");
  props.setPrediction(predicted);
  return (
    <>
      {/* Snackbar Component */}
      <Notification notify={notify} setNotify={setNotify} />

      <Toolbar className={classes.root} >
        <Grid container >
          
          <Grid item xs={12} sm={6} >
            
            {/* Enabling disabling of buttons on the basis of number of rows(s) selected */}

            {number > 0 ? (             
              <>
                <Controls.Button text="Predict" variant="contained" widthCustom="106" onClick={handlePredict} />               
                <Controls.Button text="View Correspondance" onClick={handleClick} />
              </>
            ) : (               
                <>
                  <Controls.Button text="Predict" variant="contained" widthCustom="106" disabled />
                  <Controls.Button text="View Correspondance" disabled />
                </>
            )}
            
          </Grid>
          
          <Grid item xs={12} sm={6} align='right'>           
            <Controls.Button text="Add" widthCustom="99" startIcon={<AddIcon className={classes.icon} />} onClick={() => { setOpenPopupAdd(true); }} />                   
            {number === 1 ? (
              
              <Controls.Button text="Edit" widthCustom="102" enabled startIcon={<EditIcon className={classes.icon} />} onClick={() => { setOpenPopupEdit(true) }} />              
            ) : (               
                <Controls.Button text="Edit" widthCustom="102" disabled startIcon={<EditIcon className={classes.icon} />} />               
            )}
            
            {number > 0 ? (              
              <Controls.Button text="Delete" widthCustom="123" enabled startIcon={<RemoveIcon className={classes.icon} />} onClick={() => { setOpenPopupDelete(true) }} />        
            ) : (               
                <>
                  <Controls.Button text="Delete" widthCustom="123" disabled startIcon={<RemoveIcon className={classes.icon} />} />
                </>                     
            )}
            
            <CustomSearch style={{ marginTop: '5px', width: pxToRem(340), paddingLeft: '2px' }}             
              placeholder="Search by Invoice number"             
              type="number"             
              InputProps={{             
                endAdornment: (<InputAdornment position="end">                 
                  <Search style={{ height: pxToRem(32), color: '#97A1A9' }} />                 
                </InputAdornment>
                )
              }}             
              name="search"             
              onChange={handleChange}             
            />          
          </Grid>         
        </Grid>    

        {/* Add Modal */}
        <Popup          
          type={1}          
          maxWidth="xl"
          title="Add Invoice"          
          openPopup={openPopupAdd}         
          setOpenPopup={setOpenPopupAdd}         
        >
          <AddModal />          
        </Popup>

          {/* Edit Modal */}
        <Popup         
          type={2}
          maxWidth="xs"          
          title="Edit Invoice"         
          openPopup={openPopupEdit}         
          setOpenPopup={setOpenPopupEdit}
        >         
          <EditModal />          
        </Popup>
        
        {/* Delete Modal */}
        <Popup          
          type={3}          
          maxWidth="xs"         
          title="Delete record(s)?"         
          openPopup={openPopupDelete}         
          setOpenPopup={setOpenPopupDelete}       
        >          
          <Delete />         
        </Popup>
        
        {/* ViewCorrespondance Modal */}
        <ViewCorrespondanceModal         
          openPopup={openPopupViewCorrespondance}         
          setOpenPopup={setOpenPopupViewCorrespondance}         
          invoice={invoice}         
        />

      </Toolbar>
    </>   
  );  
};
      
// Extracting data from the store
const mapStateToProps = state => ({
  number: state.number,
  selected: state.selected,
  invoices: state.invoices,
  name_customer: state.name_customer,
  cust_number: state.cust_number,
})

const mapDispatchToProps = (dispatch) => ({
  setPrediction: (predicted) => {
    dispatch(setPrediction(predicted));
    console.log("PREDDD")
  },
})

// Connecting to the store
// Exporting the component
export default connect(mapStateToProps, mapDispatchToProps)(TableToolbar);
          

    
                
     
    
