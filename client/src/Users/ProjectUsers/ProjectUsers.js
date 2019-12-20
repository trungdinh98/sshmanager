import React from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
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
        console.log("he")
        this.setState({ users: response.data.data})
      })
      .catch((err) => {
        return err;
      })
  }
  componentDidMount() {
    let project_id = this.state.project_id;
    console.log(project_id);
    console.log(this.state.users)
    this.getUsers(project_id);
  }
  ;
  // async inviteUser(user_id) {
  //   await Axios.post('/inviteUser', user_id)
  //     .then(response => {
  //       this.getUsers(project_id);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  async removeUser(user_id) {
    let users = this.state.users.slice();
    let project_id = this.state.project_id;
    users.splice(user_id - 1, 1);
    // await Axios.delete(`http://localhost:4000/Users/delete/${project_id}/${user_id}`, { project_id, user_id })
    //   .then(response => {
    //     if (response.data.success) {
    //       this.getUsers(project_id);
    //     }
    //   })
    //   .catch(error => {
    //     return error;
    //   })
  }

  inviteUser = () => {
    this.setState({redirect: true});
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
          <td><button onClick={this.removeUser(user.user_id)}>Delete</button></td>
        </tr>
      )
    })
  }

  render() {
    const {redirect} = this.state;
    return (
      <div>
        <h1>Project Users</h1>
        <div>
          <table className="project-users">
            <thead>
              <tr>
                <td>ID</td>
                <td>Email</td>
                <td>Password</td>
                <td>Firstname</td>
                <td>Lastname</td>
                <td><button onClick={this.inviteUser}>Add</button></td>
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
        {redirect && (<Redirect push to = '/projectUsers/add'/>)}
      </div>
    )
  }
}

export default ProjectUsers;
