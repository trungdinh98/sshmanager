import React from 'react';
import AppUser from './Users/src/AppUser';
import Header from '../src/Header/Header';

class App extends React.Component {

  render() {
    return (
      <div>
        <div style={{ float: "left" }}>
          <Header />
        </div>
        <div style={{float: "none"}}>
          <AppUser />
        </div>
      </div>
    );
  }
}

export default App;
