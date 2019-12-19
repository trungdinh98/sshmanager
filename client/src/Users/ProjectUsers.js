import React from 'react';

class ProjectUsers extends React.Component {

  constructor() {

    super();
    this.state = {
      users: [],
      users: {

      }
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers(user_id) {
    await api.get('/users', {
      params: {
        user_id: user_id
      }
    })
      .then((response) => {
        this.setState({ users: response.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  inviteUser(user_id) {
    api.post('/inviteUser', {
      user_id: user_id,
    })
      .then((response) => {
        console.log(response)
        this.getUsers(user_id)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  removeUser(user_ids) {
    resource_ids.forEach(resource_id => {
      api.delete('/users', {
        params: {
          user_id: user_id
        }
      })
        .then((response) => {
          console.log(response)
          this.getUsers()
        })
        .catch((err) => {
          console.log(err);
        })
    })

  }

  renderTableData() {
    return this.state.users.map((user, index) => {
      return (
        <tr key={users.user_id}>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <h3>Data: <br /></h3>
        <div>
          <table>
            <thead>
              <tr>
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
