import React from 'react';
import api from '../api';
import './Resources.css';
import NewResource from './CreateNewResource'


export const createResource = resource => {
    return api
    .post('/resources', {
		resource_name: resource.resource_name,
		resource_user: resource.resource_user,
		resource_dns: resource.resource_dns,
		key_id: resource.resource_key_id,
		project_id: 1001 
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
			modalShow: false
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
			this.getResources(1001);
		}
	}

	async getResources(project_id){

		/*
		 * get a list of all resources 
		 */

		await api.get('/resources', {
			params: {
				project_id: project_id
			}
		})
		.then((response) => {
			this.setState({resources:response.data})
			// console.log(response);
			
			// console.log(this.state.resources);
		})
		.catch((err) => {
			console.log(err)
		})
	}


	addResource(project_id, resource_name, resource_dns, key_id, resource_user){

		/*
		 * add a new resource
		 */
		// new Promise((resolve, rejects) => {
			api.post('/resources', {
				project_id: 1001,
				resource_name: resource_name,
				resource_dns: resource_dns,
				key_id: key_id,
				resource_user: resource_user
			})
			.then((response) => {
				console.log(response)
				this.getResources(1001)
			})
			.catch((err) => {
				console.log(err);
			})
		// })

		
	}

	// async updateResource(resource_id){
	// 	await api.put('')
	// }

	removeResource(resource_id){
		api.delete('/resources', {
			params:{
				resource_id: resource_id
			}
		})
		.then((response) => {
			console.log(response)
			this.getResources(1001)
		})
		.catch((err) => {
			console.log(err);
		})
	}

	sshPopup(url,winName,w,h,scroll) {
		// let popupWindow = null;
 		let LeftPosition = (window.screen.width) ? (window.screen.width-w)/2 : 0;
		let TopPosition = (window.screen.height) ? (window.screen.height-h)/2 : 0;
		let settings =
		'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable'
		// popupWindow = 
		window.open(url,winName,settings)
	}

	startConnection(resource_id){
		// window.open("http://localhost:3000/Xterm", "_blank")
		let url = `http://localhost:3000/Xterm?resource_id=${resource_id}`;
		this.sshPopup(url,'myWindow','730','430','yes')
	}

	// padWithZeros(number){
	// 	var my_string = '' + number;
	// 	while(my_string.length < 11){
	// 		my_string = '0' + my_string;
	// 	}
	// 	return my_string;
	// }
	
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
		let {resources, modalShow} = this.state;
		return(
			<div style={{width: '-webkit-fill-available'}}>
				<div className="top-content">
					<input className="resource-search" type="text" placeholder="Find by resource ID or resource name" />
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
				<NewResource show={modalShow} onHide={this.close}/>
			</div>
		)
	}
}

export default Resources
