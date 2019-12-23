import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

export const closeNav = () => {
    if (document.getElementById("mySidenav") && document.getElementById("main")) {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
    }
};

class Header extends React.Component {
    openNav = () => {
        if (document.getElementById("mySidenav") && document.getElementById("main")) {
            document.getElementById("mySidenav").style.width = "150px";
            document.getElementById("main").style.marginLeft = "150px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.2)"; 
        }
    };

    logOut (e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }

    render () {

        const loginRegLink = (
            <div className="nav-item">
                <Link to="/login" className="login">
                    <button className="btn btn-success btn-sm">Login</button>
                </Link>
                <Link to="/register" className="register">
                    <button className="btn btn-success btn-sm">Register</button>
                </Link>
            </div>
        )

        const userLink = (
            <div className="nav-item">
                <a href="#logOut" onClick={this.logOut.bind(this)} className="register">
                    <button className="btn btn-outline-warning btn-sm">Logout</button>
                </a>
                <div>
                    <Link to="/profile">
                        <img className="avaProfile" src="/image/avatar.jpeg" alt="avatar" />
                    </Link>
                </div>
            </div>
        )

        return (
            <div style={{float:'none'}}>
                <div id="mySidenav" className="sidenav">
                    <div className="closebtn" onClick={closeNav}>&times;</div>
                    {/*<Link to="/users">Users</Link>*/}
                    <Link to="/resources">Resources</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/keys">Keys</Link>
                    <Link to="/Logging">Logging</Link>
                </div>

                <div id="main" className="navBar">
                    <div className="menuButton">
                        <svg fillRule="evenodd" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" onClick={this.openNav} focusable="true"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                    </div>

                    <div className="leftNavBar">
                        <div className="homeButton">
                            <Link to="/">SSH Manager</Link>
                        </div>
                    </div>

                    <div className="rightNavBar">
                        {localStorage.usertoken ? userLink : loginRegLink}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
