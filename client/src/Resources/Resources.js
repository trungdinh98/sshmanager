import React from 'react';
import api from '../api';
import './resources.css';
import { resolve } from 'dns';
import { rejects } from 'assert';


class Resources extends React.Component{

	constructor(){
		
		super();
		this.state = {
			resources : [],
			resource : {
				resource_id: '',
				project_id: '',
				resource_name: '',
				resource_platform: '',
				resource_dns: '',
				resource_user: '',
				resource_created_at: ''
			}
		}
	}

	componentDidMount(){
		this.getResources(1001)
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
			this.setState({resources:response.data.data})
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
				this.getResources(project_id)
			})
			.catch((err) => {
				console.log(err);
			})
		// })

		
	}

	// async updateResource(resource_id){
	// 	await api.put('')
	// }

	removeResource(resource_ids){
		resource_ids.forEach(resource_id => {
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
		})
		
	}

	startConnection(resource_id){
		window.open("./xterm.html", "_blank")
	}

	
	renderTableData(){
		return this.state.resources.map((resource, index) => {
			return (
				<tr key={resource.resource_id}>
					<td></td>
					<td align="center">{resource.resource_id}</td>
					<td align="left">{resource.resource_name}</td>
					<td align="center">{resource.project_id}</td>
					<td align="center">{resource.resource_dns}</td>
					<td align="center">{resource.key_id}</td>
					<td align="center">{resource.resource_created_at}</td>
					<td align="center"><button onClick={() => {this.startConnection(resource.resource_id)}}>Connect</button></td>
				</tr>
			)
		})
	}
	
	
	apiPostTest = () => {
		console.log("Post test");
		this.addResource(1001, "name", "dns", 1001, "ubuntu");

	}

	apiDeleteTest = () => {
		console.log("Delete test");
		let resource_ids = [39, 44]
		this.removeResource(resource_ids);
	}

  	render(){
		let resources = this.state.resources;
		
    	return(
      		<div>
				<h3>Resources</h3>
				<h3>Data: <br/></h3>
				<div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th><div>ID</div></th>
							<th><div>Name</div></th>
							<th><div>Project ID</div></th>
							<th><div>DNS</div></th>
							<th><div>Key ID</div></th>
							<th><div>Created At</div></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.renderTableData()}
					</tbody>
				</table>
				</div>
				{/* <div>
					<button onClick = {this.apiPostTest}>Post test</button>
				</div> */}
				<div>
					<button onClick = {this.apiDeleteTest}>Delete test</button>
				</div>
				<div>
					<button onClick = {this.startConnection}>SSH test</button>
				</div>

			</div>
    	)
  	}
}

export default Resources
