import React from 'react';
import './AddUsers.css'
import Axios from 'axios';

export default class AddUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            age: null,
            phone: null,
            project: null,
            formErrors: {
                username: "",
                password: "",
                age: "",
                phone: "",
                project: ""
            },
            handle: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
    };

    handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "username":
                formErrors.username =
                    value.length < 5 ? "username > 4 characters" : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 4 ? "password > 3 characters" : "";
                break;
            // case "email":
            //     formErrors.email = emailRegex.test(value)
            //         ? ""
            //         : "invalid email address";
            //     break;
            case "age":
                formErrors.age =
                    value < 18 ? "age >= 18" : "";
                break;
            case "project":
                formErrors.project =
                    value < 0 ? "project != 0" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value, handle: true });
    };

    addUser = (e) => {
        e.preventDefault();
        let { formErrors, handle } = this.state;

        if (handle === true) {
            console.log(formErrors.username === "")
            if (formErrors.username === "" && formErrors.password === "" && formErrors.age === "" && formErrors.project === "" && formErrors.phone === "") {
                const newUser = this.state;
                Axios.post(`http://localhost:8000/users/add/`, newUser)
                    .then(response => {
                        if (response.data.success) {
                            this.backToUsers();
                        }
                    });
            } else {
                if (formErrors.username !== "") {
                    alert(formErrors.username);
                } else if (formErrors.password !== "") {
                    alert(formErrors.password);
                } else if (formErrors.age !== "") {
                    alert(formErrors.age);
                } else if (formErrors.project !== "") {
                    alert(formErrors.project);
                }
            }
        } else {
            alert("enter information");
        }

    }
    backToUsers = () => {
        return (
            this.props.history.push('/users')
        )
    }
    render() {
        const {formErrors} = this.state;
        return (
            <div className="form-wrapper">
                <button onClick={this.backToUsers}>Back</button>
                <h1>New User</h1>
                <form onSubmit={this.handleSubmit} noValidate>
                    <div className="username">
                        <label htmlFor="username">Username</label>
                        <input
                            className={formErrors.username.length > 0 ? "error" : null}
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
                            className={formErrors.password.length > 0 ? "error" : null}
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
                            className={formErrors.age.length > 0 ? "error" : null}
                            placeholder="Age"
                            type="number"
                            name="age"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="project">
                        <label htmlFor="project">Project</label>
                        <input
                            className={formErrors.project.length > 0 ? "error" : null}
                            placeholder="Project"
                            type="number"
                            name="project"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="phone">
                        <label htmlFor="phone">Phone</label>
                        <input
                            className={formErrors.phone.length > 0 ? "error" : null}
                            placeholder="Phone"
                            type="text"
                            name="phone"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="addUsers">
                        <button type="submit" onClick={this.addUser}>Add User</button>
                    </div>
                </form>
            </div>
        )
    }
}