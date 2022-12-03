import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Checkpad from './pages/Checkpad';
import ClientHistory from './pages/ClientHistory';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Client from './pages/Client';


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/checkpad" component={Checkpad} />
            <Route path="/client-history" component={ClientHistory} />
            <Route path="/login" component={Login} />
            <Route path="/menu" component={Menu} />
            <Route path="/client" component={Client} />
{/*             <Route path="/post/:id" component={Post} /> */}
            <Redirect from='*' to='/' />
        </Switch>
    )
}