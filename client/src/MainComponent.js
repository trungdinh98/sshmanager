import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Keys from './Keys/Keys.js';
import Projects from './Projects/Projects.js';
import Resources from './Resources/Resources.js';
import Login from './LoginRegister/Login.js';
import Register from './LoginRegister/Register.js';
import Profile from './Users/Profile.js';
import Xterm from './Resources/Xterm';
import ProjectUsers from './Users/ProjectUsers/ProjectUsers.js';
import AddUsers from './Users/ProjectUsers/NewUser/AddUsers.js';
import Users from './Users/Users/Users.js';
import Logging from './Logging/Logging';
import LogTerm from './Logging/LogTerm';
import Landing from './Landing/Landing';
import jwt_decode from 'jwt-decode';

class MainComponent extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        console.log(token);
        if (token === undefined) {
            this.props.history.push(`/login`)
        }
    }
    render () {
         return (
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/projectUsers/' component={ProjectUsers} />
                <Route exact path='/projectUsers/add' component={AddUsers} />
                <Route path='/users' component={Users}/>
                <Route path='/projects' component={Projects}/>
                <Route path='/resources' component={Resources}/>
                <Route path='/keys' component={Keys}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/xterm' component={Xterm}/>
                <Route path='/logging' component={Logging}/>
                <Route path='/logTerm' component={LogTerm}/>
            </Switch>
        )
    }
}

export default withRouter(MainComponent);
