import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { pxToRem, pxToVh } from '../../utils/theme';
import { Typography } from '@material-ui/core';

// Styling 
const useStyles = makeStyles((theme) => ({
  
  root: {
    position: 'relative',
    width: pxToRem(65),
    marginTop: pxToRem(113), 
    height: pxToRem(81),     
    margin: 'auto',
  },

  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },

  top: {
    color: '#14AFF1',
    animationDuration: '800ms',
    position: 'absolute',
    left: pxToVh(0),    
  },
  
  circle: {
    strokeLinecap: 'round',
  },
  text: {
    color: '#C0C6CA',
    marginBottom: pxToRem(174),
  }
  
}));


function CircularProgressBar(props) {
  const classes = useStyles();


  return (

    <div className={classes.root}>

      {/* Lower ProgressBar */}
      <CircularProgress        
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={2}     
        {...props}
        value={100}
      />
       {/* Upper ProgressBar */}
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={2}
        {...props}
      />
      
    </div>
  );
}

// Exporting the component
export default function CustomizedProgressBars() {
  const classes = useStyles();

  return (
    <>
      <CircularProgressBar />
      
      <div align="center">
        <Typography className={classes.text}>
          Loading           
        </Typography>
      </div>
    </>
    
  );
}
