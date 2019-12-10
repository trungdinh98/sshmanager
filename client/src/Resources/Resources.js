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
				// project_id: 1001,
				// resource_name: resource_name,
				// resource_dns: resource_dns,
				// key_id: key_id,
				// resource_user: resource_user
				project_id: 1001,
				resource_name: "name",
				resource_dns: "1.2.3.4",
				key_id: 1001,
				resource_user: "ubuntu"
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

	async removeResource(resource_id){
		await api.delete('/resource', {
			params:{
				resource_id: resource_id
			}
		})
		.then((response) => {
			console.log(response)
			// this.getResources(project_id)
		})
		.catch((err) => {
			console.log(err);
		})
	}

	renderTable(){
		let resources = this.state.resources;
		let render = ``;
		resources.forEach(resource => {
			render += `
				<tr>
					<td></td>
					<td align="center">${resource.resource_id}</td>
					<td align="center">${resource.resource_name}</td>
					<td align="center">${resource.project_id}</td>
					<td align="center">${resource.resource_dns}</td>
					<td align="center">${resource.key_id}</td>
					<td align="center">${resource.resource_created_at}</td>
					<td></td>
				</tr>
			`
		})

		if (this.state.resources[0]!=undefined){
			return(
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
						<tbody dangerouslySetInnerHTML={{__html: render}}>
							
						</tbody>
					</table>
				</div>
			)
		}
		
	}
	
	
	apiTest = () => {
		console.log("test");
		this.addResource(1001, "name", "dns", 1001, "ubuntu");

	}

  	render(){
		let resources = this.state.resources;
		
    	return(
      		<div>
				<h3>Resources</h3>
				<h3>Data: <br/></h3>
				<div>
					{/* {this.state.resources[0]!=undefined?this.state.resources[0].project_id:"loading"} */}
					{this.renderTable()}

					{resources.map(resource => 
						<h4 key={resource.resource_name}>{resource.resource_name}</h4>)}

				</div>
				<div>
					<button onClick = {this.apiTest}>Button test</button>
				</div>

			</div>
    	)
  	}
}

export default Resources