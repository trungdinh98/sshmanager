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

	getResources(projectId){
		let url = "http://localhost:4000/resources?" + $.param({projectId: projectId});
		fetch(url);
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