import React from 'react';
import api from '../api';
import './Resources.css';
import NewResource from './CreateNewResource';
import jwt_decode from 'jwt-decode';
import { Dropdown, DropdownButton } from 'react-bootstrap';


export const createResource = resource => {
    return api
    .post('/resources', {
		resource_name: resource.resource_name,
		resource_user: resource.resource_user,
		resource_dns: resource.resource_dns,
		key_id: resource.resource_key_id,
		project_id: resource.project_id, 
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((err) => {
        console.log(err);
    })
}

class Resources extends React.Component{

	constructor(){
		super();
		this.state = {
			resources : [],
			project_id: "",
			projects: [],
			modalShow: false,
			dropDownValue: "Select an Projects ID",
			user_id: '',
			renderProjects: ({project_id, project_name}) =>
                <Dropdown.Item key={project_id} as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}>{project_id}</div></Dropdown.Item>
		}
		this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._isMounted = false;
	}

	componentDidMount(){
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
        this.getResources(text);
    }

	async getResources(project_id){
		await api.get('/resources', {
			params: {
				project_id: project_id
			}
		})
		.then((response) => {
			this.setState({resources:response.data})
		})
		.catch((err) => {
			console.log(err)
		})
	}


	removeResource(resource_id){
		api.delete('/resources', {
			params:{
				resource_id: resource_id
			}
		})
		.then((response) => {
			console.log(response)
			this.getResources(this.state.dropDownValue)
		})
		.catch((err) => {
			console.log(err);
		})
	}

	sshPopup(url,winName,w,h,scroll) {
		let LeftPosition = (window.screen.width) ? (window.screen.width-w)/2 : 0;
		let TopPosition = (window.screen.height) ? (window.screen.height-h)/2 : 0;
		let settings =
		'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'

		window.open(url,winName,settings)
	}

	startConnection(resource_id){
		let url = `http://localhost:3000/Xterm?resource_id=${resource_id}`;
		this.sshPopup(url,'myWindow','561','401','yes')
	}

	renderTableData(){
		return this.state.resources.map((resource, index) => {
			return (
				<tr key={resource.resource_id}>
					<td>{resource.resource_id}</td>
					<td>{resource.resource_name}</td>
					<td>{resource.project_id}</td>
					<td>{resource.resource_dns}</td>
					<td>{resource.key_id}</td>
					<td>{new Date(resource.resource_created_at).toLocaleString()}</td>
					<td><button className="delete-resource" onClick={() => {this.removeResource(resource.resource_id)}}>Delete</button></td>
					<td><button className="connect-resource" onClick={() => {this.startConnection(resource.resource_id)}}>Connect</button></td>
				</tr>
			)
		})
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

	render(){
		let { projects, modalShow } = this.state;
		return(
			<div style={{width: '-webkit-fill-available'}}>
				<div className="top-content">
					<DropdownButton id="dropdown-item-button" title={this.state.dropDownValue}> 
                        { projects.map(this.state.renderProjects) }
                    </DropdownButton>
					<button className="new-resource" onClick = {this.open}>Add Resource</button>
				</div>
				<div className="bot-content">
					<table className="resource-table">
						<thead>
							<tr>
								<th className="resource-id">ID</th>
								<th className="resource-name">Resource Name</th>
								<th className="project-id">Project ID</th>
								<th className="dns">DNS</th>
								<th className="key-id">Key ID</th>
								<th className="resource-time">Created At</th>
							</tr>
						</thead>
						<tbody>
							{this.renderTableData()}
						</tbody>
					</table>
				</div>
				<NewResource projectid={this.state.dropDownValue} show={modalShow} onHide={this.close}/>
			</div>
		)
	}
}

export default Resources
