import React from 'react'


class Header extends React.Component{
    
    menu_click () {
        console.log("menu_click")
    }

    render () {
        return(
            <div>
                <div className = "nav_component_left">
                    <div>Menu button</div>
                    <div>SSH Manager</div>
                    <div>Project name</div>
                </div>
                <div className = "nav_component_center">
                    <div>search bar</div>
                </div>
                <div className = "nav_component_right">
                    <div>notification button</div>
                    <div>help button</div>
                    <div>user avatar</div>
                </div>
            </div>
        )
    }
}

export default Header