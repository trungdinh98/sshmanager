import React from 'react';
import Header from './Header/Header.js';
import Main from './MainComponent.js';

class App extends React.Component {
  render () {
    return (
        <div style={{float:'none'}}>
            <Header />
            <Main />
        </div>
    );
  }
}

export default App;
