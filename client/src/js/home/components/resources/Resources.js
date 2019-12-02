import React from 'react';


class Resources extends React.Component{

	constructor(){
		super();
		this.state = {
			resources = [],
			resource = {
				id: '',
				name: '',
				platform: '',
				dns: '',
				registedTime: ''
			}
		}
	}

	getResources(project){
		fetch('http://localhost:4000/resources', {project: projectId})
	}

	addResources(){}

		removeResource(){}

  	render(){
    	return(
      		<div>
				<h1>Resources</h1>
			</div>
    	)
  	}
}

export default Resources