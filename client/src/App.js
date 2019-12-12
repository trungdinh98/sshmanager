import React from 'react';
import Header from './Header/Header.js';
import Resources from './Resources/Resources';
import Projects from './Projects/Projects'

class App extends React.Component {
  render () {
    return (
      <div style={{float:'none'}}>
        <Header />
        <Projects />
        {/* <Resources /> */}
      </div>
    );
  }
}

export default App;
