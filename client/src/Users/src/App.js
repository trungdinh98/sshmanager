import React from 'react';
import './App.css';
import DataTable from './Components/DataTable';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    let model = {
      headers: [
        { title: "Id", accessor: "id", index: 0, dataType: "number" },
        {
          title: "Profile", accessor: "profile", width: "80px", index: 1, cell: {
            type: "image",
            style: {
              "width": "50px",
            }
          }
        },
        { title: "Username", accessor: "username", index: 2, dataType: "string" },
        { title: "Password", accessor: "password", index: 3, dataType: "string" },
        { title: "Age", accessor: "age", index: 4, dataType: "number" },
        { title: "Phone Number", accessor: "phone", index: 5, dataType: "string" },
        { title: "Done PJs", accessor: "project", index: 6, dataType: "number" },
        // {accessor: "button", index: 7, cell: row => (
        //   <button className="btnDelete">Del</button>
        // )}
      ],
      data: [
        //{ id: 1, username: "username1", password: "password1", profile: "https://png.icons8.com/nolan/50/000000/user.png", age: "29", phone:"0387556558", project: "3" }, 
      ]
    }
    // for (var i = 2; i < 20; i++) {
    //   model.data.push({
    //     id: i,
    //     username: "username" + i,
    //     password: "password" + i,
    //     profile: "https://png.icons8.com/nolan/50/000000/user.png",
    //     age: parseInt(18 + Math.random() * 50),
    //     phone: "03" + parseInt(10000000 +Math.random()*89999999),
    //     project: parseInt(1 + Math.random() * 10),
    //     button: <button>add</button>
    //   })
    //}
    Axios.get('http://localhost:8000/users/list')
      .then(response => {
        response.data.data.forEach(element => {
          model.data.push(element);
        });
        this.setState(model.data);
      });
    this.state = model;
  }

  ///fetch o day ne :))
  onUpdateTable = (field, id, value) => {
    let data = this.state.data.slice();
    let updateRow = this.state.data.find((d) => {
      return d["id"] == id;
    });

    updateRow[field] = value;

    this.setState({
      edit: null,
      data: data
    });
    Axios.post(`http://localhost:8000/users/update/${id}`, updateRow);
  }

  onDeleteTable = (idDel) => {
    let data = this.state.data;
    let dataDelete = this.state.data.splice(idDel - 1, 1);
    for (var i = 0; i < data.length; i++) {
      if (data[i].id >= idDel) {
        Axios.post(`http://localhost:8000/users/updateID/${data[i].id}`, {id: data[i].id});
        data[i].id--;
      }
    }

    this.setState({
      edit: null,
      data: this.state.data
    });
    Axios.post(`http://localhost:8000/users/delete/${idDel}`, { id: idDel });

  }

  render() {
    return (
      <div className="App">
        <DataTable className="data-table"
          title="USERS"
          keyField="id"
          edit={true}
          width="100%"
          headers={this.state.headers}
          data={this.state.data}
          noData="No records"
          onUpdate={this.onUpdateTable}
          onDelete={this.onDeleteTable} />
      </div>
    )
  }
}

export default App;