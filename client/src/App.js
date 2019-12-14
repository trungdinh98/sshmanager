import React from 'react';
import AppUser from './Users/src/AppUser';
import Keys from './Keys/Keys';
import Header from './Header/Header'
import Main from './MainComponent.js';

class App extends React.Component {

  render() {
    return (
      <div style={{float:'none'}}>
            <Header />
            <AppUser />
        </div>
    );
  }
}

export default App;
