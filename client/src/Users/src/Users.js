import React from 'react';
import './App.css';
import DataTable from './Components/DataTable';
import Axios from 'axios';

class Users extends React.Component {
    constructor(props) {
        super(props);

        let model = {
            headers: [
                { title: "Id", accessor: "id", index: 0, dataType: "number" },
                {
                    title: "Profile",
                    accessor: "profile",
                    width: "80px",
                    index: 1,
                    cell: {
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
            ],
            data: []
        }
        Axios.get('http://localhost:8000/users/list')
            .then(response => {
                response.data.data.forEach(element => {
                    model.data.push(element);
                });
                this.setState(model.data);
            })
            .catch(error => {
                return error
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

    onDeleteTable = async (idDel) => {
        let data = this.state.data.slice();
        data.splice(idDel - 1, 1);
        await Axios.post(`http://localhost:8000/users/delete/${idDel}`, { id: idDel });
        // for (var i = 0; i < data.length; i++) {
        //     if (data[i].id >= idDel) {
        //         await Axios.post(`http://localhost:8000/users/updateID/${data[i].id}`, { id: data[i].id })
        //             .then(response => {
        //                 if (response.data.success) {
        //                     console.log("done");
        //                 } else {
        //                     console.log("fail");
        //                 }
        //             })
        //             .catch(error => {
        //                 alert(error)
        //             });
        //         data[i].id--;
        //     }
        // }

        this.setState({
            edit: null,
            data: data
        });
    }
    componentDidUpdate() {
        this.onDeleteTable();
    }

    render() {
        return (
            <div className="App">
                <DataTable className="data-table"
                    title="USERS"
                    keyField="id"
                    edit={true}
                    pagination={{
                        enabled: true,
                        pageLength: 5
                    }}
                    width="100%"
                    headers={this.state.headers}
                    data={this.state.data}
                    noData="No records"
                    onUpdate={this.onUpdateTable}
                    onDelete={(e) => this.onDeleteTable(e)}
                />
            </div>
        )
    }
}

export default Users;