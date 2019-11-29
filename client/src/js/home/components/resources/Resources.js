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

  getResources(){}

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