import React from 'react';
import './Header.css';

class Header extends React.Component {

    render () {
        return (
            <div className="navBar">
                <div className="menuButton">
                    <svg fillRule="evenodd" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="true"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                </div>

                <div className="leftNavBar">
                    <div className="homeButton">
                        <a href="#Home">SSH Manager</a>
                    </div>

                    <div className="projectButton">
                        <a href="#Project">Project</a>
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
        );
    }
}

export default Header;
