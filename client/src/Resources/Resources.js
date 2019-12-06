import React from 'react';
import api from '../api';


class Resources extends React.Component{

	constructor(){
		
		super();
		// this.getResources(1);
		this.state = {
			resources : [],
			resource : {
				id: '',
				name: '',
				platform: '',
				dns: '',
				registedTime: ''
			}
		}
	}

	// getResources(project_id){
	// 	fetch(`http://localhost:4000/resources?project_id=${project_id}`)
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		this.setState({resources:data.data});
	// 		console.log(this.state.resources)
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	})
	// }

	componentDidMount(){
		this.getResources(1)
	}

	async getResources(project_id){
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


	addResources(){}

	removeResource(){}
	
  	render(){
		
    	return(
      		<div>
				<h1>Resources</h1>
				<h3>Data: <br/></h3>
				<div>
					{this.state.resources[0]!=undefined?this.state.resources[0].project_id:"loading"}
				</div>

			</div>
    	)
  	}
}

export default Resources