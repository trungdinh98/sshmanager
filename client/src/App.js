import React from 'react';
<<<<<<< HEAD
import AppUser from './Users/src/AppUser';
import Keys from './Keys/Keys';
import Header from './Header/Header'
=======
import Header from './Header/Header.js';
import Main from './MainComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> bc9d5cd714770c43c1d8916260f485fc1aa1d059

class App extends React.Component {

  render() {
    return (
      <div style={{float:'none'}}>
            <Header />
<<<<<<< HEAD
            <AppUser />
=======
            <Main />
>>>>>>> bc9d5cd714770c43c1d8916260f485fc1aa1d059
        </div>
    );
  }
}

export default App;
