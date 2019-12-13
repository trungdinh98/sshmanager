import React from 'react';
import './Keys.css';
import api from '../api'

class Keys extends React.Component {

    constructor () {
        super();
        this.state = {
            keys: [],
            
            renderKeys: ({key_created_at, key_id, key_name, project_id}) => 
                <tr key={key_id}>
                    <th className="check-box">
                        <input type="checkbox" />
                    </th>
                    <td>{key_name}</td>
                    <td>{key_id}</td>
                    <td>{project_id}</td>
                    <td>{key_created_at}</td>
                </tr>
        };
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
			this.setState({keys:response.data.data});
			console.log(response);
			console.log(this.state.keys);
		})
		.catch((err) => {
			console.log(err);
		})
    }

    componentWillUnmount () {
        this._isMounted = false;
    }

    render () {
        const { keys } = this.state;
        return (
            <div>
                <div className="top-content">
                    <input className="key-search" type="text" placeholder="Find by key ID or key name" />
                    <button className="new-key">New Key</button>
                    <button className="delete-key">Delete Key</button>
                </div>
                <div className="bot-content">
                    <table>
                        <thead>
                            <tr>
                                <th className="check-box">
                                    <input type="checkbox" />
                                </th>
                                <th>Key Name</th>
                                <th>Key ID</th>
                                <th>Key Value</th>
                                <th>Registered Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            { keys.map(this.state.renderKeys) }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Keys;
