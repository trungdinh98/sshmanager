import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
    openNav = () => {
        if (document.getElementById("mySidenav") && document.getElementById("main")) {
            document.getElementById("mySidenav").style.width = "150px";
            document.getElementById("main").style.marginLeft = "150px";
            document.body.style.backgroundColor = "rgba(0,0,0,0.2)"; 
        }
    };

    closeNav = () => {
        if (document.getElementById("mySidenav") && document.getElementById("main")) {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
            document.body.style.backgroundColor = "white";
        }
    };

    // handleClickOutside = () => {
    //     console.log('you clicked outside components!');
    //     this.closeNav();
    // };

    render () {
        return (
            <div style={{float:'none'}}>
                <div id="mySidenav" className="sidenav">
                    <div className="closebtn" onClick={this.closeNav}>&times;</div>
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
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
                        <div className="projectButton">
                            <Link to="/projects">Project</Link>
                        </div>
                        <div>
                            <form method="get" action="">
                                <div>
                                    <div>
                                        <input type="text" placeholder="Search" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="rightNavBar">
                        <div className="notify-icon">
                            <span aria-label="sheep" role="img">&#128276;</span>
                        </div>
                        <div>
                            <img className="avaProfile" src="/image/avatar.jpeg" alt="avatar" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
