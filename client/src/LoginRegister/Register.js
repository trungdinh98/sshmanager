import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { register } from './UserFunctions';
import './Login.css';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            user_firstname:'',
            user_lastname:'',
            user_email: '',
            user_password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        if (token !== undefined) {
            this.props.history.push(`/`)
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            user_firstname: this.state.user_firstname,
            user_lastname: this.state.user_lastname,
            user_email: this.state.user_email,
            user_password: this.state.user_password
        }

        register(user).then(res => {
            this.props.history.push(`/login`)
        })
    }

    render () {
        return (
            <div className="form-container">
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mt-3 mb-3 font-weight-bold">Please sign up</h1>
                    <div className="guest-page-form-body">
                        <div className="input-group">
                            <label className="label-form" htmlFor="first_name">First Name</label>
                            <input type="text"
                                className="form-input"
                                name="user_firstname"
                                placeholder="Enter First Name"
                                value={this.state.user_firstname}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className="label-form" htmlFor="last_name">Last Name</label>
                            <input type="text"
                                className="form-input"
                                name="user_lastname"
                                placeholder="Enter Last Name"
                                value={this.state.user_lastname}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className="label-form" htmlFor="email">Email Address</label>
                            <input type="email"
                                className="form-input"
                                name="user_email"
                                placeholder="Enter Email"
                                value={this.state.user_email}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="input-group">
                            <label className="label-form" htmlFor="password">Password</label>
                            <input type="password"
                                className="form-input"
                                name="user_password"
                                placeholder="Enter Password"
                                value={this.state.user_password}
                                onChange={this.onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Register
                        </button>
                        <div className="login_box text-center">
                           <Link className="link-primary" to="/login">Login if you have had an account</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Register);
