import React from 'react';
import AppUser from './Users/src/AppUser';
import Keys from './Keys/Keys';
import Header from './Header/Header'
import Main from './MainComponent.js';
<<<<<<< HEAD

class App extends React.Component {

  render() {
=======
import 'bootstrap/dist/css/bootstrap.min.css';
// import {closeNav} from './Header/Header.js';

class App extends React.Component {

    // handleClickOutside = () => {
    //     console.log('you clicked outside components!');
    //     closeNav();
    // };

  render () {
>>>>>>> cc38799d7a781fec07f12975b939bf05499af2b4
    return (
      <div style={{float:'none'}}>
            <Header />
            <AppUser />
        </div>
    );
  }
}

export default App;
