import React from 'react';
import Header from './Header/Header'
import MainComponent from './MainComponent.js';

class App extends React.Component {

  render() {
    return (
      <div style={{float:'none'}}>
        <Header />
            <MainComponent />
        </div>
    );
  }
}

export default App;
