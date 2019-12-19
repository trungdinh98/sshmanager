import React from 'react';
import Axios from 'axios';

class ProjectUsers extends React.Component {

  constructor(props) {

    super(props);
    let users = {
      user_id: "",
      user_email: "",
      user_password: "",
      user_firstname: "",
      user_lastname: ""
    };
    
    this.state = {
      project_id: 1001,
      users: []
    }
    Axios.get(`http://localhost:4000/Users/projectUsers/${this.stateproject_id}`, this.state.project_id)
      .then(response => {
        users = response.data.data;
        this.setState(users)
      })
      .catch((err) => {
        return err;
      })
      
  }

  getUsers = (project_id) => {
    let users = [];
    Axios.get(`http://localhost:4000/Users/projectUsers/${project_id}`, project_id)
      .then(response => {
        users = response.data.data;
      })
      .catch((err) => {
        return err;
      })
      this.setState({users: users})
  }
  componentDidUpdate(){
    let project_id = this.state.project_id;
    this.getUsers(project_id);
  }

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
    users.splice(user_id-1, 1);
    await Axios.delete(`http://localhost:4000/Users/delete/${project_id}/${user_id}`, {project_id, user_id})
    .then(response => {
      if(response.data.success){
        this.getUsers(project_id);
      }
    })
    .catch(error => {
      return error;
    })
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
              </tr>
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ProjectUsers;
