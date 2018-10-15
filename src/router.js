import {
    Router,
    Route,
    Redirect
} from 'react-router-dom';
import createBrowserHistory from 'history/es/createBrowserHistory'
import App from './App';
import {ReactDOM} from 'react-dom';
import React, { Component } from 'react';

var routes = () => {
    return (
    <div>
        <Router history={createBrowserHistory()} >
            <Route path="/" component={App}>
                
            </Route> 
        </Router>

    </div>

    );

    
}

export default routes;