import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import './projectusers.css';

class ProjectUsers extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      users: [],
      user: {
        user_id: "",
        user_email: "",
        user_password: "",
        user_firstname: "",
        user_lastname: ""
      },
      project_id: 1001,
    };
  }

  getUsers = (project_id) => {
    console.log("hello1")
    Axios.get(`http://localhost:4000/Users/projectUsers/${project_id}`, project_id)
      .then(response => {
        this.setState({ users: response.data.data })
      })
      .catch((err) => {
        return err;
      })
  }
  componentDidMount() {
    let project_id = this.state.project_id;
    this.getUsers(project_id);
  };

  removeUser(user_id) {
    let project_id = this.state.project_id;
    if (window.confirm(`Delete user id ${user_id} from this project?`)) {
      Axios.post(`http://localhost:4000/Users/deleteFromPJ`, { project_id, user_id })
        .then(response => {
          if (response.data.success) {
            this.getUsers(project_id);
          }
        })
        .catch(error => {
          return error;
        })
    }
  }

  inviteUser = () => {
    this.setState({ redirect: true });
  }

  renderTableData() {
    return this.state.users.map((user) => {
      return (
        <tr key={user.user_id}>
          <td>{user.user_id}</td>
          <td>{user.user_email}</td>
          <td>{user.user_password}</td>
          <td>{user.user_firstname}</td>
          <td>{user.user_lastname}</td>
          <td><button onClick={() => this.removeUser(user.user_id)}>Delete</button></td>
        </tr>
      )
    })
  }

  render() {
    const { redirect } = this.state;
    return (
      <div className="table-content">
        <h1 id="pjusers-header">Project Users</h1>
        <table className="project-users">
          <thead>
            <tr>
              <td>ID</td>
              <td>Email</td>
              <td>Password</td>
              <td>Firstname</td>
              <td>Lastname</td>
              <td><button onClick={() => this.inviteUser()}>Add</button></td>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
        {redirect && (<Redirect to=
          {{ pathname: '/projectUsers/add', state: { project_id: this.state.project_id } }} />)}
      </div>
    )
  }
}

export default ProjectUsers;
