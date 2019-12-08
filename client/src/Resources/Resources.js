import React from 'react';
import api from '../api';


class Resources extends React.Component{

	constructor(){
		
		super();
		this.state = {
			resources : [],
			resource : {
				resource_id: '',
				resource_name: '',
				resource_platform: '',
				resource_dns: '',
				resource_created_at: ''
			}
		}
	}

	componentDidMount(){
		this.getResources(1)
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
		})
		.catch((err) => {
			console.log(err)
		})
	}


	async addResource(project_id, resource){

		/*
		 * add a new resource
		 */

		await api.post('/resources', {
			params:{
				project_id: project_id,
				resource_name: resource.resource_name,
				resource_dns: resource.resource_dns,
				key_id: resource.key_id,
				ssh_user: resource.ssh_user
			}
		})
		.then((response) => {
			console.log(response)
			this.getResources(project_id)
		})
		.catch((err) => {
			console.log(err);
		})
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
	
  	render(){
		
    	return(
      		<div>
				<h3>Resources</h3>
				<h3>Data: <br/></h3>
				<div>
					{this.state.resources[0]!=undefined?this.state.resources[0].project_id:"loading"}
				</div>

			</div>
    	)
  	}
}

export default Resources