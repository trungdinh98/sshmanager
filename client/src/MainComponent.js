import { Switch, Route } from 'react-router-dom';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/user' component={User}/>
      <Route path='/projects' component={Projects}/>
      <Route path='/resources' component={Resources}/>
      <Route path='/keys' component={Keys}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

const User = () => (
  <Switch>
    <Route exact path='/user' component={UserList}/>
    <Route path='/user/:id' component={UserProfile}/>
  </Switch>
)
