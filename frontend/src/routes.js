import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/';
import RegisterUser from './pages/RegisterUser/';
import Dashboard from './pages/Dashboard/';
import CreateTodo from './pages/CreateTodo/';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Login } />
                <Route path="/register" component={ RegisterUser } />
                <Route path="/dashboard" component={ Dashboard } />
                <Route path="/create" component={ CreateTodo } />
            </Switch>
        </BrowserRouter>
    );
}