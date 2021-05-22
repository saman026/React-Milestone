import React from 'react'
import Header from '../components/Header';
import PageHeader from '../components/GridHeader';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CustomTableToolbar from '../components/TableToolbar';
import { pxToRem, pxToVh } from '../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import CustomTable from '../components/Table';

// Styling
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
  
// Exporting the component
export default function ReceivablesDashboard() {

  const classes = useStyles();
  return (
    <div>
      <Header />
      <PageHeader />     
      <Card className={classes.root}>     
        <Paper elevation={0} className={classes.paper}>
          <CustomTableToolbar style={{ marginTop: pxToVh(30), }} />
          <CustomTable />
        </Paper>
      </Card>
    </div> 
  )
}
