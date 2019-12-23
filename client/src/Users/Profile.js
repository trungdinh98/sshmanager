import React from 'react';
import jwt_decode from 'jwt-decode';

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user_firstname:'',
            user_lastname:'',
            user_email: '',
            user_id: ''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        if (token === undefined) {
            this.props.history.push(`/login`)
        } else {
            const token = localStorage.usertoken;
            const decode = jwt_decode(token);
            this.setState({
                user_firstname: decode.user_firstname,
                user_lastname: decode.user_lastname,
                user_email: decode.user_email,
                user_id: decode.user_id
            })
        }
    }

    render () {
        return (
            <div style={{float:'none'}} className="container">
             <h1 style={{padding: '100px 0 30px'}} className="text-center"> PROFILE</h1>
                <div style={{width: 'inherit'}} className="jumbotron mt-5">
                    <div>
                        <img src="/image/avatar.jpeg"/>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>First Name:</td>
                                <td>{this.state.user_firstname}</td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>{this.state.user_lastname}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{this.state.user_email}</td>
                            </tr>
                            <tr>
                                <td>ID:</td>
                                <td>{this.state.user_id}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile;
