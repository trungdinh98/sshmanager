import React from 'react';
import Header from './Header/Header.js';
import Keys from './Keys/Keys.js';

class App extends React.Component {
  render () {
    return (
        <div style={{float:'none'}}>
            <Header />
            <Keys />
        </div>
    );
  }
}

export default App;
