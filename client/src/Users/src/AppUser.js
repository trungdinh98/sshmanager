import React from 'react';
import Users from './Users';
import Header from '../../Header/Header';
import AddUsers from './Components/NewUser/AddUsers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const AppUser = () => (
    <div>
        <Header />
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Users} />
                    <Route exact path='/users' component={Users} />
                    <Route exact path='/users/add' component={AddUsers} />
                </Switch>
            </BrowserRouter>

        </div>
    </div>
)

export default AppUser;