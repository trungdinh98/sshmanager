import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import './projectusers.css';
import api from '../../api';
import jwt_decode from 'jwt-decode';

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
      authen_id: "",
      project_id: this.props.location.state.project_id,
    };
    console.log(this.state.project_id)
  }

  //lấy thông tin nhân viên có trong project
  getUsers = (project_id) => {
    console.log("hello1")
    api.get(`/Users/projectUsers/${project_id}`, project_id)
      .then(response => {
        this.setState({ users: response.data.data })
      })
      .catch((err) => {
        return err;
      })
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    if (token === undefined) {
      this.props.history.push(`/login`)
    } else {
      let project_id = this.state.project_id;
      const decode = jwt_decode(token);
      this.setState({
        authen_id: decode.user_id
      });
      this.getUsers(project_id);
    }
  };

  //xóa nhân viên khỏi project
  removeUser(user_id) {
    const { authen_id } = this.state;
    const project_id = this.state.project_id;
    api.post('/Users/isAdmin', { project_id, authen_id })
      .then(response => {
        if (response.data[0].is_admin === 1 && authen_id !== user_id) {
          let project_id = this.state.project_id;
          if (window.confirm(`Delete user id ${user_id} from this project?`)) {
            api.post(`/Users/deleteFromPJ`, { project_id, user_id })
              .then(response => {
                if (response.data.success) {
                  this.getUsers(project_id);
                }
              })
              .catch(error => {
                return error;
              })
          }
        } else if(response.data[0].is_admin === 1 && authen_id === user_id){
          alert("You're admin, so you can't go");
        } else {
          alert("You're not admin");
        }
      }).catch(error => {
        return error;
      })

  }

  //thêm nhân viên mới vào project
  inviteUser = () => {
    const { authen_id } = this.state;
    const project_id = this.state.project_id;
    api.post('/Users/isAdmin', { project_id, authen_id })
      .then(response => {
        if (response.data[0].is_admin === 1) {
          this.setState({ redirect: true });
        } else {
          alert("You're not admin");
        }
      }).catch(error => {
        return error;
      })
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
  onBackProject = () => {
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
