import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';
import CollectorDashboard from '../src/views/CollectorDashboard';
import Dashboard from './views/ReceivablesDashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROLL_NUMBER } from '../src/utils/constants';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: 'none',
    },
  },
  mainBackground: {
    background: theme.palette.primary.mainGradient,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));


const App = () => {
  
  const classes = useStyles();
  return (
    <div className={classes.mainBackground}>
      <Router basename={`/${ROLL_NUMBER}`}>
        <Switch>
        <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={CollectorDashboard} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
