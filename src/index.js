import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    /*
     * Remove React.StrictMode until Material UI has found a fix for
     * https://github.com/mui-org/material-ui/issues/13394
     *
     * <React.StrictMode>
     *     <App/>
     * </React.StrictMode>
     */
    <App/>,
    document.getElementById('root')
);
