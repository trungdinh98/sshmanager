import React from 'react';
import './Keys.css';

class Keys extends React.Component {

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
        const { keys, key } = this.state;
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
