import React from 'react';
import api from '../api';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './Logging.css';
import jwt_decode from 'jwt-decode';

class Logging extends React.Component{
    constructor(){
        super();
        this.state={
            logs: [],
            projects: [],
            dropDownValue: "Select an Projects ID",
            user_commands: "",
            user_id: '',
            renderProjects: ({project_id, project_name}) =>
                <Dropdown.Item key={project_id} as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}>{project_id}</div></Dropdown.Item>
        }
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

    changeValue(text) {
        this.setState({dropDownValue: text});
        this.getLogs(text);
    }

    async getLogs(project_id){
        await api.get('/logs', {
            params: {
                project_id: project_id
            }
        }).then((response) => {
            this.setState({logs:response.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    removeLogs(log_id){
        api.delete('/logs', {
            params: {
                log_id: log_id
            }
        })
        .then((response) => {
            this.getLogs(this.state.dropDownValue)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    replayPopup(url,winName,w,h,scroll) {
 		let LeftPosition = (window.screen.width) ? (window.screen.width-w)/2 : 0;
		let TopPosition = (window.screen.height) ? (window.screen.height-h)/2 : 0;
		let settings =
		'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
		window.open(url,winName,settings)
	}

	replayLog(project_id, log_name){
		let url = `http://localhost:3000/logTerm?project_id=${project_id}&log_name=${log_name}`;
		this.replayPopup(url,'ssh log replay','561','401','yes')
	}

    padWithZeros(number){
		var my_string = '' + number;
		while(my_string.length < 11){
			my_string = '0' + my_string;
		}
		return my_string;
    }

    onSubmit = (project_id, logs_name) => {
        this.props.history.push({
            pathname: `/commands`,
            search: `?project_id=${project_id}&log_name=${logs_name}`
        });
    }

    renderTableData(){
        return this.state.logs.map((log, index) => {
            return (
                <tr key={log.log_id}>
                    <td align="left">{this.padWithZeros(log.log_id)}</td>
                    <td align="left">{log.log_name}</td>
                    <td align="left">{new Date(log.log_created_at).toLocaleString()}</td>
                    {/* <td align="center"><button onClick={() => {this.onSubmit(this.state.project_id,log.log_name)}}>Commands</button></td> */}
                    <td align="center"><button className="replay-log" onClick={() => {this.replayLog(this.state.dropDownValue,log.log_name)}}>Replay</button></td>
                    <td><button className="delete-log" onClick={() => {this.removeLogs(log.log_id)}}>Delete</button></td>
                </tr>
            )
        })
    }

    render(){
        const { projects } = this.state;
        return(
            <div>
                <div className="top-content">
                    <DropdownButton id="dropdown-item-button" title={this.state.dropDownValue}> 
                        { projects.map(this.state.renderProjects) }
                    </DropdownButton>
                </div>
                <div className="bot-content">
                    <table className="log-table">
                        <thead>
                            <tr>
                                <th className="log-id">ID</th>
                                <th className="log-name">Name</th>
                                <th className="log-time">Created at</th>
                                <th></th>
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

export default withRouter(Logging);
