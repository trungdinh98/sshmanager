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
        user_created_at: "",
        user_firstname: "",
        user_lastname: ""
      },
      project_id: this.props.location.state.project_id,
    };
    console.log(this.state.project_id)
  }

  //lấy thông tin nhân viên có trong project
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

  //xóa nhân viên khỏi project
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

  //thêm nhân viên mới vào project
  inviteUser = () => {
    this.setState({ redirect: true });
  }

  //hiển thị body của bảng nhân viên
  renderTableData() {
    return this.state.users.map((user) => {
      return (
        <tr key={user.user_id}>
          <td>{user.user_id}</td>
          <td>{user.user_email}</td>
          <td>{user.user_firstname}</td>
          <td>{user.user_lastname}</td>
          <td>{user.user_created_at}</td>
          <td><button className="delete-user" onClick={() => this.removeUser(user.user_id)}>Delete</button></td>
        </tr>
      )
    })
  }
  onBackProject = () =>{
    return (
      this.props.history.push('/projects')
  )
  }

  //hiển thị bảng nhân viên trong project
  render() {
    const { redirect } = this.state;
    return (
      <div className="table-content">
        <button className="back" onClick={this.onBackProject}>Back</button>
        <h1 id="pjusers-header">Project Users</h1>
        <table className="project-users">
          <thead>
            <tr>
              <td>ID</td>
              <td>Email</td>
              <td>Firstname</td>
              <td>Lastname</td>
              <td>Created at</td>
              <td><button className="new-user" onClick={() => this.inviteUser()}>Add</button></td>
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
