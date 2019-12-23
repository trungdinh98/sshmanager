import React from 'react';
import './App.css';
import DataTable from './Components/DataTable';
import Axios from 'axios';

class Users extends React.Component {
    constructor(props) {
        super(props);

        let model = {
            headers: [
                { title: "Id", accessor: "user_id", index: 0, dataType: "number" },
                { title: "Email", accessor: "user_email", index: 1, dataType: "string" },
                { title: "First Name", accessor: "user_firstname", index: 2, dataType: "string" },
                { title: "Last Name", accessor: "user_lastname", index: 3, dataType: "string" },
                { title: "Count PJ", accessor: "countPJ", index: 4, dataType: "number" },
                { title: "Created at", accessor: "user_created_at", index: 5, dataType: "string" },
            ],
            data: []
        }

        //lấy giá trị từ database
        Axios.get('http://localhost:4000/Users/')
            .then(response => {
                response.data.data.forEach(element => {
                    model.data.push(element);
                });
                this.setState(model.data);
                console.log(model.data)
            })
            .catch(error => {
                return error
            });
        console.log(model.data)
        this.state = model;
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        if (token === undefined) {
            this.props.history.push(`/login`)
        }
    }

    //cập nhật chỉnh sửa trên giao diện và database
    onUpdateTable = (field, id, value) => {
        let data = this.state.data.slice();
        let updateRow = this.state.data.find((d) => {
            return d["user_id"] === id;
        });
        updateRow[field] = value;

        this.setState({
            edit: null,
            data: data
        });
        Axios.post(`http://localhost:4000/Users/update/${id}`, updateRow)
            .catch(error => {
                return error;
            });
    }

    //hiển thị giao diện
    render() {
        return (
            <div className="App">
                <DataTable className="data-table"
                    title="USERS"
                    keyField="user_id"
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
                />
            </div>
        )
    }
}

export default Users;
