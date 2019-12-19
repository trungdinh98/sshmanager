import React from 'react';
import Keys from './Keys/Keys';
import Header from './Header/Header'
import Main from './MainComponent.js';
import Users from './Users/src/Users';

class App extends React.Component {

  render() {
    return (
      <div style={{float:'none'}}>
            <Header />
            <Users />
        </div>
    );
  }
}

export default App;
