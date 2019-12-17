import React from 'react';
import jwt_decode from 'jwt-decode';

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user_firstname:'',
            user_lastname:'',
            user_email: ''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        const decode = jwt_decode(token);
        this.setState({
            user_firstname: decode.user_firstname,
            user_lastname: decode.user_lastname,
            user_email: decode.user_email
        })
    }

    render () {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center"> PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.user_firstname}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.user_lastname}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.user_email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile;
