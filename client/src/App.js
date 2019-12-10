import React from 'react';
import Header from './Header/Header.js';
import Users from './Users/src/Users'

class App extends React.Component {
  render () {
    return (
      <div style ={{float:'none'}}><Header />
      <Users /></div>
      
    );
  }
}

export default App;
