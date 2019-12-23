import React from 'react';
import './AddUsers.css'
import Axios from 'axios';
import { Redirect } from 'react-router';

//định dạng email
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class AddUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_email: null,
            content: null,
            formErrors: {
                user_email: "",
                email_content: ""
            },
            handle: false,
            project_id: this.props.location.state.project_id,
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        if (token === undefined) {
            this.props.history.push(`/login`)
        }
    }

    //lấy thông tin từ input và check trạng thái input
    handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "user_email":
                formErrors.user_email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "email_content":
                formErrors.email_content = value.length < 5 || value.length > 500
                    ? "content email requires 5 to 500 characters"
                    : "";
                break;
        }
        this.setState({ formErrors, [name]: value, handle: true });
    };

    //thêm 1 nhân viên vào project
    addUser = (e) => {
        e.preventDefault();

        let project_id = this.state.project_id;
        let { formErrors, handle } = this.state;

        if (handle === true) {
            if (formErrors.user_email === "") {
                const { user_email } = this.state;
                //kiểm tra nhân viên có tồn tại không
                Axios.post(`http://localhost:4000/users/checkuser`, {user_email})
                    .then(response => {
                        if (response.data.success) {
                            let user_id = response.data.data;
                            //thêm nhân viên vào project
                            Axios.post(`http://localhost:4000/users/addToPJ/`, { project_id, user_id })
                                .then(response => {
                                    if (response.data.success) {
                                        this.backToUsers();
                                    }
                                    else {
                                        alert("this user was in this project")
                                    }
                                }).catch(error => {
                                    return error;
                                });
                        } else {
                            alert("enter wrong email user")
                        }
                    }).catch(error => {
                        return error;
                    })
            }
        } else {
            alert("enter email");
        }
    }

    //quay lại trang nhân viên trong project, hủy thêm nhân viên mới
    backToUsers = () => {
        this.setState({ redirect: true });
    }

    //hiển thị form thêm nhân viên
    render() {
        const { formErrors, redirect } = this.state;
        return (
            <div className="form-wrapper" style={{ float: "none" }}>
                <button onClick={this.backToUsers}>Back</button>
                <h1>New User</h1>
                <form noValidate>
                    <div className="user_email">
                        <label htmlFor="user_email">Email</label>
                        <input
                            className={formErrors.user_email.length > 0 ? "error" : null}
                            placeholder="Email"
                            type="text"
                            name="user_email"
                            noValidate
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="email_content">
                        <label htmlFor="email_content">Content Email</label>
                        <textarea rows="4" cols="50"
                            className={formErrors.email_content.length > 0 ? "error" : null}
                            placeholder="Content Email"
                            type="text"
                            name="email_content"
                            noValidate
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="addUsers">
                        <button type="submit" onClick={this.addUser}>Invite User</button>
                    </div>
                </form>
                {redirect && (<Redirect to=
          {{ pathname: '/projectUsers', state: { project_id: this.state.project_id } }} />)}
            </div>
        )
    }
}
