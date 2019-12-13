import React from 'react';
import Users from './Users';
import AddUsers from './Components/NewUser/AddUsers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../../Header/Header';

const AppUser = () => (
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Users} />
                <Route exact path='/users' component={Users} />
                <Route exact path="/users/add" component={AddUsers} />
            </Switch>
        </BrowserRouter>

    </div>

)

export default AppUser;