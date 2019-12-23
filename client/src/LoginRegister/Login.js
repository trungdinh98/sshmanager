import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { login } from './UserFunctions';
import './Login.css';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
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
            user_email: this.state.user_email,
            user_password: this.state.user_password
        }

        login(user).then(res => {
            this.props.history.push(`/projects`)
        })
    }

    render () {
        return (
            <div className="form-container">
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mt-3 mb-3 font-weight-bold">Please sign in</h1>
                    <div className="guest-page-form-body">
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
                            Sign in
                        </button>
                        <div className="login_box text-center">
                           <Link className="link-primary" to="/register">Register if you do not have account</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(Login);
