import React from 'react';
import './AddUsers.css'
import { throws } from 'assert';
import Axios from 'axios';
export default class AddUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            age: null,
            phone: null,
            project: null
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

//     switch (name) {
//         case "username":
//             formErrors.firstName =
//                 value.length < 3 ? "minimum 3 characaters required" : "";
//             break;
//         case "lastName":
//             formErrors.lastName =
//                 value.length < 3 ? "minimum 3 characaters required" : "";
//             break;
//         case "email":
//             formErrors.email = emailRegex.test(value)
//                 ? ""
//                 : "invalid email address";
//             break;
//         case "password":
//             formErrors.password =
//                 value.length < 6 ? "minimum 6 characaters required" : "";
//             break;
//         default:
//             break;
//     }

    this.setState({ [name]: value }, () => console.log(this.state));
};

addUser = (e) => {
    e.preventDefault();
    const newUser = this.state;
    Axios.post(`http://localhost:8000/users/add/`, newUser);
}
render() {
    return (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1>New User</h1>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="username">
                        <label htmlFor="username">Username</label>
                        <input
                            placeholder="Username"
                            type="text"
                            name="username"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="age">
                        <label htmlFor="age">Age</label>
                        <input
                            placeholder="Age"
                            type="number"
                            name="age"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="phone">
                        <label htmlFor="phone">Phone</label>
                        <input
                            placeholder="Phone"
                            type="text"
                            name="phone"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="project">
                        <label htmlFor="project">Project</label>
                        <input
                            placeholder="Project"
                            type="text"
                            name="project"
                            noValidate
                           onChange={this.handleChange}
                        />
                    </div>
                    <div className="addUsers">
                        <button type="submit" onClick={this.addUser}>Add User</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
}