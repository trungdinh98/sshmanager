import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Keys from './Keys/Keys.js';
import Users from './Users/src/Users';
import Projects from './Projects/Projects.js';
import Resources from './Resources/Resources.js';
import Login from './LoginRegister/Login.js';
import Register from './LoginRegister/Register.js';
//import Profile from './Users/Profile.js';
import Xterm from './Resources/Xterm';
import ProjectUsers from './Users/ProjectUsers.js';

class MainComponent extends React.Component {
    render () {
         return (
            <Switch>
                <Route exact path='/' component={Projects}/>
                <Route path='/project_users' component={ProjectUsers} />
                <Route path='/users' component={Users}/>
                <Route path='/projects' component={Projects}/>
                <Route path='/resources' component={Resources}/>
                <Route path='/keys' component={Keys}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                {/* <Route path='/profile' component={Profile}/> */}
                <Route path='/xterm' component={Xterm}/>
            </Switch>
        )
    }
}

export default MainComponent;
