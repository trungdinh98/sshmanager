import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Keys from './Keys/Keys.js';
import Users from './Users/Users.js';
import Projects from './Projects/Projects.js';
import Resources from './Resources/Resources.js';
import Login from './Login/Login.js';
import Xterm from './Resources/Xterm';
import Logging from './Logging/Logging'
import LogTerm from './Logging/LogTerm'

export default () => (
    <Switch>
        <Route exact path='/' component={Projects}/>
        <Route path='/users' component={Users}/>
        <Route path='/projects' component={Projects}/>
        <Route path='/resources' component={Resources}/>
        <Route path='/keys' component={Keys}/>
        <Route path='/login' component={Login}/>
        <Route path='/xterm' component={Xterm}/>
        <Route path='/logging' component={Logging}/>
        <Route path='/logTerm' component={LogTerm}/>

    </Switch>
)
