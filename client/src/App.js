import React from 'react';
import Keys from './Keys/Keys';
import Header from './Header/Header'
import Main from './MainComponent.js';
import Users from './Users/src/Users';
import ProjectUsers from './Users/ProjectUsers';

class App extends React.Component {

  render() {
    return (
      <div style={{float:'none'}}>
            <Header />
            <ProjectUsers/>
        </div>
    );
  }
}

export default App;
