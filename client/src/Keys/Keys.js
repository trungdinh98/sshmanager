import React from 'react';
import './Keys.css';
import api from '../api'
import NewKeys from './CreateNewKey.js';

class Keys extends React.Component {

    constructor () {
        super();
        this.state = {
            keys: [],
            modalShow: false,
            renderKeys: ({key_created_at, key_id, key_name, project_id}) => 
                <tr key={key_id}>
                    <td><label className="check-box">
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label></td>
                    <td>{key_name}</td>
                    <td>{key_id}</td>
                    <td>{project_id}</td>
                    <td>{key_created_at}</td>
                </tr>
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._isMounted = false;
    }

    componentDidMount () {
        this._isMounted = true;
        this.getKeys(1002);
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

    close() {
        this.setState({ modalShow: false });
    }

    open() {
        this.setState({ modalShow: true });
    }

    deleteKeys () {

    }

    componentWillUnmount () {
        this._isMounted = false;
    }

    render () {
        const { keys, modalShow } = this.state;
        return (
            <div style={{width: '-webkit-fill-available'}}>
                <div className="top-content">
                    <input className="key-search" type="text" placeholder="Find by key ID or key name" />
                    <button className="new-key" onClick={this.open}>New Key</button>
                    <button className="delete-key" onClick={this.deleteKeys}>Delete Key</button>
                </div>
                <div className="bot-content">
                    <table className="key-table">
                        <thead>
                            <tr>
                                <td><label className="check-box">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                </label></td>
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

                <NewKeys show={modalShow} onHide={this.close}/>
            </div>
        );
    }
}

export default Keys;
