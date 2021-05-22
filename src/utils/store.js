import {createStore} from 'redux';
import reducer from '../reducers/reducer';

//Creating and Exporting the store
export const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
