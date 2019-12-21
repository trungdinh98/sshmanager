import React from 'react';
import Header from './Header/Header.js';
import Main from './MainComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {closeNav} from './Header/Header.js';

class App extends React.Component {

    // handleClickOutside = () => {
    //     console.log('you clicked outside components!');
    //     closeNav();
    // };

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
