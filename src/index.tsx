import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import AppWitchReducer from './AppWitchReducer';
import { AppWitchRedux } from './Components/AppWitchRedux';


ReactDOM.render(
    <Provider store={store}>
        <AppWitchRedux />
    </Provider>
    , document.getElementById('root'));


