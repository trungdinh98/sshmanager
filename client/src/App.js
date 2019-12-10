import React from 'react';
import Header from './Header/Header.js';
import Resources from './Resources/Resources';

class App extends React.Component {
  render () {
    return (
      <div style={{float:'none'}}>
        <Header />
        <Resources />
      </div>
    );
  }
}

export default App;
