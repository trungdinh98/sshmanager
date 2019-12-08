import React from 'react';
import './Keys.css';

class Keys extends React.Component {
  render () {
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
                <tr>
                    <th className="check-box">
                        <input type="checkbox" />
                    </th>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <th className="check-box">
                        <input type="checkbox" />
                    </th>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <th className="check-box">
                        <input type="checkbox" />
                    </th>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    );
  }
}

export default Keys;
