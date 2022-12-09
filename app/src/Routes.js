import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import ClientHistory from './pages/ClientHistory';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Client from './pages/Client';
import ClientCheckpad from './pages/ClientCheckpad'


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/client-history" component={ClientHistory} />
            <Route path="/login" component={Login} />
            <Route path="/menu" component={Menu} />
            <Route path="/client" component={Client} />
            <Route path="/client-checkpad" component={ClientCheckpad} />
{/*             <Route path="/post/:id" component={Post} /> */}
            <Redirect from='*' to='/' />
        </Switch>
    )
}