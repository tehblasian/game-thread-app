import React from 'react';
import { render } from 'react-dom'; 
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import GameThreads from './GameThreads'

export default class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/thread' component={GameThreads}/>
                </Switch>      
            </BrowserRouter>
        )
    }
}