import React from 'react';
import './CreateNewKey.css';

class CreateNewKey extends React.Component {

    constructor () {
        super();
        this.state = {
            keys: [],
            key: {
                key_created_at: "",
                key_id: 0,
                key_name: "",
                project_id: 0,
            },
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
        this._isMounted = false;
    }

    componentDidMount () {
        this._isMounted = true;
        this.getKeys();
    }

    getKeys () {
        this._isMounted = true;
        fetch('http://localhost:4000/key')
            .then(response => response.json())
            .then(response => {
                if (this._isMounted) {
                    this.setState({ keys: response.data })
                }
            })
            .catch(err => console.error(err))
    }

    componentWillUnmount () {
        this._isMounted = false;
    }

    render () {
        const { keys } = this.state;
        return (
            <div style={{width: '-webkit-fill-available'}}>
                <div className="top-content">
                    <input className="key-search" type="text" placeholder="Find by key ID or key name" />
                    <button className="new-key" onClick={this.createKeys}>New Key</button>
                    <button className="delete-key" onClick={this.deleteKeys}>Delete Key</button>
                </div>
                <div className="bot-content">
                    <table>
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
            </div>
        );
    }
}

export default CreateNewKey;
