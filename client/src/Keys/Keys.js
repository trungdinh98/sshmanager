import React from 'react';
import './Keys.css';
import api from '../api';
import NewKeys from './CreateNewKey.js';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

export const createKey = key => {
    return api
    .post('/keys', {
        project_id: key.project_id,
        key_name: key.key_name,
        key_value: key.key_value
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
}

class Keys extends React.Component {

    constructor () {
        super();
        this.state = {
            keys: [],
            projects: [],
            modalShow: false,
            dropDownValue: "Select an Projects ID",
            user_id: '',
            renderKeys: ({key_created_at, key_id, key_name, project_id}) => 
                <tr key={key_id}>
                    <td>{key_name}</td>
                    <td>{key_id}</td>
                    <td>{project_id}</td>
                    <td>{new Date(key_created_at).toLocaleString()}</td>
                    <td><button className="delete-key" onClick={() => {this.deleteKey(key_id)}}>Delete Key</button></td>
                </tr>,

            renderTableData: ({project_id, project_name}) =>
                <Dropdown.Item key={project_id} as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}>{project_id}</div></Dropdown.Item>
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._isMounted = false;
    }

    componentDidMount () {
        const token = localStorage.usertoken;
        if (token === undefined) {
            this.props.history.push(`/login`)
        } else {
            const decode = jwt_decode(token);
            this.setState({
                user_id: decode.user_id
            });
            this.getProjects(decode.user_id);
            this._isMounted = true;
        }
    }

    async getProjects(user_id){
        await api.get('/projects', {
            params: {
                user_id: user_id
            }
        })
        .then((response) => {
            this.setState({projects:response.data});
            console.log(this.state.projects);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getKeys (project_id) {
        this._isMounted = true;
        api.get("/keys", {
            params: {
                project_id: project_id 
            }
        })
        .then((response) => {
            this.setState({keys:response.data});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    deleteKey (key_id) {
        api.delete('keys', {
            params: {
                key_id: key_id
            }
        })
        .then((response) => {
            this.getKeys(this.state.dropDownValue)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    changeValue(text) {
        this.setState({dropDownValue: text});
        this.getKeys(text);
    }

    close() {
        this.setState({ modalShow: false });
    }

    open() {
        this.setState({ modalShow: true });
    }

    componentWillUnmount () {
        this._isMounted = false;
    }

    render () {
        const { projects, keys, modalShow } = this.state;
        return (
            <div style={{width: '-webkit-fill-available'}}>
                <div className="top-content">
                    <DropdownButton id="dropdown-item-button" title={this.state.dropDownValue}> 
                        { projects.map(this.state.renderTableData) }
                    </DropdownButton>
                    <button className="new-key" onClick={this.open}>New Key</button>
                </div>
                <div className="bot-content">
                    <table className="key-table">
                        <thead>
                            <tr>
                                <th className="key-name">Key Name</th>
                                <th className="key-id">Key ID</th>
                                <th className="key-value">Project ID</th>
                                <th className="key-time">Registered Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            { keys.map(this.state.renderKeys) }
                        </tbody>
                    </table>
                </div>
                <NewKeys  projectid={this.state.dropDownValue} show={modalShow} onHide={this.close}/>
            </div>
        );
    }
}

export default Keys;
